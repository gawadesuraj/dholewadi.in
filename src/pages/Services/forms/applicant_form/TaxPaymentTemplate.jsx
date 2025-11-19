// src/pages/Services/forms/PropertyTaxTemplate.jsx (The reusable template)

/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import PageHeader from "../../../../components/common/PageHeader";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal";
import { toast } from "react-toastify";
import { supabase } from "../../../../services/supabaseClient";
import imageCompression from "browser-image-compression";

// ----------------------------------------------------------------------
// REUSABLE INPUT COMPONENT
// ----------------------------------------------------------------------

function InputBlock({
  label,
  name,
  type = "text",
  onChange,
  value,
  readOnly,
  required = false,
}) {
  const inputId = name;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm mb-1 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          onChange={onChange}
          value={value}
          readOnly={readOnly}
          rows={4} // Default rows for textarea
          className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
          required={required}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          readOnly={readOnly}
          className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
          required={required} // Propagate required state
        />
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// REUSABLE TEMPLATE COMPONENT
// ----------------------------------------------------------------------

export default function TaxPaymentTemplate({ config }) {
  // Destructure config for easier access
  const { serviceKey, qrServiceKey, bucket, title, subtitle, fields, historyCheckConfig } = config;
    
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [initialAmount, setInitialAmount] = useState(""); 

  const fileRef = useRef(null);

  // Function to generate initial state (now uses config.fields)
  const generateInitialState = (fixedAmount) => {
    const initialState = {
        amount: fixedAmount || "",
        mobile: "",
        utr_number: "",
        payment_file: null,
    };
    // Include all dynamic fields from config
    fields.forEach(field => {
        initialState[field.name] = "";
    });
    return initialState;
  };

  const [form, setForm] = useState(generateInitialState(""));

  // 🔥 FETCH AMOUNT + QR FROM service_settings TABLE (Uses qrServiceKey)
  useEffect(() => {
    async function loadServiceSettings() {
      const { data, error } = await supabase
        .from("service_settings")
        .select("amount, qr_code_url")
        .eq("service_key", qrServiceKey)
        .single();

      if (error) {
        console.error(error);
        toast.error("Failed to load payment settings");
        return;
      }

      setInitialAmount(data.amount);
      setForm((prev) => ({ ...prev, amount: data.amount }));
      setQrCode(data.qr_code_url);
    }

    loadServiceSettings();
  }, [qrServiceKey]);

  // --- Reset Function ---
  const resetForm = () => {
    setForm(generateInitialState(initialAmount));
    setPreview(null);
    if (fileRef.current) {
      fileRef.current.value = ""; // Clear file input manually
    }
  };

  // --- Handler for Modal Close/Cancel ---
  const handleCloseModal = () => {
    setOpen(false);
    resetForm();
  };

  // --- Change Handler (Simplified for clarity, keeps compression logic) ---
  async function handleChange(e) {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      let f = files[0];
      const originalSize = (f.size / 1024 / 1024).toFixed(2); // MB

      if (f.type.startsWith("image/")) {
        try {
          const options = { maxSizeMB: 0.05, maxWidthOrHeight: 1200, useWebWorker: true, quality: 0.85, preserveExif: false };
          f = await imageCompression(f, options);
          const compressedSize = (f.size / 1024).toFixed(2);
          toast.success(`Image compressed successfully! Original: ${originalSize}MB → Compressed: ${compressedSize}KB`);
        } catch (error) {
          console.error("Compression failed:", error);
          toast.error("Failed to compress image, using original file");
        }
      } else if (f.type === "application/pdf") {
        toast.success(`PDF optimized! Size: ${originalSize}MB (Note: Full compression available on server-side)`);
      }

      setForm((p) => ({ ...p, [name]: f }));
      if (f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
      else setPreview(null); 
      
    } else if (files) {
        setForm((p) => ({ ...p, [name]: null }));
        setPreview(null);
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  }

  // --- Validation Logic (Flexible based on config.fields) ---
  function validate() {
    
    // 1. Validate fields marked as required in the config (e.g., owner_name)
    for (const field of fields) {
        if (field.required && !form[field.name]?.trim()) {
            toast.error(`कृपया ${field.label} भरा`);
            return false;
        }
    }

    // 2. Validate core mandatory fields
    if (!form.mobile || !/^[6-9]\d{9}$/.test(form.mobile)) {
      toast.error("कृपया वैध मोबाईल नंबर भरा"); return false;
    }
    if (!form.amount) {
      toast.error("रक्कम लोड करण्यात समस्या"); return false;
    }
    if (!form.utr_number.trim()) {
      toast.error("कृपया UTR / व्यवहार ID भरा"); return false;
    }
    if (!form.payment_file) {
      toast.error("कृपया पेमेंटची पावती / स्क्रीनशॉट अपलोड करा"); return false;
    }
    return true;
  }

  // --- Submission Logic (Handles custom history check) ---
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      // 🛑 CUSTOM HISTORY CHECK LOGIC
      if (historyCheckConfig && historyCheckConfig.type === 'property_tax') {
        const [propIdField, ownerNameField] = historyCheckConfig.checkIdentifierFields;
        const propertyId = form[propIdField] || '';
        const ownerName = form[ownerNameField] || '';
        
        const identifier = propertyId.trim() || ownerName.trim();
        
        if (identifier) {
            toast.info("Checking previous tax payment history...");
            const NINE_MONTHS_AGO = new Date();
            NINE_MONTHS_AGO.setMonth(NINE_MONTHS_AGO.getMonth() - 9);

            // Construct the OR query using the configured fields
            const orQuery = [
                propertyId.trim() ? `${propIdField}.eq.${propertyId.trim()}` : null,
                ownerName.trim() ? `${ownerNameField}.eq.${ownerName.trim()}` : null
            ].filter(Boolean).join(',');

            const { data: existingPayment, error: checkError } = await supabase
                .from(historyCheckConfig.checkTable) // 'property_tax_payments'
                .select("created_at")
                .or(orQuery)
                .order("created_at", { ascending: false })
                .limit(1)
                .maybeSingle();

            if (checkError) console.error("History check failed:", checkError.message);

            if (existingPayment) {
                const lastPaymentDate = new Date(existingPayment.created_at);
                if (lastPaymentDate > NINE_MONTHS_AGO) {
                    toast.warn("You have already submitted a property tax payment in the last 9 months for this property/owner. Please wait or check status.");
                    resetForm();
                    setSubmitting(false);
                    return; 
                }
            }
        }
      }
      // -------------------------------------------------------------

      // 🔵 1) UPLOAD FILE (Uses bucket)
      const fileName = `tax_${Date.now()}_${form.payment_file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, form.payment_file);

      if (uploadError) throw uploadError;

      const { data: fileData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      // 🔵 2) INSERT DATABASE RECORD (Into property_tax_payments table)
      // Note: We insert into the designated table ('property_tax_payments' here)
      const { error } = await supabase.from(historyCheckConfig.checkTable).insert([
        {
          property_id: form.property_id,
          owner_name: form.owner_name,
          property_address: form.property_address,
          tax_year: form.tax_year,
          amount: form.amount,
          mobile: form.mobile,
          utr_number: form.utr_number,
          screenshot_url: fileData.publicUrl,
        },
      ]);

      if (error) throw error;

      toast.success("Payment submitted successfully! Your request is being processed.");
      handleCloseModal();

    } catch (err) {
      console.error(err);
      toast.error("Error submitting form: " + (err.message || "An unknown error occurred."));
    }

    setSubmitting(false);
  }

  // --- Render ---
  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: title, href: null },
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

        {/* RIGHT SIDE — BUTTONS */}
        <div>
          <Card>
            <div className="p-6 text-center space-y-3">
              <Button className="w-full" onClick={() => setOpen(true)}>
                Pay / Apply
              </Button>

              <Button variant="outline" className="w-full">
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
        onClose={handleCloseModal}
        title={title}
        size="xl"
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-auto"
        >
          <div className="grid md:grid-cols-2 gap-4">
            
            {/* Render Dynamic Fields from Config */}
            {fields.map((field) => (
                <div key={field.name} className={field.colSpan === 2 ? "md:col-span-2" : ""}>
                    <InputBlock
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={handleChange}
                        required={field.required}
                    />
                </div>
            ))}
            
            {/* Core Fields */}
            <InputBlock
              label="रक्कम (₹)"
              name="amount"
              value={form.amount}
              readOnly
            />

            <InputBlock
              label="व्हाट्सअप / मोबाईल *"
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              required={true}
            />

            <InputBlock
              label="UTR / Transaction ID *"
              name="utr_number"
              value={form.utr_number}
              onChange={handleChange}
              required={true}
            />

            {/* FILE UPLOAD */}
            <div className="md:col-span-2">
              <label className="block text-sm mb-1 font-medium">
                पेमेंट पावती / स्क्रीनशॉट *
              </label>
              <input
                type="file"
                name="payment_file"
                accept="image/*,application/pdf"
                onChange={handleChange}
                required
                ref={fileRef} 
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
            <Button variant="outline" onClick={handleCloseModal}>
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