// Frontend/src/pages/grievances/Grievance.jsx

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";
import { supabase } from "../../services/supabaseClient";

function Grievance() {
  const [grievances, setGrievances] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    grievance_type: "",
    subject: "",
    description: "",
  });
  const [statusId, setStatusId] = useState("");
  const [statusResult, setStatusResult] = useState(null);
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

  const breadcrumbs = [{ label: "Grievance", href: null }];

  // ✅ Realtime grievance updates
  useEffect(() => {
    const channel = supabase
      .channel("realtime-grievances")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "grievances" },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            setGrievances((prev) =>
              prev.map((g) => (g.id === payload.new.id ? payload.new : g))
            );
            if (statusResult?.id === payload.new.id) {
              setStatusResult(payload.new);
            }
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [statusResult]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle grievance submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.phone || !form.subject || !form.description) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (form.phone.length !== 10) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.from("grievances").insert([
      {
        ...form,
        status: "new",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Failed to submit grievance. Try again.");
    } else {
      toast.success("Grievance submitted successfully!");
      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        grievance_type: "",
        subject: "",
        description: "",
      });
    }

    setLoading(false);
  }

  // ✅ Track grievance status by ID
  async function handleTrackStatus() {
    if (!statusId.trim()) {
      toast.error("Enter a grievance ID.");
      return;
    }

    const { data, error } = await supabase
      .from("grievances")
      .select("*")
      .eq("id", statusId)
      .single();

    if (error || !data) {
      setStatusResult(null);
      toast.error("No grievance found with that ID.");
    } else {
      setStatusResult(data);
      toast.success("Status fetched successfully!");
    }
  }

  return (
    <div>
      <PageHeader
        title="Public Grievance System"
        subtitle="Submit your complaints and track their status online"
        breadcrumbs={breadcrumbs}
      />

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Submit New Grievance
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name *"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                    <Input
                      label="Mobile Number *"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit number"
                      required
                      maxLength="10"
                    />
                  </div>

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />

                  <Input
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Your complete address"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Grievance Type *
                    </label>
                    <select
                      name="grievance_type"
                      value={form.grievance_type}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select type</option>
                      {grievanceTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="Subject *"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Brief subject of your grievance"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Provide detailed description..."
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Submitting..." : "Submit Grievance"}
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Track Grievance Status
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter Grievance ID"
                    value={statusId}
                    onChange={(e) => setStatusId(e.target.value)}
                  />
                  <Button variant="outline" className="w-full" onClick={handleTrackStatus}>
                    Check Status
                  </Button>
                </div>

                {statusResult && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-md border">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Subject:</strong> {statusResult.subject}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`font-medium ${
                          statusResult.status === "resolved"
                            ? "text-green-600"
                            : statusResult.status === "in_progress"
                            ? "text-yellow-600"
                            : statusResult.status === "rejected"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {statusResult.status.replace("_", " ")}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Updated:{" "}
                      {new Date(statusResult.updated_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Grievance Process
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>1️⃣ Submit → File your grievance online.</li>
                  <li>2️⃣ Assign → Sent to concerned department.</li>
                  <li>3️⃣ Action → Department works on it.</li>
                  <li>4️⃣ Resolution → Marked resolved by admin.</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grievance;
