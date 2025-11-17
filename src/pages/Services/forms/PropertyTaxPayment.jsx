// src/pages/Services/forms/PropertyTaxPayment.jsx
import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { toast } from "react-toastify";
import { supabase } from "../../../services/supabaseClient";

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

export default function PropertyTaxPayment() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    property_id: "",
    owner_name: "",
    property_address: "",
    tax_year: "",
    amount: "",
    mobile: "",
    email: "",
    utr_number: "",
    payment_file: null,
  });

  // 🔥 FETCH AMOUNT + QR FROM service_settings TABLE
  useEffect(() => {
    async function loadServiceSettings() {
      const { data, error } = await supabase
        .from("service_settings")
        .select("amount, qr_code_url")
        .eq("service_key", "property_tax")
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

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      const f = files[0];
      setForm((p) => ({ ...p, [name]: f }));
      if (f && f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  }

  function validate() {
    if (!form.property_id) {
      toast.error("कृपया मालमत्ता आयडी भरा");
      return false;
    }
    if (!form.amount) {
      toast.error("रक्कम लोड करण्यात समस्या");
      return false;
    }
    if (!form.payment_file) {
      toast.error("कृपया पेमेंटची पावती / स्क्रीनशॉट अपलोड करा");
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
      const fileName = `tax_${Date.now()}_${form.payment_file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("property_tax_uploads")
        .upload(fileName, form.payment_file);

      if (uploadError) throw uploadError;

      const { data: fileData } = supabase.storage
        .from("property_tax_uploads")
        .getPublicUrl(fileName);

      // 🔵 2) INSERT DATABASE RECORD
      const { error } = await supabase.from("property_tax_payments").insert([
        {
          property_id: form.property_id,
          owner_name: form.owner_name,
          property_address: form.property_address,
          tax_year: form.tax_year,
          amount: form.amount,
          mobile: form.mobile,
          email: form.email,
          utr_number: form.utr_number,
          screenshot_url: fileData.publicUrl,
        },
      ]);

      if (error) throw error;

      toast.success("Property tax payment submitted successfully!");

      // Reset
      setOpen(false);
      setForm({
        property_id: "",
        owner_name: "",
        property_address: "",
        tax_year: "",
        amount: form.amount,
        mobile: "",
        email: "",
        utr_number: "",
        payment_file: null,
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Error submitting form: " + err.message);
    }

    setSubmitting(false);
  }

  return (
    <>
      <PageHeader
        title="Property Tax Payment"
        subtitle="Pay your property tax online"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Property Tax", href: null },
        ]}
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE — QR + DETAILS */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Scan & Pay</h2>
              <p className="text-gray-600">
                स्कॅन करून खालील रक्कम भरा आणि पावती अपलोड करा.
              </p>

              {/* QR BLOCK */}
              <div className="p-4 border rounded-md bg-gray-50 text-center space-y-3">
                {/* QR CODE */}
                <img
                  src={qrCode || "/placeholder_qr.png"}
                  alt="QR Code"
                  className="mx-auto max-h-64"
                />

                {/* DYNAMIC AMOUNT */}
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

        {/* RIGHT SIDE — BUTTONS */}
        <div>
          <Card>
            <div className="p-6 text-center space-y-3">
              <Button className="w-full" onClick={() => setOpen(true)}>
                Pay / Apply
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = "/documents/property_tax_receipt_template.pdf";
                  a.download = "PropertyTax_Form.pdf";
                  a.click();
                }}
              >
                Download Form
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
        title="Property Tax Payment"
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-auto"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="Property ID / Assessment No *"
              name="property_id"
              value={form.property_id}
              onChange={handleChange}
            />

            <InputBlock
              label="Owner Name"
              name="owner_name"
              value={form.owner_name}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">
                Property Address
              </label>
              <textarea
                name="property_address"
                value={form.property_address}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-200"
              />
            </div>

            <InputBlock
              label="Tax Year"
              name="tax_year"
              value={form.tax_year}
              onChange={handleChange}
            />

            <InputBlock
              label="Amount (₹)"
              name="amount"
              value={form.amount}
              readOnly
            />

            <InputBlock
              label="व्हाट्सअप / मोबाईल"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />

            <InputBlock
              label="ईमेल"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <InputBlock
              label="UTR / Transaction ID"
              name="utr_number"
              value={form.utr_number}
              onChange={handleChange}
            />

            {/* FILE UPLOAD */}
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
