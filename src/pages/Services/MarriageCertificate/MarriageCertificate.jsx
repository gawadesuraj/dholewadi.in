import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { supabase } from "../../../services/supabaseClient";
import { toast } from "react-toastify";

function InputBlock({ label, name, value, type = "text", onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded bg-gray-50"
      />
    </div>
  );
}

export default function MarriageCertificateForm() {
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [amount, setAmount] = useState(0);

  const [previewProof, setPreviewProof] = useState(null);
  const [previewPay, setPreviewPay] = useState(null);

  const [form, setForm] = useState({
    // Applicant info
    applicant_name: "",
    mobile: "",
    address: "",
    utr_number: "",

    // Files
    proof_file: null,
    payment_file: null,

    // Marriage-specific fields (will go inside form_data JSON)
    husband_name: "",
    wife_name: "",
    marriage_date: "",
    marriage_place: "",
  });

  // Load QR + Amount for marriage certificate
  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from("service_settings")
        .select("amount, qr_code_url")
        .eq("service_key", "marriage_certificate")
        .single();

      if (data) {
        setQrCode(data.qr_code_url);
        setAmount(data.amount);
      }
    }
    loadSettings();
  }, []);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));

      if (name === "proof_file") setPreviewProof(URL.createObjectURL(file));
      if (name === "payment_file") setPreviewPay(URL.createObjectURL(file));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.husband_name) return toast.error("वराचे नाव भरा");
    if (!form.wife_name) return toast.error("वधूचे नाव भरा");
    if (!form.marriage_date) return toast.error("लग्नाची तारीख भरा");
    if (!form.marriage_place) return toast.error("लग्नाचे ठिकाण भरा");

    if (!form.applicant_name) return toast.error("अर्जदाराचे नाव भरा");
    if (!form.mobile) return toast.error("मोबाईल नंबर भरा");
    if (!form.address) return toast.error("पत्ता भरा");

    if (!form.proof_file) return toast.error("पुरावा अपलोड करा");
    if (!form.payment_file) return toast.error("पेमेंट स्क्रीनशॉट भरा");

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Upload proof
      const proofName = `marriage_proof_${Date.now()}_${form.proof_file.name}`;
      const { error: proofErr } = await supabase.storage
        .from("marriage_certificate_uploads")
        .upload(proofName, form.proof_file);

      if (proofErr) throw proofErr;

      const proofUrl = supabase.storage
        .from("marriage_certificate_uploads")
        .getPublicUrl(proofName).data.publicUrl;

      // Upload payment screenshot
      const payName = `marriage_payment_${Date.now()}_${
        form.payment_file.name
      }`;
      const { error: payErr } = await supabase.storage
        .from("marriage_certificate_uploads")
        .upload(payName, form.payment_file);

      if (payErr) throw payErr;

      const paymentUrl = supabase.storage
        .from("marriage_certificate_uploads")
        .getPublicUrl(payName).data.publicUrl;

      // Prepare JSON for certificate-specific data
      const formDataJson = {
        husband_name: form.husband_name,
        wife_name: form.wife_name,
        marriage_date: form.marriage_date,
        marriage_place: form.marriage_place,
      };

      // Insert into universal certificate table
      const { error } = await supabase.from("certificate_requests").insert([
        {
          service_key: "marriage_certificate",

          applicant_name: form.applicant_name,
          mobile: form.mobile,
          address: form.address,
          utr_number: form.utr_number,

          proof_url: proofUrl,
          payment_screenshot_url: paymentUrl,

          form_data: formDataJson,
        },
      ]);

      if (error) throw error;

      toast.success("Marriage Certificate Application Submitted!");

      setOpen(false);
      setForm({
        applicant_name: "",
        mobile: "",
        address: "",
        utr_number: "",
        proof_file: null,
        payment_file: null,
        husband_name: "",
        wife_name: "",
        marriage_date: "",
        marriage_place: "",
      });

      setPreviewProof(null);
      setPreviewPay(null);
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  }

  return (
    <>
      <PageHeader
        title="Marriage Certificate"
        subtitle="लग्न प्रमाणपत्रासाठी ऑनलाइन अर्ज करा"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Marriage Certificate", href: null },
        ]}
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* LEFT – QR CODE */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Scan & Pay</h2>
              <p className="text-gray-600">शुल्क भरून पावती अपलोड करा.</p>

              <div className="p-4 border rounded bg-gray-50 text-center space-y-4">
                <img src={qrCode} className="mx-auto max-h-64" alt="QR Code" />
                <div className="font-bold text-green-700 text-lg">
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
        title="Marriage Certificate Application"
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-auto"
        >
          {/* Applicant Info */}
          <h3 className="font-semibold text-lg mt-3">Applicant Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="अर्जदाराचे नाव *"
              name="applicant_name"
              value={form.applicant_name}
              onChange={handleChange}
            />
            <InputBlock
              label="मोबाईल नंबर *"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">पत्ता *</label>
              <textarea
                name="address"
                value={form.address}
                rows="2"
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-50 border"
              ></textarea>
            </div>
            <InputBlock
              label="UTR / व्यवहार ID"
              name="utr_number"
              value={form.utr_number}
              onChange={handleChange}
            />
          </div>

          {/* Marriage Details */}
          <h3 className="font-semibold text-lg mt-3">Marriage Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="वराचे नाव *"
              name="husband_name"
              value={form.husband_name}
              onChange={handleChange}
            />
            <InputBlock
              label="वधूचे नाव *"
              name="wife_name"
              value={form.wife_name}
              onChange={handleChange}
            />
            <InputBlock
              label="लग्नाची तारीख *"
              name="marriage_date"
              type="date"
              value={form.marriage_date}
              onChange={handleChange}
            />
            <InputBlock
              label="लग्नाचे ठिकाण *"
              name="marriage_place"
              value={form.marriage_place}
              onChange={handleChange}
            />
          </div>

          {/* Uploads */}
          <h3 className="font-semibold text-lg mt-3">Uploads</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Proof */}
            <div>
              <label className="block text-sm mb-1 font-medium">
                विवाहाचा पुरावा *
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                name="proof_file"
                onChange={handleChange}
              />
              {previewProof && (
                <img
                  src={previewProof}
                  alt=""
                  className="max-h-40 mt-2 rounded"
                />
              )}
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm mb-1 font-medium">
                पेमेंट स्क्रीनशॉट *
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                name="payment_file"
                onChange={handleChange}
              />
              {previewPay && (
                <img
                  src={previewPay}
                  alt=""
                  className="max-h-40 mt-2 rounded"
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
