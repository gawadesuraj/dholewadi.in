import Application from "../forms/applicant_form/Application";

export default function NoPendingGramPanchayat() {
  return (
    <Application
      serviceKey="no_pending_certificate"
      serviceName="No Pending Certificate"
      qrServiceKey="no_pending_certificate"
      bucket="no_pending_uploads"
      extraFields={[
        { label: "House Number", name: "house_no", required: true },
      ]}
    />
  );
}
