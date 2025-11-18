import React, { useState, useEffect } from "react";
import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { supabase } from "../../../../services/supabaseClient";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";


// --- Reusable Form Components (Kept in the same file) ---

function FormInput({ label, name, type = "text", value, onChange, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded bg-gray-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        {...props}
      />
    </div>
  );
}

function FileUploadInput({ label, name, file, onChange, accept }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview(null);
      setFileName("");
      return;
    }
    setFileName(file.name);
    if (file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div>
      <label className="block text-sm mb-1 font-medium">{label}</label>
      <input
        type="file"
        accept={accept}
        name={name}
        onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100 cursor-pointer"
      />
      {preview && (
        <img
          src={preview}
          alt="File preview"
          className="max-h-40 mt-2 rounded border p-1"
        />
      )}
      {!preview && fileName && (
        <div className="mt-2 text-sm p-2 bg-gray-100 rounded border text-gray-700">
          Selected File: {fileName}
        </div>
      )}
    </div>
  );
}


// --- Main Reusable Application Component ---

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
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Dynamically generate initial form state
  const generateInitialState = () => {
    const initialState = {
      applicant_name: "",
      mobile: "",
      address: "",
      utr_number: "",
      proof_file: null,
      payment_file: null,
    };
    extraFields.forEach(field => {
      initialState[field.name] = "";
    });
    return initialState;
  };

  const [form, setForm] = useState(generateInitialState());

  // --- Data Fetching ---
  useEffect(() => {
    async function loadSettings() {
      setLoadingSettings(true);
      try {
        const { data, error } = await supabase
          .from("service_settings")
          .select("amount, qr_code_url")
          .eq("service_key", qrServiceKey)
          .single();
        if (error) throw error;
        setQrCode(data.qr_code_url);
        setAmount(data.amount);
      } catch (error) {
        toast.error("Failed to load payment settings!");
      } finally {
        setLoadingSettings(false);
      }
    }
    loadSettings();
  }, [qrServiceKey]);

  // --- Helper Functions ---
  const resetForm = () => {
    setForm(generateInitialState());
  };

  const uploadFile = async (file, prefix) => {
    const fileName = `${prefix}_${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    if (error) throw error;
    return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
  };

  // --- Event Handlers ---
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(name, file) {
    setForm((prev) => ({ ...prev, [name]: file }));
  }

  function validate() {
    // Standard fields
    if (!form.applicant_name.trim()) {
      toast.error("अर्जदाराचे नाव भरा"); return false;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      toast.error("मोबाईल नंबर बरोबर भरा"); return false;
    }
    if (!form.address.trim()) {
      toast.error("पत्ता भरा"); return false;
    }
    if (!form.utr_number.trim()) {
      toast.error("UTR / व्यवहार ID भरा"); return false;
    }

    // Dynamic extra fields
    for (const field of extraFields) {
      if (field.required && !form[field.name].trim()) {
        toast.error(`${field.label} आवश्यक आहे`);
        return false;
      }
    }

    // File fields
    if (!form.proof_file) {
      toast.error("पुरावा अपलोड करा"); return false;
    }
    if (!form.payment_file) {
      toast.error("पेमेंट स्क्रीनशॉट भरा"); return false;
    }
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      // --- 1. VALIDATE RECENT APPLICATION ---
      toast.info("Checking application history...");
      const NINE_MONTHS_AGO = new Date();
      NINE_MONTHS_AGO.setMonth(NINE_MONTHS_AGO.getMonth() - 9);

      const { data: existingApplication, error: checkError } = await supabase
        .from("certificate_requests")
        .select("created_at")
        .eq("mobile", form.mobile)
        .eq("service_key", serviceKey)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(); 

      if (checkError) throw new Error(`Failed to check history: ${checkError.message}`);

      if (existingApplication) {
        const lastApplicationDate = new Date(existingApplication.created_at);
        if (lastApplicationDate > NINE_MONTHS_AGO) {
          toast.warn("You have already applied for this service in the last 9 months.");
          return; 
        }
      }

      // --- 2. HANDLE FILES (COMPRESSION) ---
      toast.info("Processing files, please wait...");
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
      let proofFileToUpload = form.proof_file;
      let paymentFileToUpload = form.payment_file;

      if (form.proof_file.type.startsWith("image/")) {
        try {
          toast.info("Compressing proof file...");
          proofFileToUpload = await imageCompression(form.proof_file, options);
        } catch (err) { toast.warn("Could not compress proof, uploading original."); }
      } else if (form.proof_file.type === "application/pdf") {
        toast.info("Preparing PDF proof for upload...");
      }

      if (form.payment_file.type.startsWith("image/")) {
        try {
          toast.info("Compressing payment screenshot...");
          paymentFileToUpload = await imageCompression(form.payment_file, options);
        } catch (err) { toast.warn("Could not compress payment file, uploading original."); }
      } else if (form.payment_file.type === "application/pdf") {
        toast.info("Preparing PDF payment file for upload...");
      }

      // --- 3. UPLOAD FILES ---
      const [proofUrl, paymentUrl] = await Promise.all([
        uploadFile(proofFileToUpload, "proof"),
        uploadFile(paymentFileToUpload, "payment"),
      ]);

      // --- 4. INSERT INTO DB ---
      const formDataJson = {};
      extraFields.forEach(field => {
        formDataJson[field.name] = form[field.name];
      });

      const { error: insertError } = await supabase.from("certificate_requests").insert([
        {
          service_key: serviceKey,
          applicant_name: form.applicant_name,
          mobile: form.mobile,
          address: form.address,
          utr_number: form.utr_number,
          proof_url: proofUrl,
          payment_screenshot_url: paymentUrl,
          form_data: formDataJson,
        },
      ]);

      if (insertError) throw insertError;

      toast.success("Application Submitted Successfully!");
      setOpen(false);
      resetForm();

    } catch (err) {
      console.error("Submission failed:", err);
      toast.error("Submission Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  }

  // --- Render ---
  return (
    <>
      <PageHeader
        title={serviceName}
        subtitle={`Apply online for ${serviceName}`}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: serviceName, href: null },
        ]}
      />

      <div className="container py-12 grid lg:grid-cols-3 gap-8">
        {/* LEFT – QR CODE */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Scan & Pay</h2>
              <div className="p-4 border rounded bg-gray-50 text-center space-y-4 min-h-[250px] flex items-center justify-center">
                {loadingSettings ? (
                  <div className="text-gray-500">Loading payment details...</div>
                ) : (
                  <div>
                    {qrCode ? (
                      <img src={qrCode} className="mx-auto max-h-64" alt="QR Code" />
                    ) : (
                      <p className="text-red-500">QR Code not available.</p>
                    )}
                    <div className="font-bold text-green-700 text-lg mt-4">
                      शुल्क: ₹ {amount}
                    </div>
                  </div>
                )}
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
        title={`${serviceName} Application`}
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-auto p-1">
          <h3 className="font-semibold text-lg mt-3">Applicant Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Standard Fields */}
            <FormInput
              label="अर्जदाराचे नाव *"
              name="applicant_name"
              value={form.applicant_name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="मोबाईल नंबर *"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              type="tel"
              pattern="[6-9][0-9]{9}"
              required
            />
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm mb-1 font-medium">पत्ता *</label>
              <textarea
                id="address" name="address" value={form.address}
                rows="2" onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-50 border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              ></textarea>
            </div>
            <FormInput
              label="UTR / व्यवहार ID *"
              name="utr_number"
              value={form.utr_number}
              onChange={handleChange}
              required
            />

            {/* Dynamic Extra Fields */}
            {extraFields.map((field) => (
              <FormInput
                key={field.name}
                label={field.label + (field.required ? " *" : "")}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
                type={field.type || "text"} // <-- This is the important update
              />
            ))}
          </div>

          <h3 className="font-semibold text-lg mt-3">Uploads</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <FileUploadInput
              label="पुरावा (Proof) *"
              name="proof_file"
              file={form.proof_file}
              onChange={(file) => handleFileChange("proof_file", file)}
              accept="image/*,application/pdf"
            />
            <FileUploadInput
              label="पेमेंट स्क्रीनशॉट *"
              name="payment_file"
              file={form.payment_file}
              onChange={(file) => handleFileChange("payment_file", file)}
              accept="image/*,application/pdf"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Application"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}