import Application from "../forms/applicant_form/Application";

export default function BirthCertificateForm() {
  return (
    <Application
      serviceKey="birth_certificate"
      serviceName="Birth Certificate"
      qrServiceKey="birth_certificate"
      bucket="birth_certificate_uploads"
      extraFields={[
        { label: "बालकाचे नाव *", name: "child_name", required: true },
        {
          label: "जन्म दिनांक *",
          name: "birth_date",
          required: true,
          type: "date",
        },
        {
          label: "जन्म वेळ",
          name: "birth_time",
          required: false, // Not required in your original code
          type: "time", // This will use the browser's time picker
        },
        {
          label: "जन्म स्थान",
          name: "birth_location",
          required: false,
        },
        {
          label: "वडिलांचे नाव",
          name: "father_name",
          required: false,
        },
        {
          label: "आईचे नाव *",
          name: "mother_name",
          required: true,
        },
      ]}
    />
  );
}
