import Application from "../forms/applicant_form/Application";

export default function PovertyRationCertificate() {
  return (
    <Application
      serviceKey="poverty_ration_certificate" // unique key for service_settings
      serviceName="Poverty / Ration Certificate" // name displayed in UI
      qrServiceKey="poverty_ration_certificate" // for QR + amount
      dbTable="certificate_requests" // universal table
      bucket="poverty_ration_uploads" // separate uploads bucket
      extraFields={[
        { label: "House Number", name: "house_no", required: true },
      ]}
    />
  );
}
