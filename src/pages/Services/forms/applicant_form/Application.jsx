import React, { useState, useEffect, useCallback, useRef } from "react";
import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { supabase } from "../../../../services/supabaseClient";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import throttle from "lodash.throttle";
import DOMPurify from "dompurify";
import { z } from "zod";

/* --- Small input component --- */
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

/* --- Helper: file validators --- */
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, "application/pdf"];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export default function Application({
  serviceKey,
  serviceName,
  qrServiceKey,
  bucket,
  extraFields = [],
}) {
  /* --- UI state --- */
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [amount, setAmount] = useState(0);

  /* --- Preview URLs (object URLs) --- */
  const [previewProof, setPreviewProof] = useState(null);
  const [previewPay, setPreviewPay] = useState(null);

  /* --- Raw file/data form state --- */
  const [form, setForm] = useState({
    applicant_name: "",
    mobile: "",
    address: "",
    utr_number: "",
    proof_file: null,
    payment_file: null,
    ...Object.fromEntries(extraFields.map((f) => [f.name, ""])),
  });

  /* --- refs for cleanup and to hold throttled function --- */
  const objectUrlsRef = useRef([]);
  const throttledSubmitRef = useRef(null);

  /* --- Build Zod schema dynamically including file checks --- */
  const buildSchema = useCallback(() => {
    const base = {
      applicant_name: z
        .string()
        .min(1, "Applicant name is required")
        .max(100, "Name is too long"),
      mobile: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number (10 digits starting with 6-9)"),
      address: z.string().max(500).optional(),
      utr_number: z.string().max(50).optional(),
      proof_file: z.any().refine((f) => f instanceof File, { message: "Proof file is required" }),
      payment_file: z.any().refine((f) => f instanceof File, { message: "Payment file is required" }),
    };

    extraFields.forEach((f) => {
      base[f.name] = f.required ? z.string().min(1, `${f.label} is required`) : z.string().optional();
    });

    return z.object(base);
  }, [extraFields]);

  /* --- Load QR code & amount from DB --- */
  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from("service_settings")
          .select("amount, qr_code_url")
          .eq("service_key", qrServiceKey)
          .single();

        if (error) {
          console.error("loadSettings error:", error);
          toast.error("Failed to load payment settings");
          return;
        }

        if (data) {
          setAmount(data.amount ?? 0);
          setQrCode(data.qr_code_url ?? "");
        }
      } catch (err) {
        console.error("Unexpected error loading settings:", err);
        toast.error("Failed to load payment settings");
      }
    }

    if (qrServiceKey) loadSettings();
  }, [qrServiceKey]);

  /* --- Cleanup object URLs on unmount --- */
  useEffect(() => {
    return () => {
      (objectUrlsRef.current || []).forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
      // cancel throttled if exists
      if (throttledSubmitRef.current && throttledSubmitRef.current.cancel) {
        throttledSubmitRef.current.cancel();
      }
    };
  }, []);

  /* --- Utility: create and track object URL --- */
  function makeObjectUrl(file) {
    const url = URL.createObjectURL(file);
    objectUrlsRef.current.push(url);
    return url;
  }

  /* --- File handler with compression for images --- */
  async function handleFileChange(e) {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;
    let file = files[0];

    // Basic file checks
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Invalid file type. Allowed: JPG, PNG, WEBP, PDF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("File too large. Max allowed size is 5 MB.");
      return;
    }

    // If image -> attempt compression
    if (file.type.startsWith("image/")) {
      try {
        const options = {
          maxSizeMB: 0.05, // target ~50KB (aggressive). Adjust if needed.
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          quality: 0.85,
          preserveExif: false,
        };
        const compressed = await imageCompression(file, options);
        // In some cases compressed may be larger; choose smaller of the two
        if (compressed && compressed.size > 0 && compressed.size < file.size) {
          file = compressed;
          const originalMB = (files[0].size / (1024 * 1024)).toFixed(2);
          const compressedKB = (file.size / 1024).toFixed(2);
          toast.success(`Image compressed: ${originalMB}MB → ${compressedKB}KB`);
        } else {
          // compression didn't help
          const originalMB = (file.size / (1024 * 1024)).toFixed(2);
          toast.info(`Using original image (size ${originalMB}MB)`);
        }
      } catch (err) {
        console.warn("Image compression failed, using original file", err);
        toast.warn("Image compression failed — using original file");
      }
    } else if (file.type === "application/pdf") {
      // Client-side PDF optimization is limited — show note to user.
      // Server-side compression is recommended for production.
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.info(`PDF ready. Size: ${sizeMB}MB (server-side compression recommended)`);
    }

    // Set preview
    const url = makeObjectUrl(file);
    if (name === "proof_file") setPreviewProof(url);
    if (name === "payment_file") setPreviewPay(url);

    setForm((p) => ({ ...p, [name]: file }));
  }

  /* --- Fallback for older inputs (text and dynamic fields) --- */
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  /* --- Validation using Zod schema --- */
  function validate() {
    try {
      const schema = buildSchema();
      schema.parse(form);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Show the first few errors as toasts
        for (const e of err.errors.slice(0, 5)) {
          toast.error(e.message);
        }
      } else {
        toast.error("Validation failed");
      }
      return false;
    }
  }

  /* --- Core submit function (async) --- */
  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      try {
        // Sanitize text inputs
        const applicant_name = DOMPurify.sanitize(form.applicant_name || "");
        const mobile = DOMPurify.sanitize(form.mobile || "");
        const address = DOMPurify.sanitize(form.address || "");
        const utr_number = DOMPurify.sanitize(form.utr_number || "");

        // Upload proof file
        const proofFile = form.proof_file;
        const proofKey = `${serviceKey}_proof_${Date.now()}_${proofFile.name}`;
        const { error: proofUploadError } = await supabase.storage.from(bucket).upload(proofKey, proofFile);
        if (proofUploadError) throw proofUploadError;
        const { data: proofUrlData } = supabase.storage.from(bucket).getPublicUrl(proofKey);
        const proofPublicUrl = proofUrlData?.publicUrl ?? "";

        // Upload payment screenshot
        const payFile = form.payment_file;
        const payKey = `${serviceKey}_payment_${Date.now()}_${payFile.name}`;
        const { error: payUploadError } = await supabase.storage.from(bucket).upload(payKey, payFile);
        if (payUploadError) throw payUploadError;
        const { data: payUrlData } = supabase.storage.from(bucket).getPublicUrl(payKey);
        const payPublicUrl = payUrlData?.publicUrl ?? "";

        // Build sanitized dynamic form_data
        const formData = {};
        for (const f of extraFields) {
          // sanitize string fields
          formData[f.name] = typeof form[f.name] === "string" ? DOMPurify.sanitize(form[f.name]) : form[f.name];
        }

        // Insert into DB
        const { error: insertError } = await supabase.from("certificate_requests").insert([
          {
            service_key: serviceKey,
            applicant_name,
            mobile,
            address,
            utr_number,
            proof_url: proofPublicUrl,
            payment_screenshot_url: payPublicUrl,
            form_data: formData,
            created_at: new Date().toISOString(),
          },
        ]);

        if (insertError) throw insertError;

        toast.success("Application submitted successfully!");

        // Reset form and previews
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

        // revoke previews and clear refs
        (objectUrlsRef.current || []).forEach((url) => URL.revokeObjectURL(url));
        objectUrlsRef.current = [];
        setPreviewProof(null);
        setPreviewPay(null);
      } catch (err) {
        console.error("Submit error:", err);
        const message = err?.message || JSON.stringify(err);
        toast.error("Submission failed: " + message);
      }
    },
    [form, extraFields, serviceKey, bucket, buildSchema]
  );

  /* --- Throttled submit (1000ms) and store ref for cleanup --- */
  useEffect(() => {
    // create throttled version and store ref
    throttledSubmitRef.current = throttle(submitHandler, 1000, { leading: true, trailing: false });

    return () => {
      // cancel on unmount
      if (throttledSubmitRef.current && throttledSubmitRef.current.cancel) {
        throttledSubmitRef.current.cancel();
      }
    };
  }, [submitHandler]);

  /* --- Event wrapper for form submit that calls throttled function --- */
  function onFormSubmit(e) {
    if (!throttledSubmitRef.current) {
      // fallback to direct call
      submitHandler(e);
      return;
    }
    throttledSubmitRef.current(e);
  }

  /* --- Small helpers for rendering previews based on MIME type --- */
  function renderPreview(url, file) {
    if (!url || !file) return null;
    if (file.type === "application/pdf") {
      return (
        <div className="mt-2">
          <a href={url} target="_blank" rel="noreferrer" className="underline">
            View uploaded PDF
          </a>
          <div className="text-sm text-gray-500">PDF preview (opens in new tab)</div>
        </div>
      );
    }
    // images
    return <img src={url} alt="preview" className="max-h-40 mt-2 rounded" />;
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
                {qrCode ? (
                  <img src={qrCode} className="mx-auto max-h-64" alt="QR Code" />
                ) : (
                  <div className="text-sm text-gray-400">QR code not configured</div>
                )}

                <div className="text-lg font-bold text-green-700">शुल्क: ₹ {amount}</div>
                <div className="text-xs text-gray-500">Scan the QR or use UPI to pay, then upload payment screenshot below.</div>
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
              <Button
                variant="ghost"
                onClick={async () => {
                  // quick "status" checker example (optional)
                  toast.info("Check status feature coming soon");
                }}
              >
                Check Status
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* FORM MODAL */}
      <Modal isOpen={open} onClose={() => setOpen(false)} size="xl" title={serviceName}>
        <form onSubmit={onFormSubmit} className="space-y-4 max-h-[70vh] overflow-auto">
          <div className="grid md:grid-cols-2 gap-4">
            <InputBlock label="Applicant Name *" name="applicant_name" value={form.applicant_name} onChange={handleChange} />
            <InputBlock label="Mobile *" name="mobile" value={form.mobile} onChange={handleChange} />
            <InputBlock label="Address" name="address" value={form.address} onChange={handleChange} />
            <InputBlock label="UTR Number" name="utr_number" value={form.utr_number} onChange={handleChange} />

            {/* Dynamic custom fields */}
            {extraFields.map((f, i) => (
              <InputBlock key={i} label={`${f.label} ${f.required ? "*" : ""}`} name={f.name} value={form[f.name]} onChange={handleChange} />
            ))}

            {/* Proof Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">Proof Document *</label>
              <input type="file" name="proof_file" accept={ALLOWED_FILE_TYPES.join(",")} onChange={handleFileChange} />
              {renderPreview(previewProof, form.proof_file)}
            </div>

            {/* Payment Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">Payment Screenshot *</label>
              <input type="file" name="payment_file" accept={ALLOWED_FILE_TYPES.join(",")} onChange={handleFileChange} />
              {renderPreview(previewPay, form.payment_file)}
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
