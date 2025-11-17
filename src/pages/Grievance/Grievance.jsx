// Frontend/src/pages/grievances/Grievance.jsx

import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";
import { z } from "zod";
import DOMPurify from "dompurify";

export default function Grievance() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    subject: "",
    description: "",
    grievance_type: "",
  });

  // Zod schema for grievance validation
  const grievanceSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number (10 digits starting with 6-9)"),
    address: z.string().min(1, "Address is required").max(500, "Address too long"),
    subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
    description: z.string().min(1, "Description is required").max(1000, "Description too long"),
    grievance_type: z.string().min(1, "Grievance type is required"),
  });
  const [loading, setLoading] = useState(false);

  const grievanceTypes = [
    "Water Supply Issues",
    "Road and Infrastructure",
    "Electricity Problems",
    "Healthcare Services",
    "Education Related",
    "Sanitation Issues",
    "Land Records",
    "Certificate Issues",
    "Tax and Revenue",
    "Others",
  ];

  // 🧾 Fetch user’s past grievances
  const fetchUserGrievances = async (phone) => {
    if (!phone || phone.trim().length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number to load past grievances");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("grievances")
      .select("*")
      .eq("phone", phone.trim())
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Error loading your previous grievances.");
      setGrievances([]);
    } else {
      setGrievances(data || []);
      toast.success("Past grievances loaded.");
    }
    setLoading(false);
  };

  // 🧭 Submit new grievance
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form using Zod
    try {
      grievanceSchema.parse(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      }
      return;
    }

    const payload = {
      user_id: null,
      name: DOMPurify.sanitize(form.name),
      phone: form.phone.trim(), // Already validated as number
      email: null,
      address: DOMPurify.sanitize(form.address),
      grievance_type: form.grievance_type,
      subject: DOMPurify.sanitize(form.subject),
      description: DOMPurify.sanitize(form.description),
      status: "new",
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("grievances")
      .insert([payload])
      .select()
      .single();

    if (error) {
      toast.error("Failed to submit grievance.");
      console.error(error);
    } else {
      toast.success(`Grievance submitted successfully! ID: ${data.id}`);
      setForm({ name: "", phone: "", address: "", subject: "", description: "", grievance_type: "" });
      setGrievances((prev) => [data, ...prev]);
    }
  };

  // 🔁 Real-time updates
  useEffect(() => {
    if (!form.phone) return;

    const channel = supabase
      .channel("realtime-grievances")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "grievances" },
        (payload) => {
          if (payload.new && payload.new.phone === form.phone.trim()) {
            setGrievances((prev) => {
              const existing = prev.find((g) => g.id === payload.new.id);
              if (existing) {
                return prev.map((g) =>
                  g.id === payload.new.id ? payload.new : g
                );
              } else {
                return [payload.new, ...prev];
              }
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [form.phone]);

  return (
    <div>
      <PageHeader
        title="Citizen Grievance Portal"
        subtitle="Submit your grievances directly without registration"
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Grievance Registration
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Name *"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                />

                <Input
                  label="Phone *"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  required
                />

                <Input
                  label="Address *"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Grievance Type *
                  </label>
                  <select
                    value={form.grievance_type}
                    onChange={(e) =>
                      setForm({ ...form, grievance_type: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Type</option>
                    {grievanceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Subject *"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address *
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    rows="3"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="Enter your address..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows="5"
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="Describe your grievance..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Grievance
                </Button>
              </form>
            </div>
          </Card>
        </div>

        {/* Right Section: Past Grievances */}
        <div>
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Your Past Grievances
              </h3>
              <div className="mb-4">
                <Input
                  label="Enter Phone Number to Load Past Grievances"
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="10-digit mobile number"
                  maxLength="10"
                />
                <Button
                  onClick={() => fetchUserGrievances(form.phone)}
                  className="w-full mt-2"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load Past Grievances"}
                </Button>
              </div>
              {grievances.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No previous grievances found. Enter your phone number and click "Load Past Grievances".
                </p>
              ) : (
                <div className="space-y-4">
                  {grievances.map((g) => (
                    <div
                      key={g.id}
                      className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm">
                          #{g.id} — {g.subject}
                        </p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            g.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : g.status === "in_progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : g.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {g.status ? g.status.replace("_", " ") : "new"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(g.created_at).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {g.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}