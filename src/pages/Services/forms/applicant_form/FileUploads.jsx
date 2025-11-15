// src/components/forms/FileUploads.jsx
import React from "react";

export default function FileUploads({ 
  form, 
  setForm, 
  showProof = true,
  showPayment = true,
  previewProof,
  setPreviewProof,
  previewPayment,
  setPreviewPayment
}) {

  function handleFile(e) {
    const { name, files } = e.target;
    const file = files[0];

    setForm(prev => ({ ...prev, [name]: file }));

    if (name === "proof_file") setPreviewProof(URL.createObjectURL(file));
    if (name === "payment_file") setPreviewPayment(URL.createObjectURL(file));
  }

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-semibold text-lg">Uploads</h3>

      <div className="grid md:grid-cols-2 gap-4">
        
        {/* Proof Upload */}
        {showProof && (
          <div>
            <label className="block text-sm mb-1 font-medium">
              पुरावा अपलोड करा *
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              name="proof_file"
              onChange={handleFile}
            />
            {previewProof && (
              <img src={previewProof} className="max-h-40 mt-2 rounded" alt="proof" />
            )}
          </div>
        )}

        {/* Payment Screenshot */}
        {showPayment && (
          <div>
            <label className="block text-sm mb-1 font-medium">
              पेमेंट स्क्रीनशॉट *
            </label>
            <input
              type="file"
              accept="image/*"
              name="payment_file"
              onChange={handleFile}
            />
            {previewPayment && (
              <img src={previewPayment} className="max-h-40 mt-2 rounded" alt="payment" />
            )}
          </div>
        )}

      </div>
    </div>
  );
}
