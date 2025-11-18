import Application from "../forms/applicant_form/Application";

export default function DeathCertificateForm() {
  return (
    <Application
      serviceKey="death_certificate"
      serviceName="Death Certificate"
      qrServiceKey="death_certificate"
      bucket="death_certificate_uploads"
      extraFields={[
        { label: "मृत व्यक्तीचे नाव *", name: "deceased_name", required: true },
        {
          label: "मृत्यूची तारीख *",
          name: "death_date",
          required: true,
          type: "date",
        },
        {
          label: "मृत्यूची वेळ",
          name: "death_time",
          required: false, // Not required in your original code
          type: "time",
        },
        { label: "मृत्यूचे ठिकाण *", name: "death_place", required: true },
        {
          label: "वडील / पतीचे नाव",
          name: "father_husband_name",
          required: false,
        },
      ]}
    />
  );
}
