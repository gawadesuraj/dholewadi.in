import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { supabase } from "../../../services/supabaseClient";
import { toast } from "react-toastify";

import ApplicantInfo from "../forms/applicant_form/ApplicantInfo";
import FileUploads from "../forms/applicant_form/FileUploads";

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

export default function BirthCertificateForm() {
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [amount, setAmount] = useState(0);

  const [previewProof, setPreviewProof] = useState(null);
  const [previewPayment, setPreviewPayment] = useState(null);

  const [form, setForm] = useState({
    applicant_name: "",
    mobile: "",
    address: "",
    utr_number: "",

    child_name: "",
    birth_date: "",
    birth_time: "",
    birth_time_period: "AM",
    birth_location: "",
    father_name: "",
    mother_name: "",

    proof_file: null,
    payment_file: null,
  });

  // Load QR & Amount
  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from("service_settings")
        .select("amount, qr_code_url")
        .eq("service_key", "birth_certificate")
        .single();

      if (data) {
        setAmount(data.amount);
        setQrCode(data.qr_code_url);
      }
    }
    loadSettings();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function validate() {
    if (!form.child_name) return toast.error("बालकाचे नाव भरा");
    if (!form.birth_date) return toast.error("जन्म दिनांक भरा");
    if (!form.mother_name) return toast.error("आईचे नाव भरा");
    if (!form.applicant_name) return toast.error("अर्जदाराचे नाव भरा");
    if (!form.mobile) return toast.error("मोबाईल नंबर भरा");
    if (!form.payment_file) return toast.error("पेमेंट स्क्रीनशॉट अपलोड करा");
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Upload PROOF (optional)
      let proofUrl = { publicUrl: null };

      if (form.proof_file) {
        const proofName = `birth_proof_${Date.now()}_${form.proof_file.name}`;
        const { error: proofErr } = await supabase.storage
          .from("birth_certificate_uploads")
          .upload(proofName, form.proof_file);

        if (proofErr) throw proofErr;

        const { data } = supabase.storage
          .from("birth_certificate_uploads")
          .getPublicUrl(proofName);

        proofUrl = data;
      }

      // Upload PAYMENT screenshot
      const payName = `birth_payment_${Date.now()}_${form.payment_file.name}`;
      const { error: payErr } = await supabase.storage
        .from("birth_certificate_uploads")
        .upload(payName, form.payment_file);

      if (payErr) throw payErr;

      const { data: payUrl } = supabase.storage
        .from("birth_certificate_uploads")
        .getPublicUrl(payName);

      const finalBirthTime = form.birth_time
        ? `${form.birth_time} ${form.birth_time_period}`
        : "";

      // Insert in UNIVERSAL TABLE
      const { error } = await supabase.from("certificate_requests").insert([
        {
          service_key: "birth_certificate",

          applicant_name: form.applicant_name,
          mobile: form.mobile,
          address: form.address,
          utr_number: form.utr_number,

          payment_screenshot_url: payUrl.publicUrl,
          proof_url: proofUrl.publicUrl,

          form_data: {
            child_name: form.child_name,
            birth_date: form.birth_date,
            birth_time: finalBirthTime,
            birth_location: form.birth_location,
            father_name: form.father_name,
            mother_name: form.mother_name,
          },
        },
      ]);

      if (error) throw error;

      toast.success("Birth Certificate Application Submitted!");

      setOpen(false);
      setForm({
        applicant_name: "",
        mobile: "",
        address: "",
        utr_number: "",
        child_name: "",
        birth_date: "",
        birth_time: "",
        birth_time_period: "AM",
        birth_location: "",
        father_name: "",
        mother_name: "",
        proof_file: null,
        payment_file: null,
      });
      setPreviewProof(null);
      setPreviewPayment(null);
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  }

  return (
    <>
      <PageHeader
        title="Birth Certificate"
        subtitle="जन्म प्रमाणपत्रासाठी ऑनलाइन अर्ज करा"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Birth Certificate", href: null },
        ]}
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* LEFT – QR + Amount */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4 text-center">
              <h2 className="text-xl font-semibold">Scan & Pay</h2>
              <p className="text-gray-600">शुल्क भरा आणि पावती अपलोड करा.</p>

              <img src={qrCode} className="mx-auto max-h-64" alt="QR Code" />

              <div className="font-bold text-green-700 text-lg">
                शुल्क: ₹ {amount}
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT – Apply button */}
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
        title="Birth Certificate Application"
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[70vh] overflow-auto p-1"
        >
          {/* CHILD DETAILS */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Child Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <InputBlock
                label="बालकाचे नाव *"
                name="child_name"
                value={form.child_name}
                onChange={handleChange}
              />

              <InputBlock
                label="जन्म दिनांक *"
                name="birth_date"
                type="date"
                value={form.birth_date}
                onChange={handleChange}
              />

              {/* Time + AM/PM */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  जन्म वेळ
                </label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    name="birth_time"
                    value={form.birth_time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded bg-gray-50"
                  />
                  <select
                    name="birth_time_period"
                    value={form.birth_time_period}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded bg-gray-50"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              <InputBlock
                label="जन्म स्थान"
                name="birth_location"
                value={form.birth_location}
                onChange={handleChange}
              />

              <InputBlock
                label="वडिलांचे नाव"
                name="father_name"
                value={form.father_name}
                onChange={handleChange}
              />

              <InputBlock
                label="आईचे नाव *"
                name="mother_name"
                value={form.mother_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Applicant Info Component */}
          <ApplicantInfo form={form} setForm={setForm} />

          {/* File Uploads Component */}
          <FileUploads
            form={form}
            setForm={setForm}
            showProof={true}
            showPayment={true}
            previewProof={previewProof}
            setPreviewProof={setPreviewProof}
            previewPayment={previewPayment}
            setPreviewPayment={setPreviewPayment}
          />

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-3">
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
