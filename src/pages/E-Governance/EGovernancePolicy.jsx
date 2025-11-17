import React from "react";
import { FileText, Globe2, ShieldCheck, Users } from "lucide-react";

function EGovernancePolicy() {
  return (
    <div className="min-h-screen w-full bg-white relative text-gray-800">

      {/* 🔹 Crosshatch Subtle Pattern Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
  repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.12) 2px, rgba(75, 85, 99, 0.12) 3px, transparent 3px, transparent 8px),
  repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.10) 2px, rgba(107, 114, 128, 0.10) 3px, transparent 3px, transparent 8px),
  repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.09) 2px, rgba(55, 65, 81, 0.09) 3px, transparent 3px, transparent 8px),
  repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.07) 2px, rgba(31, 41, 55, 0.07) 3px, transparent 3px, transparent 8px)
`,

        }}
      />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 min-h-screen bg-gray-50/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-800 to-sky-700 p-8 sm:p-12 text-center text-white">
            <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full shadow-inner">
                  <FileText className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                Dholewadi Gram Panchayat E-Governance Policy, 2024
              </h1>
              <p className="max-w-3xl mx-auto text-sky-100 text-lg">
                A roadmap for transparent, participatory, and digitally empowered village administration.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 sm:p-12 space-y-8 text-gray-700">

            {/* 1. Introduction */}
            <section>
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-sky-700 mb-3">
                <Globe2 className="w-6 h-6 text-sky-600" />
                1. Introduction
              </h2>
              <p>
                Recognizing the transformative potential of Information and Communication Technology (ICT)
                to empower rural institutions, this policy outlines a roadmap for digital governance of
                <strong> Dholewadi Gram Panchayat</strong>. Rooted in the ethos of the PES Act and aligned
                with <strong>Digital India</strong>, the policy ensures transparent, participatory, and
                efficient service delivery, especially for tribal and marginalized citizens.
              </p>
            </section>

            {/* 2. Vision */}
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-3">2. Vision</h2>
              <p>
                To establish <strong>Dholewadi Gram Panchayat</strong> as a model digital village
                administration institution by providing inclusive, integrated, real-time, and
                citizen-centric services using modern digital technology.
              </p>
            </section>

            {/* 3. Objectives */}
            <section className="bg-blue-50 rounded-2xl p-6 shadow-sm border-l-4 border-blue-400">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">3. Main Objectives</h2>
              <ul className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Ensuring universal digital access to Panchayat services.</li>
                <li>Enabling real-time governance via data analytics.</li>
                <li>Promoting paperless & cashless service delivery.</li>
                <li>Citizen participation through mobile apps and IVRS.</li>
                <li>Enhancing transparency through digital reporting.</li>
                <li>Training Panchayat staff in modern ICT tools.</li>
                <li>Integration with state & national digital platforms.</li>
                <li>Strengthening cybersecurity & data privacy.</li>
              </ul>
            </section>

            {/* 4. Scope */}
            <section>
              <h2 className="text-xl font-semibold text-sky-700 mb-3">4. Policy Scope and Coverage</h2>
              <p>
                Applicable to all Panchayat functions including Health, Sanitation, Agriculture, Water,
                Education, and Livelihood—covering ICT infrastructure, digital literacy, grievance redressal
                and data governance.
              </p>
            </section>

            {/* 5. Infrastructure */}
            <section className="bg-sky-50 rounded-2xl p-6 shadow-sm border-l-4 border-sky-400">
              <h2 className="text-xl font-semibold text-sky-700 mb-3">5. Digital Infrastructure Development</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Digital control room with biometric devices.</li>
                <li>High-speed broadband via BharatNet / 4G / 5G.</li>
                <li>Use of GIS, drones, and mobile apps.</li>
                <li>Cloud-based document storage.</li>
                <li>Solar-powered service kiosks.</li>
              </ul>
            </section>

            {/* 6. Service Delivery */}
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-3">6. E-Governance Service Delivery Mechanism</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Online certificates (Birth/Death/Marriage).</li>
                <li>Property Tax & NOC services.</li>
                <li>Pension, Employment & Scholarship services.</li>
                <li>AI-driven predictive alerts & grievance tracking.</li>
              </ul>
            </section>

            {/* 7. Participation */}
            <section className="bg-sky-50 rounded-2xl p-6 shadow-sm border-l-4 border-sky-400">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                7. Citizen Participation and Governance
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Online public meeting platform “Janmanch”.</li>
                <li>SMS, WhatsApp & IVRS notifications.</li>
                <li>Mobile-based reporting for issues.</li>
                <li>Quarterly digital audits.</li>
              </ul>
            </section>

            {/* 8. Literacy */}
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-3">8. Capacity Building</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Training programs for Panchayat staff.</li>
                <li>Digital literacy workshops for villagers.</li>
                <li>Awareness via radio & tablets.</li>
              </ul>
            </section>

            {/* 9. Security */}
            <section className="bg-blue-50 rounded-2xl p-6 shadow-sm border-l-4 border-blue-400">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-700 mb-3">
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                9. Data Governance and Cybersecurity
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Panchayat-level Data Security Policy.</li>
                <li>Encryption & secure credential storage.</li>
                <li>Monthly vulnerability checks.</li>
              </ul>
            </section>

            {/* 10. Monitoring */}
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-3">10. Monitoring and Evaluation</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Real-time performance dashboards.</li>
                <li>Integration with PFMS.</li>
                <li>Monthly automated reports.</li>
                <li>SDG-based performance metrics.</li>
              </ul>
            </section>

            {/* 11. Institutional Framework */}
            <section className="bg-blue-50 rounded-2xl p-6 shadow-sm border-l-4 border-blue-400">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-blue-700 mb-3">
                <Users className="w-5 h-5 text-blue-500" />
                11. Institutional Framework
              </h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>E-Governance Task Force formation.</li>
                <li>Village Digital Officer appointment.</li>
                <li>Collaboration with NIC & ZP IT Cell.</li>
              </ul>
            </section>

            {/* 12. Funding */}
            <section>
              <h2 className="text-xl font-semibold text-blue-700 mb-3">12. Funding and Sustainability</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Use of 15th/16th FC and RGSA funds.</li>
                <li>CSR partnerships.</li>
                <li>Solar-powered green infrastructure.</li>
              </ul>
            </section>

            {/* 14. Review */}
            <section className="bg-blue-50 rounded-2xl p-6 shadow-sm border-l-4 border-blue-400">
              <h2 className="text-xl font-semibold text-blue-700 mb-3">14. Review and Update</h2>
              <p>
                This policy will be periodically reviewed by Dholewadi Gram Panchayat in consultation with
                citizens and experts, incorporating feedback via digital platforms.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 border-t border-gray-200 py-4">
            © Dholewadi Gram Panchayat | E-Governance Cell 2024
          </div>
        </div>
      </div>
    </div>
  );
}

export default EGovernancePolicy;
