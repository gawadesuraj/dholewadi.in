import Application from "./applicant_form/common_application_form";

export default function Extract8AForm() {
  return (
    <Application
      serviceKey="extract_8a_certificate"
      serviceName="Extract 8A Certificate"
      qrServiceKey="extract_8a_certificate"
      bucket="extract_8a_uploads"
      extraFields={[
        { label: "Property Number", name: "property_no", required: true },
        { label: "Survey Number", name: "survey_no", required: true },
      ]}
    />
  );
}
