// src/pages/Services/forms/WaterTaxPayment.jsx

import React from "react";
// 🚨 NOTE: Assuming the reusable template is located and named appropriately
import TaxPaymentTemplate from "../forms/applicant_form/TaxPaymentTemplate";

// --- Configuration Data for Water Tax ---
const WATER_TAX_CONFIG = {
  // Service configuration keys
  serviceKey: "water_tax",
  qrServiceKey: "water_tax", // Key to fetch amount and QR code
  bucket: "water_tax_uploads",

  // Display information
  title: "Water Tax Payment",
  subtitle: "Pay your water tax online",

  // Custom form field configurations
  fields: [
    // Note: Connection Number is required, mirroring original validation
    {
      label: "Connection Number",
      name: "connection_number",
      required: true,
      colSpan: 1,
    },
    {
      label: "Consumer Name",
      name: "consumer_name",
      required: false,
      colSpan: 1,
    },
    {
      label: "Address",
      name: "address",
      type: "textarea",
      rows: 2,
      required: false,
      colSpan: 2,
    },
    {
      label: "Billing Year",
      name: "billing_year",
      required: false,
      colSpan: 1,
    },
  ],

  // Configuration for the unique 9-month history check logic
  // Logic: Check if connection_number OR consumer_name has paid in the last 9 months.
  historyCheckConfig: {
    checkTable: "water_tax_payments", // Target table for history check and insertion
    checkIdentifierFields: ["connection_number", "consumer_name"],
  },
};

export default function WaterTaxPayment() {
  return <TaxPaymentTemplate config={WATER_TAX_CONFIG} />;
}
