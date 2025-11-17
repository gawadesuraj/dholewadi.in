/* eslint-disable no-unused-vars */
// src/pages/Services/forms/WaterTaxPayment.jsx
import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { toast } from "react-toastify";
import { supabase } from "../../../services/supabaseClient";
import imageCompression from "browser-image-compression";

function InputBlock({ label, name, type = "text", onChange, value, readOnly }) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-200"
      />
    </div>
  );
}

export default function WaterTaxPayment() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    connection_number: "",
    consumer_name: "",
    address: "",
    billing_year: "",
    amount: "",
    mobile: "",
    utr_number: "",
    payment_file: null,
  });

  // 🔥 FETCH AMOUNT + QR FROM service_settings TABLE
  useEffect(() => {
    async function loadServiceSettings() {
      const { data, error } = await supabase
        .from("service_settings")
        .select("amount, qr_code_url")
        .eq("service_key", "water_tax")
        .single();

      if (error) {
        console.error(error);
        toast.error("Failed to load payment settings");
        return;
      }

      setForm((prev) => ({ ...prev, amount: data.amount }));
      setQrCode(data.qr_code_url);
    }

    loadServiceSettings();
  }, []);

  async function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      let f = files[0];
      if (f) {
        // Compress images only, skip PDFs and other files
        if (f.type.startsWith("image/")) {
          try {
            const originalSize = (f.size / 1024 / 1024).toFixed(2); // MB

            const options = {
              maxSizeMB: 0.05, // Extreme compression to ~50KB max
              maxWidthOrHeight: 1200, // Maintain quality for text visibility
              useWebWorker: true,
              quality: 0.85, // High quality to keep text readable
              preserveExif: false,
            };

            const compressedFile = await imageCompression(f, options);
            const compressedSize = (compressedFile.size / 1024).toFixed(2); // KB

            toast.success(`Image compressed successfully! Original: ${originalSize}MB → Compressed: ${compressedSize}KB`);

            f = compressedFile;
          } catch (error) {
            console.error("Compression failed:", error);
            toast.error("Failed to compress image, using original file");
            // Continue with original file
          }
        }

        setForm((p) => ({ ...p, [name]: f }));
        if (f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
      }
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  }

  function validate() {
    if (!form.connection_number) {
      toast.error("कृपया कनेक्शन नंबर भरा");
      return false;
    }
    if (!form.amount) {
      toast.error("रक्कम लोड करण्यात समस्या");
      return false;
    }
    if (!form.payment_file) {
      toast.error("कृपया पेमेंट पावती अपलोड करा");
      return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      // 🔵 1) UPLOAD FILE
      const fileName = `water_${Date.now()}_${form.payment_file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("water_tax_uploads")
        .upload(fileName, form.payment_file);

      if (uploadError) throw uploadError;

      const { data: fileData } = supabase.storage
        .from("water_tax_uploads")
        .getPublicUrl(fileName);

      // 🔵 2) INSERT INTO DATABASE
      const { error } = await supabase.from("water_tax_payments").insert([
        {
          connection_number: form.connection_number,
          consumer_name: form.consumer_name,
          address: form.address,
          billing_year: form.billing_year,
          amount: form.amount,
          mobile: form.mobile,
          utr_number: form.utr_number,
          screenshot_url: fileData.publicUrl,
        },
      ]);

      if (error) throw error;

      toast.success("Water tax payment submitted successfully!");

      setOpen(false);
      setForm({
        connection_number: "",
        consumer_name: "",
        address: "",
        billing_year: "",
        amount: form.amount,
        mobile: "",
        utr_number: "",
        payment_file: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Error submitting: " + err.message);
    }

    setSubmitting(false);
  }

  return (
    <>
      <PageHeader
        title="Water Tax Payment"
        subtitle="Pay your water tax online"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Water Tax", href: null },
        ]}
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE — QR + DETAILS */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Scan & Pay</h2>
              <p className="text-gray-600">
                स्कॅन करून खालील रक्कम भरा आणि पेमेंटची पावती अपलोड करा.
              </p>

              <div className="p-4 border rounded-md bg-gray-50 text-center space-y-3">
                <img
                  src={qrCode || "/placeholder_qr.png"}
                  alt="QR Code"
                  className="mx-auto max-h-64"
                />

                <div className="mt-4 p-3 border rounded bg-white shadow-sm inline-block">
                  <div className="text-sm text-gray-600">
                    भरणा करावयाची रक्कम
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ₹ {form.amount || "0.00"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div>
          <Card>
            <div className="p-6 text-center space-y-3">
              <Button className="w-full" onClick={() => setOpen(true)}>
                Pay / Apply
              </Button>

              <Button variant="ghost" className="w-full">
                Check Status
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Water Tax Payment"
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-auto"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="Connection Number *"
              name="connection_number"
              value={form.connection_number}
              onChange={handleChange}
            />

            <InputBlock
              label="Consumer Name"
              name="consumer_name"
              value={form.consumer_name}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-200"
              />
            </div>

            <InputBlock
              label="Billing Year"
              name="billing_year"
              value={form.billing_year}
              onChange={handleChange}
            />

            <InputBlock
              label="Amount (₹)"
              name="amount"
              value={form.amount}
              readOnly
            />

            <InputBlock
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />

            <InputBlock
              label="UTR / Transaction ID"
              name="utr_number"
              value={form.utr_number}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">
                Payment Screenshot *
              </label>
              <input
                type="file"
                name="payment_file"
                accept="image/*,application/pdf"
                onChange={handleChange}
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="max-h-44 mt-2 rounded"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Processing..." : "Submit Payment"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
