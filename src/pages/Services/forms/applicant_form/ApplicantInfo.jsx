// src/components/forms/ApplicantInfo.jsx
import React from "react";

export default function ApplicantInfo({ form, setForm }) {
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Applicant Information</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 font-medium">अर्जदाराचे नाव *</label>
          <input
            type="text"
            name="applicant_name"
            value={form.applicant_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">मोबाईल नंबर *</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-gray-50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1 font-medium">पत्ता *</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows="2"
            className="w-full px-3 py-2 border rounded bg-gray-50"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm mb-1 font-medium">UTR / व्यवहार ID</label>
          <input
            type="text"
            name="utr_number"
            value={form.utr_number}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}
