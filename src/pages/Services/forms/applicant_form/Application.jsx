import React, { useState, useEffect, forwardRef } from "react";
// Import dependencies
import Modal from "../../../../components/ui/Modal";
import { supabase } from "../../../../services/supabaseClient";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { List, QrCode, FileCheck, ArrowRight, Check } from "lucide-react";
// Assuming these are imported or defined elsewhere in your project structure
// If Card and Button are imported from UI folders, they should be mocked or imported
// correctly. For this final structure, we use placeholders for clarity, but assume
// the full component definitions (like those you provided) are used if this were
// a complete file replacement.
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";

// ====================================================================
// 👤 Reusable Form Components
// ====================================================================

function FormInput({ label, name, type = "text", value, onChange, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition duration-150"
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
      <label className="block text-sm mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        name={name}
        onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
        className="block w-full text-sm text-gray-600
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-teal-50 file:text-teal-700
                   hover:file:bg-teal-100 cursor-pointer"
      />
      {preview && (
        <img
          src={preview}
          alt="File preview"
          className="max-h-40 mt-3 rounded-lg border border-gray-200 p-1 shadow-sm"
        />
      )}
      {!preview && fileName && (
        <div className="mt-3 text-sm p-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-700 truncate">
          Selected File: **{fileName}**
        </div>
      )}
    </div>
  );
}

// --- Custom PageHeader Component ---
const CustomPageHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
    <header className="relative bg-gradient-to-r from-teal-600 to-cyan-700 p-8 sm:p-12 text-center text-white">
      <div className="absolute inset-0 opacity-10"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-4">
          <div className="bg-white/20 p-3 rounded-full shadow-inner">
            <Icon className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title} अर्ज</h1>
        <p className="text-teal-100 text-lg">
          {subtitle} - ग्रामपंचायत ढोलेवाडी
        </p>
      </div>
    </header>
  </div>
);

