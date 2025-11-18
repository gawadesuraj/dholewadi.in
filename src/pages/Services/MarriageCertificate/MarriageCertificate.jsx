import Application from "../forms/applicant_form/Application";

export default function MarriageCertificateForm() {
  return (
    <Application
      serviceKey="marriage_certificate"
      serviceName="Marriage Certificate"
      qrServiceKey="marriage_certificate"
      bucket="marriage_certificate_uploads"
      extraFields={[
        { label: "वराचे नाव *", name: "husband_name", required: true },
        { label: "वधूचे नाव *", name: "wife_name", required: true },
        {
          label: "लग्नाची तारीख *",
          name: "marriage_date",
          required: true,
          type: "date", // Pass the 'type' prop here
        },
        { label: "लग्नाचे ठिकाण *", name: "marriage_place", required: true },
      ]}
    />
  );
}
