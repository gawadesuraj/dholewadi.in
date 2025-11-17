// src/pages/TrackStatus.jsx

import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import {
  Search,
  Loader2,
  FileDown,
  FileText,
  Home,
  Droplet,
  BadgeCheck,
  XCircle,
  Clock,
} from "lucide-react";

export default function TrackStatus() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    if (!mobile.trim()) {
      setError("कृपया मोबाईल नंबर भरा");
      return;
    }

    setLoading(true);
    setResults([]);
    setError("");

    try {
      const all = [];

      // ============= CERTIFICATES =============
      const { data: certs, error: e1 } = await supabase
        .from("certificate_requests")
        .select("*")
        .eq("mobile", mobile)
        .order("created_at", { ascending: false });

      if (e1) throw e1;

      certs?.forEach((c) =>
        all.push({
          id: c.id,
          service: `${c.certificate_type} Certificate`,
          status: c.status ?? "pending",
          remarks: c.remarks,
          pdf: c.issued_url,
          type: "certificate",
          icon: <FileText size={30} className="text-blue-600" />,
        })
      );

      // ============= PROPERTY TAX =============
      const { data: prop, error: e2 } = await supabase
        .from("property_tax_payments")
        .select("*")
        .eq("mobile", mobile)
        .order("created_at", { ascending: false });

      if (e2) throw e2;

      prop?.forEach((p) =>
        all.push({
          id: p.id,
          service: "Property Tax Payment",
          status: p.status ?? "pending",
          remarks: p.remarks,
          pdf: null,
          type: "property",
          icon: <Home size={30} className="text-green-700" />,
        })
      );

      // ============= WATER TAX =============
      const { data: wat, error: e3 } = await supabase
        .from("water_tax_payments")
        .select("*")
        .eq("mobile", mobile)
        .order("created_at", { ascending: false });

      if (e3) throw e3;

      wat?.forEach((w) =>
        all.push({
          id: w.id,
          service: "Water Tax Payment",
          status: w.status ?? "pending",
          remarks: w.remarks,
          pdf: null,
          type: "water",
          icon: <Droplet size={30} className="text-indigo-600" />,
        })
      );

      // Sort by latest
      all.sort((a, b) => Number(b.id) - Number(a.id));

      setResults(all);
    } catch (err) {
      console.error(err);
      setError("Error fetching application status. Try again.");
    }

    setLoading(false);
  };

  const StatusBadge = ({ status }) => {
    const base =
      "px-3 py-1 text-xs rounded-full font-medium flex items-center gap-1";

    switch (status) {
      case "approved":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <BadgeCheck size={14} /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <XCircle size={14} /> Rejected
          </span>
        );
      case "needs-info":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-800`}>
            <Clock size={14} /> Needs Info
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-200 text-gray-700`}>
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Track Your Applications
      </h1>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-white p-3 border rounded-xl shadow mb-6">
        <Search size={20} className="text-gray-500" />
        <input
          className="w-full text-lg outline-none"
          placeholder="Enter your mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button
          onClick={fetchStatus}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Search"}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {results.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 border rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <div className="text-xl font-bold">{item.service}</div>
                    <div className="text-gray-600 text-sm">
                      Application ID: <b>{item.id}</b>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <StatusBadge status={item.status} />
                </div>

                {item.remarks && (
                  <div className="mt-2 bg-yellow-50 p-2 rounded text-sm border text-yellow-800">
                    <b>Remarks:</b> {item.remarks}
                  </div>
                )}
              </div>

              {/* Certificate Download Button */}
              {item.type === "certificate" &&
                item.status === "approved" &&
                item.pdf && (
                  <a
                    href={item.pdf}
                    download={`certificate_${item.id}.pdf`} // ← forces download
                    className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 h-fit"
                  >
                    <FileDown size={16} /> Download
                  </a>
                )}
            </div>
          </div>
        ))}

        {!loading && results.length === 0 && !error && (
          <div className="text-center text-gray-500 text-lg mt-10">
            No applications found for this mobile number.
          </div>
        )}
      </div>
    </div>
  );
}