// ====================================================================
// --- Main Reusable Application Component (With Reset Fixes) ---
// ====================================================================

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
    extraFields.forEach((field) => {
      initialState[field.name] = "";
    });
    return initialState;
  };

  const [form, setForm] = useState(generateInitialState());

  // --- Data Fetching (No change) ---
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

  // 🎯 FIX 1: Custom function to close modal AND reset form
  const handleCloseModal = () => {
    setOpen(false);
    resetForm();
  };

  const uploadFile = async (file, prefix) => {
    const fileName = `${prefix}_${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);
    if (error) throw error;
    return supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl;
  };

  // --- Event Handlers (Validation and Submission) ---
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(name, file) {
    setForm((prev) => ({ ...prev, [name]: file }));
  }

  function validate() {
    // ... (Validation logic remains the same)
    if (!form.applicant_name.trim()) {
      toast.error("अर्जदाराचे नाव भरा");
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      toast.error("मोबाईल नंबर बरोबर भरा");
      return false;
    }
    if (!form.address.trim()) {
      toast.error("पत्ता भरा");
      return false;
    }
    if (!form.utr_number.trim()) {
      toast.error("UTR / व्यवहार ID भरा");
      return false;
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
      toast.error("पुरावा अपलोड करा");
      return false;
    }
    if (!form.payment_file) {
      toast.error("पेमेंट स्क्रीनशॉट भरा");
      return false;
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

      if (checkError)
        throw new Error(`Failed to check history: ${checkError.message}`);

      if (existingApplication) {
        const lastApplicationDate = new Date(existingApplication.created_at);
        if (lastApplicationDate > NINE_MONTHS_AGO) {
          toast.warn(
            "You have already applied for this service in the last 9 months."
          );
          // 🎯 FIX 2: Reset form if application is rejected due to timing constraint
          resetForm();
          return;
        }
      }

      // --- 2. HANDLE FILES (COMPRESSION) ---
      toast.info("Processing files, please wait...");
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      let proofFileToUpload = form.proof_file;
      let paymentFileToUpload = form.payment_file;

      if (form.proof_file.type.startsWith("image/")) {
        try {
          toast.info("Compressing proof file...");
          proofFileToUpload = await imageCompression(form.proof_file, options);
        } catch (err) {
          toast.warn("Could not compress proof, uploading original.");
        }
      } else if (form.proof_file.type === "application/pdf") {
        toast.info("Preparing PDF proof for upload...");
      }

      if (form.payment_file.type.startsWith("image/")) {
        try {
          toast.info("Compressing payment screenshot...");
          paymentFileToUpload = await imageCompression(
            form.payment_file,
            options
          );
        } catch (err) {
          toast.warn("Could not compress payment file, uploading original.");
        }
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
      extraFields.forEach((field) => {
        formDataJson[field.name] = form[field.name];
      });

      const { error: insertError } = await supabase
        .from("certificate_requests")
        .insert([
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
      resetForm(); // Reset on successful submission
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error(
        "Submission Error: " + (err.message || "An unknown error occurred.")
      );
    } finally {
      setSubmitting(false);
    }
  }

  // --- Render ---
  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      {/* HEADER SECTION */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CustomPageHeader
          title={serviceName}
          subtitle={`Apply online for ${serviceName}`}
          icon={FileCheck}
        />
      </div>

      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: QR Code & Payment Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 flex items-center">
                <QrCode className="w-6 h-6 text-teal-600 mr-2" />
                Scan & Pay (शुल्क भरा)
              </h2>

              <div className="p-6 border-2 border-dashed border-teal-300 rounded-xl bg-teal-50 text-center space-y-6 min-h-[300px] flex flex-col items-center justify-center">
                {loadingSettings ? (
                  <div className="text-gray-500 text-lg">
                    Loading payment details...
                  </div>
                ) : (
                  <>
                    {qrCode ? (
                      <img
                        src={qrCode}
                        className="mx-auto max-h-80 w-auto rounded-lg shadow-xl"
                        alt="QR Code"
                      />
                    ) : (
                      <p className="text-red-500 font-semibold text-lg">
                        QR Code not available. Please contact the Grampanchayat
                        office.
                      </p>
                    )}
                    <div className="font-extrabold text-teal-800 text-3xl mt-4 p-2 bg-white rounded-lg shadow-md border-b-4 border-teal-500">
                      शुल्क: ₹ {amount}
                    </div>
                    <p className="text-sm text-gray-600">
                      **टीप:** अर्ज सबमिट करण्यापूर्वी पेमेंट करा आणि त्याचा
                      **UTR / व्यवहार ID** तसेच **स्क्रीनशॉट** तयार ठेवा.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Action Buttons */}
          <div>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-4 text-center sticky top-4">
              <Button
                className="w-full bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
                onClick={() => setOpen(true)}
              >
                📝 Apply Online (ऑनलाईन अर्ज करा)
              </Button>
              <Button
                variant="outline"
                className="w-full text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                🔍 Check Status (स्थिती तपासा)
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal
        isOpen={open}
        // 🎯 FIX 3: Call the custom handler to close and reset the form
        onClose={handleCloseModal}
        title={`${serviceName} Application Form`}
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-h-[80vh] overflow-y-auto p-4"
        >
          {/* Section: Applicant Information */}
          <div className="border-b pb-4">
            <h3 className="font-bold text-xl text-teal-700 mb-4">
              अर्जदार माहिती (Applicant Information)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Standard Fields */}
              <FormInput
                label="अर्जदाराचे संपूर्ण नाव *"
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
                <label
                  htmlFor="address"
                  className="block text-sm mb-1 font-medium text-gray-700"
                >
                  पत्ता *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  rows="3"
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
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
                  type={field.type || "text"}
                />
              ))}
            </div>
          </div>

          {/* Section: Uploads */}
          <div className="border-b pb-4">
            <h3 className="font-bold text-xl text-teal-700 mb-4">
              आवश्यक कागदपत्रे अपलोड करा (Uploads)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <FileUploadInput
                label="पुरावा (उदा. आधार, ओळखपत्र) *"
                name="proof_file"
                file={form.proof_file}
                onChange={(file) => handleFileChange("proof_file", file)}
                accept="image/*,application/pdf"
              />
              <FileUploadInput
                label="पेमेंट स्क्रीनशॉट / स्लिप *"
                name="payment_file"
                file={form.payment_file}
                onChange={(file) => handleFileChange("payment_file", file)}
                accept="image/*,application/pdf"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              **सूचना:** फाईलचा आकार १MB पेक्षा कमी असावा. (Images will be
              compressed)
            </p>
          </div>

          {/* Footer: Submit Actions */}
          <div className="flex justify-end gap-3 pt-4 sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 -mx-4 px-4">
            <Button
              type="button"
              variant="outline"
              // 🎯 FIX 4: Use the custom handler for consistency when canceling
              onClick={handleCloseModal}
            >
              Cancel (रद्द करा)
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
            >
              {submitting
                ? "Submitting…"
                : "✅ Submit Application (अर्ज सबमिट करा)"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
