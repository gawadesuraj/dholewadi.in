import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { supabase } from "../../../services/supabaseClient";
import { toast } from "react-toastify";

function InputBlock({ label, name, type = "text", value, onChange }) {
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

export default function DeathCertificateForm() {
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [amount, setAmount] = useState(0);

  const [proofPreview, setProofPreview] = useState(null);
  const [paymentPreview, setPaymentPreview] = useState(null);

  const [form, setForm] = useState({
    // Applicant info
    applicant_name: "",
    mobile: "",
    address: "",
    utr_number: "",

    // Proofs
    proof_file: null,
    payment_file: null,

    // Certificate specific fields → stored in JSON
    deceased_name: "",
    death_date: "",
    death_time: "",
    death_time_period: "AM",
    death_place: "",
    father_husband_name: "",
  });

  // Load QR + Amount
  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from("service_settings")
        .select("amount, qr_code_url")
        .eq("service_key", "death_certificate")
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

      if (name === "proof_file") setProofPreview(URL.createObjectURL(file));
      if (name === "payment_file") setPaymentPreview(URL.createObjectURL(file));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.deceased_name) return toast.error("मृत व्यक्तीचे नाव भरा");
    if (!form.death_date) return toast.error("मृत्यूची तारीख भरा");
    if (!form.death_place) return toast.error("मृत्यूचे ठिकाण भरा");

    if (!form.applicant_name) return toast.error("अर्जदाराचे नाव भरा");
    if (!form.mobile) return toast.error("मोबाईल नंबर भरा");
    if (!form.address) return toast.error("पत्ता भरा");

    if (!form.proof_file) return toast.error("मृत्यूचा पुरावा अपलोड करा");
    if (!form.payment_file) return toast.error("पेमेंट स्क्रीनशॉट अपलोड करा");

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      // ---------- Upload Proof ----------
      const proofName = `death_proof_${Date.now()}_${form.proof_file.name}`;
      const { error: proofErr } = await supabase.storage
        .from("death_certificate_uploads")
        .upload(proofName, form.proof_file);

      if (proofErr) throw proofErr;

      const proofUrl = supabase.storage
        .from("death_certificate_uploads")
        .getPublicUrl(proofName).data.publicUrl;

      // ---------- Upload Payment Screenshot ----------
      const paymentName = `death_payment_${Date.now()}_${
        form.payment_file.name
      }`;
      const { error: payErr } = await supabase.storage
        .from("death_certificate_uploads")
        .upload(paymentName, form.payment_file);

      if (payErr) throw payErr;

      const paymentUrl = supabase.storage
        .from("death_certificate_uploads")
        .getPublicUrl(paymentName).data.publicUrl;

      // ---------- Build time string ----------
      const finalTime = form.death_time
        ? `${form.death_time} ${form.death_time_period}`
        : "";

      // ---------- Prepare JSON form_data ----------
      const formDataJson = {
        deceased_name: form.deceased_name,
        death_date: form.death_date,
        death_time: finalTime,
        death_place: form.death_place,
        father_husband_name: form.father_husband_name,
      };

      // ---------- Insert into Universal Table ----------
      const { error } = await supabase.from("certificate_requests").insert([
        {
          service_key: "death_certificate",

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

      toast.success("Death Certificate Application Submitted!");

      setOpen(false);
      setForm({
        applicant_name: "",
        mobile: "",
        address: "",
        utr_number: "",

        proof_file: null,
        payment_file: null,

        deceased_name: "",
        death_date: "",
        death_time: "",
        death_time_period: "AM",
        death_place: "",
        father_husband_name: "",
      });

      setProofPreview(null);
      setPaymentPreview(null);
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  }

  return (
    <>
      <PageHeader
        title="Death Certificate"
        subtitle="मृत्यू प्रमाणपत्रासाठी ऑनलाइन अर्ज करा"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Death Certificate", href: null },
        ]}
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* LEFT – QR Section */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Scan & Pay</h2>
              <p className="text-gray-600">शुल्क भरून पावती अपलोड करा.</p>

              <div className="p-4 border rounded bg-gray-50 text-center space-y-4">
                <img src={qrCode} className="mx-auto max-h-64" alt="QR" />
                <div className="font-bold text-green-700 text-lg">
                  शुल्क: ₹ {amount}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT – Button */}
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
        title="Death Certificate Application"
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-auto"
        >
          {/* Applicant Information */}
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
              <label className="block text-sm font-medium mb-1">पत्ता *</label>
              <textarea
                name="address"
                rows="2"
                value={form.address}
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

          {/* Death Information */}
          <h3 className="font-semibold text-lg mt-3">Death Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock
              label="मृत व्यक्तीचे नाव *"
              name="deceased_name"
              value={form.deceased_name}
              onChange={handleChange}
            />

            <InputBlock
              label="मृत्यूची तारीख *"
              type="date"
              name="death_date"
              value={form.death_date}
              onChange={handleChange}
            />

            {/* TIME + AMPM */}
            <div>
              <label className="block text-sm font-medium mb-1">
                मृत्यूची वेळ
              </label>
              <div className="flex gap-2">
                <input
                  type="time"
                  name="death_time"
                  value={form.death_time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded bg-gray-50"
                />
                <select
                  name="death_time_period"
                  value={form.death_time_period}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded bg-gray-50"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <InputBlock
              label="मृत्यूचे ठिकाण *"
              name="death_place"
              value={form.death_place}
              onChange={handleChange}
            />

            <InputBlock
              label="वडील / पतीचे नाव"
              name="father_husband_name"
              value={form.father_husband_name}
              onChange={handleChange}
            />
          </div>

          {/* FILE UPLOADS */}
          <h3 className="font-semibold text-lg mt-3">Uploads</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Proof */}
            <div>
              <label className="block text-sm font-medium mb-1">
                मृत्यूचा पुरावा *
              </label>
              <input
                type="file"
                name="proof_file"
                accept="image/*,application/pdf"
                onChange={handleChange}
              />
              {proofPreview && (
                <img src={proofPreview} className="max-h-40 mt-2 rounded" />
              )}
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm font-medium mb-1">
                पेमेंट स्क्रीनशॉट *
              </label>
              <input
                type="file"
                name="payment_file"
                accept="image/*"
                onChange={handleChange}
              />
              {paymentPreview && (
                <img src={paymentPreview} className="max-h-40 mt-2 rounded" />
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
