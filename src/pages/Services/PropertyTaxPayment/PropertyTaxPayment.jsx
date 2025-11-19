// src/pages/Services/forms/PropertyTaxPayment.jsx (The minimal wrapper)

import React from "react";
// 🚨 Adjust this import path to where the reusable template is stored
import TaxPaymentTemplate from "../forms/applicant_form/TaxPaymentTemplate";

// --- Configuration Data ---
const TAX_PAYMENT_CONFIG = {
  // Service configuration keys
  serviceKey: "property_tax",
  bucket: "property_tax_uploads",

  // Display information
  title: "Property Tax Payment",
  subtitle: "Pay your property tax online for Grampanchayat Dholewadi",

  // Custom form field configurations
  fields: [
    { label: "मालकाचे नाव", name: "owner_name", required: true }, // Compulsory
    {
      label: "मालमत्ता आयडी / मूल्यांकन क्र.",
      name: "property_id",
      required: false,
    }, // Not compulsory
    {
      label: "मालमत्तेचा पत्ता",
      name: "property_address",
      type: "textarea",
      rows: 2,
      required: false,
      colSpan: 2,
    },
    { label: "कर वर्ष", name: "tax_year", required: false },
    // amount, mobile, utr_number, and payment_file are handled as core fields
  ],

  // Configuration for the unique 9-month history check logic
  historyCheckConfig: {
    checkTable: "property_tax_payments",
    checkIdentifierFields: ["property_id", "owner_name"], // Use property_id OR owner_name
  },
};

export default function PropertyTaxPayment() {
  return <TaxPaymentTemplate config={TAX_PAYMENT_CONFIG} />;
}
