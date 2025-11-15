import React, { useState, useEffect } from "react";
import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { supabase } from "../../../../services/supabaseClient";
import { toast } from "react-toastify";

function InputBlock({ label, name, value, type = "text", onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-200"
      />
    </div>
  );
}

export default function Application({
  serviceKey,
  serviceName,
  qrServiceKey,
  bucket,
  extraFields = [],
}) {
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [amount, setAmount] = useState(0);

  const [previewProof, setPreviewProof] = useState(null);
  const [previewPay, setPreviewPay] = useState(null);

  const [form, setForm] = useState({
    applicant_name: "",
    mobile: "",
    address: "",
    utr_number: "",
    proof_file: null,
    payment_file: null,

    // dynamic fields come here
    ...Object.fromEntries(extraFields.map((f) => [f.name, ""])),
  });

  // Load QR + Amount
  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase
        .from("service_settings")
        .select("amount, qr_code_url")
        .eq("service_key", qrServiceKey)
        .single();

      if (error) {
        toast.error("Failed to load payment settings");
        return;
      }

      setAmount(data.amount);
      setQrCode(data.qr_code_url);
    }

    loadSettings();
  }, []);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (name === "proof_file") setPreviewProof(URL.createObjectURL(file));
      if (name === "payment_file") setPreviewPay(URL.createObjectURL(file));

      setForm((p) => ({ ...p, [name]: file }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    if (!form.applicant_name) return toast.error("अर्जदाराचे नाव भरा");
    if (!form.mobile) return toast.error("मोबाईल नंबर भरा");

    for (let f of extraFields) {
      if (f.required && !form[f.name]) {
        return toast.error(`${f.label} भरा`);
      }
    }

    if (!form.proof_file) return toast.error("पुरावा अपलोड करा");
    if (!form.payment_file) return toast.error("पेमेंट स्क्रीनशॉट अपलोड करा");

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Upload proof
      const proofName = `${serviceKey}_proof_${Date.now()}_${
        form.proof_file.name
      }`;

      const { error: proofError } = await supabase.storage
        .from(bucket)
        .upload(proofName, form.proof_file);

      if (proofError) throw proofError;

      const { data: proofUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(proofName);

      // Upload payment screenshot
      const payName = `${serviceKey}_payment_${Date.now()}_${
        form.payment_file.name
      }`;

      const { error: payError } = await supabase.storage
        .from(bucket)
        .upload(payName, form.payment_file);

      if (payError) throw payError;

      const { data: payUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(payName);

      // Build form_data JSON
      const formData = {};

      extraFields.forEach((f) => {
        formData[f.name] = form[f.name];
      });

      // Insert into universal table
      const { error } = await supabase.from("certificate_requests").insert([
        {
          service_key: serviceKey,

          applicant_name: form.applicant_name,
          mobile: form.mobile,
          address: form.address,
          utr_number: form.utr_number,

          proof_url: proofUrl.publicUrl,
          payment_screenshot_url: payUrl.publicUrl,

          form_data: formData,
        },
      ]);

      if (error) throw error;

      toast.success("Application Submitted Successfully!");

      // reset
      setOpen(false);
      setForm({
        applicant_name: "",
        mobile: "",
        address: "",
        utr_number: "",
        proof_file: null,
        payment_file: null,

        ...Object.fromEntries(extraFields.map((f) => [f.name, ""])),
      });
      setPreviewPay(null);
      setPreviewProof(null);
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  }

  return (
    <>
      <PageHeader
        title={serviceName}
        subtitle="Online Application"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: serviceName, href: null },
        ]}
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* LEFT – QR */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Scan & Pay</h2>
              <p className="text-gray-600">शुल्क भरून पावती अपलोड करा.</p>

              <div className="p-4 border rounded bg-gray-50 text-center space-y-3">
                <img src={qrCode} className="mx-auto max-h-64" alt="" />
                <div className="text-lg font-bold text-green-700">
                  शुल्क: ₹ {amount}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT – Apply Button */}
        <div>
          <Card>
            <div className="p-6 text-center space-y-3">
              <Button className="w-full" onClick={() => setOpen(true)}>
                Apply Online
              </Button>
              <Button variant="ghost">Check Status</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        size="xl"
        title={serviceName}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-auto"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="Applicant Name *"
              name="applicant_name"
              value={form.applicant_name}
              onChange={handleChange}
            />
            <InputBlock
              label="Mobile *"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
            <InputBlock
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <InputBlock
              label="UTR Number"
              name="utr_number"
              value={form.utr_number}
              onChange={handleChange}
            />

            {/* Dynamic custom fields */}
            {extraFields.map((f, i) => (
              <InputBlock
                key={i}
                label={`${f.label} ${f.required ? "*" : ""}`}
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
              />
            ))}

            {/* Proof Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">
                Proof Document *
              </label>
              <input
                type="file"
                name="proof_file"
                accept="image/*,application/pdf"
                onChange={handleChange}
              />
              {previewProof && (
                <img src={previewProof} className="max-h-40 mt-2 rounded" />
              )}
            </div>

            {/* Payment Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">
                Payment Screenshot *
              </label>
              <input
                type="file"
                name="payment_file"
                accept="image/*"
                onChange={handleChange}
              />
              {previewPay && (
                <img src={previewPay} className="max-h-40 mt-2 rounded" />
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
