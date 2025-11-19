// Frontend/src/pages/grievances/Grievance.jsx

import React, { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { toast } from "react-toastify";
import { z } from "zod";
import DOMPurify from "dompurify";
import { Send, FileText, Loader2, RefreshCw } from "lucide-react";

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
    name: z.string().min(1, "नाव आवश्यक आहे").max(100, "नाव खूप लांब आहे"),
    phone: z
      .string()
      .regex(/^[6-9]\d{9}$/, "अवैध मोबाईल नंबर (६-९ पासून सुरू होणारे १० अंक)"),
    address: z
      .string()
      .min(1, "पत्ता आवश्यक आहे")
      .max(500, "पत्ता खूप लांब आहे"),
    subject: z.string().min(1, "विषय आवश्यक आहे").max(200, "विषय खूप लांब आहे"),
    description: z
      .string()
      .min(1, "वर्णन आवश्यक आहे")
      .max(1000, "वर्णन खूप लांब आहे"),
    grievance_type: z.string().min(1, "तक्रारीचा प्रकार आवश्यक आहे"),
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const grievanceTypes = [
    "पाणी पुरवठा समस्या",
    "रस्ते आणि पायाभूत सुविधा",
    "वीज समस्या",
    "आरोग्य सेवा",
    "शिक्षण संबंधित",
    "स्वच्छता समस्या",
    "जमीन नोंदी",
    "प्रमाणपत्रे संबंधित समस्या",
    "कर आणि महसूल",
    "इतर",
  ];

  // Utility to get status color
  const getStatusClasses = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-50 text-green-700 border-green-300";
      case "in_progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-300";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-300";
      default:
        return "bg-blue-50 text-blue-700 border-blue-300";
    }
  };

  // 🧾 Fetch user’s past grievances
  const fetchUserGrievances = async (phone) => {
    if (!phone || phone.trim().length !== 10) {
      toast.error(
        "मागील तक्रारी पाहण्यासाठी कृपया वैध १०-अंकी मोबाईल नंबर प्रविष्ट करा."
      );
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
      toast.error("तुमच्या मागील तक्रारी लोड करताना त्रुटी आली.");
      setGrievances([]);
    } else {
      setGrievances(data || []);
      toast.success("मागील तक्रारी लोड झाल्या.");
    }
    setLoading(false);
  };

  // 🧭 Submit new grievance
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form using Zod
    try {
      grievanceSchema.parse(form);
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      }
      return;
    }

    const payload = {
      user_id: null,
      name: DOMPurify.sanitize(form.name),
      phone: form.phone.trim(),
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
      toast.error("तक्रार सादर करण्यात अयशस्वी.");
      console.error(error);
    } else {
      toast.success(`तक्रार यशस्वीरित्या सादर झाली! ID: ${data.id}`);
      setForm({
        name: "",
        phone: form.phone,
        address: "",
        subject: "",
        description: "",
        grievance_type: "",
      });
      // Fetch and update the list to show the new grievance
      fetchUserGrievances(form.phone);
    }
    setIsSubmitting(false);
  };

  // Status translation utility
  const translateStatus = (status) => {
    const statusMap = {
      new: "नवीन",
      in_progress: "प्रगतीपथावर",
      resolved: "निवारण झाले",
      rejected: "नाकारली",
    };
    return statusMap[status] || status;
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
    <div className="bg-gray-50 min-h-screen">
      <PageHeader
        title="नागरिक तक्रार निवारण पोर्टल"
        subtitle={`ग्रामपंचायत ढोलेवाडीसाठी थेट तुमची तक्रार दाखल करा`}
        className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg"
      />

      <div className="container mx-auto py-12 grid lg:grid-cols-3 gap-8 px-4">
        {/* Left Section: Grievance Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-2xl border-t-4 border-cyan-500">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-cyan-700 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6" /> तक्रार नोंदणी
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid for Name and Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="नाव *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="border-gray-300 focus:border-cyan-500"
                  />
                  <Input
                    label="फोन *"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="१०-अंकी मोबाईल नंबर"
                    maxLength="10"
                    required
                    className="border-gray-300 focus:border-cyan-500"
                  />
                </div>

                {/* Grievance Type Select */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    तक्रारीचा प्रकार *
                  </label>
                  <select
                    value={form.grievance_type}
                    onChange={(e) =>
                      setForm({ ...form, grievance_type: e.target.value })
                    }
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 text-gray-700 bg-white"
                  >
                    <option value="" disabled>
                      प्रकार निवडा
                    </option>
                    {grievanceTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject Input */}
                <Input
                  label="विषय *"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  required
                  className="border-gray-300 focus:border-cyan-500"
                />

                {/* Address Textarea */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    पत्ता *
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 resize-none"
                    placeholder="तुमचा पत्ता प्रविष्ट करा..."
                    required
                  />
                </div>

                {/* Description Textarea */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    तक्रारीचे सविस्तर वर्णन *
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-150 resize-none"
                    placeholder="तुमच्या तक्रारीचे सविस्तर वर्णन करा..."
                    required
                  />
                </div>

                {/* Primary Submit Button: Now Violet for maximum contrast against green/blue */}
                <button
                  type="submit"
                  className="w-full bg-cyan-800 hover:bg-cyan-700 text-white font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition duration-150"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> सादर करत
                      आहोत...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> तक्रार सादर करा
                    </>
                  )}
                </button>
              </form>
            </div>
          </Card>
        </div>

        {/* Right Section: Past Grievances */}
        <div>
          <Card className="shadow-lg border-t-4 border-cyan-500">
            <div className="p-6">
              <h3 className="text-xl font-bold text-cyan-700 mb-4">
                तुमच्या मागील तक्रारींचा मागोवा घ्या
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                तुमचा मोबाईल नंबर वापरून तुमच्या तक्रारींची स्थिती तपासा.
              </p>

              <div className="mb-6 border-b border-gray-200 pb-4">
                <Input
                  label="नोंदणीकृत फोन नंबर प्रविष्ट करा"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="१०-अंकी मोबाईल नंबर"
                  maxLength="10"
                  className="border-gray-300 focus:border-cyan-500"
                />

                {/* Secondary Load Button: Now Orange for maximum contrast against green/blue */}
                <button
                  onClick={() => fetchUserGrievances(form.phone)}
                  className="w-full mt-3 bg-cyan-800 hover:bg-cyan-700 text-white font-semibold flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition duration-150"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> लोड होत
                      आहे...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" /> मागील तक्रारी लोड करा
                    </>
                  )}
                </button>
              </div>

              {grievances.length === 0 ? (
                <div className="text-center py-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700 text-sm font-medium">
                    नोंदणीकृत तक्रार आढळली नाही.
                  </p>
                  <p className="text-xs text-blue-400 mt-1">
                    तुमचा फोन नंबर प्रविष्ट करून 'मागील तक्रारी लोड करा' वर
                    क्लिक करा.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {grievances.map((g) => (
                    <div
                      key={g.id}
                      className="border rounded-xl p-4 shadow-sm bg-white hover:bg-cyan-50 transition border-l-4 border-cyan-400"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-bold text-sm text-gray-800 flex-grow pr-2">
                          {g.subject}
                        </p>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${getStatusClasses(
                            g.status || "new"
                          )}`}
                        >
                          {translateStatus(g.status || "new")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        तक्रार क्र.: #{g.id} | दिनांक:{" "}
                        {new Date(g.created_at).toLocaleString("mr-IN", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
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
