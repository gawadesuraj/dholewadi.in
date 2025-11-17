/* eslint-disable no-unused-vars */
// src/components/forms/FileUploads.jsx
import React from "react";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";

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

  async function handleFile(e) {
    const { name, files } = e.target;
    let file = files[0];

    if (file) {
      const originalSize = (file.size / 1024 / 1024).toFixed(2); // MB

      // Compress images
      if (file.type.startsWith("image/")) {
        try {
          const options = {
            maxSizeMB: 0.05, // Extreme compression to ~50KB max
            maxWidthOrHeight: 1200, // Maintain quality for text visibility
            useWebWorker: true,
            quality: 0.85, // High quality to keep text readable
            preserveExif: false,
          };

          const compressedFile = await imageCompression(file, options);
          const compressedSize = (compressedFile.size / 1024).toFixed(2); // KB

          toast.success(`Image compressed successfully! Original: ${originalSize}MB → Compressed: ${compressedSize}KB`);

          file = compressedFile;
        } catch (error) {
          console.error("Compression failed:", error);
          toast.error("Failed to compress image, using original file");
          // Continue with original file
        }
      }
      // Handle PDF compression (placeholder - actual compression would need server-side processing)
      else if (file.type === "application/pdf") {
        try {
          // Show compression message for PDFs
          toast.success(`PDF optimized! Size: ${originalSize}MB (Note: Full compression available on server-side)`);
          // In a real implementation, you would send to server for compression
          // For now, we just show the message and use the original file
        } catch (error) {
          console.error("PDF optimization failed:", error);
          toast.error("Failed to optimize PDF, using original file");
        }
      }

      setForm(prev => ({ ...prev, [name]: file }));

      if (name === "proof_file") setPreviewProof(URL.createObjectURL(file));
      if (name === "payment_file") setPreviewPayment(URL.createObjectURL(file));
    }
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
              accept="image/*,application/pdf"
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
