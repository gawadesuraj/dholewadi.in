import React from "react";
import { Link } from "react-router-dom";

// Lucide icons
import { FileText, Download, ChevronRight, Home } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";




// --- Document Configuration ---
const charterDocuments = [
  {
    id: 1,
    name: "परिशिष्ट-०१: ग्राम विकास विभागाची (मंत्रालय स्तर) संरचना व उद्दिष्टे",
    docPdf: "/dholewadi/1.pdf",
  },
  {
    id: 2,
    name: "परिशिष्ट-०२: पंचायत राज संस्थांची योजनाविषयक जबाबदारी",
    docPdf: "/dholewadi/2.pdf",
  },
  {
    id: 3,
    name: "परिशिष्ठ-०३: पंचायत राज संस्थांची संविधानिक जबाबदारी",
    docPdf: "/dholewadi/2 (1).pdf",
  },
  {
    id: 4,
    name: "ग्राम विकास विभाग सनद",
    docPdf: "/dholewadi/4.pdf",
  },
];
// --- End of Configuration ---

const CitizensCharter = () => {
  // 🎯 Breadcrumb structure aligns with the updated PageHeader logic
  const breadcrumbs = [{ label: "नागरिकांची सनद", href: null }];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="नागरिकांची सनद"
        subtitle="ग्रामपंचायत ढोलेवाडीच्या सेवा वेळेत आणि पारदर्शकपणे प्रदान करण्याची बांधिलकी."
        breadcrumbs={breadcrumbs}
        // icon={Users} // Use an appropriate icon
      />

      <section className="bg-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Charter Documents Section (Enhanced Card Style) */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 pb-4 border-b-2 border-teal-500/50 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-teal-600" />
              ग्राम विकास विभाग सनद दस्तऐवज
            </h3>

            {/* Responsive Table Wrapper (Enhanced Table Look) */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
              <table className="min-w-full bg-white text-sm sm:text-base">
                <thead className="bg-teal-100/70 border-b border-teal-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left font-bold text-teal-700 uppercase tracking-wide w-3/5">
                      दस्तऐवज (Document)
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left font-bold text-teal-700 uppercase tracking-wide w-2/5">
                      डाउनलोड (Download)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {charterDocuments.map((doc) => (
                    <tr
                      key={doc.id}
                      className="hover:bg-teal-50/50 transition-colors duration-150"
                    >
                      <td className="px-4 sm:px-6 py-4 text-gray-800 font-medium">
                        {doc.name}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <a
                          href={doc.docPdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-teal-600 text-white font-semibold text-sm rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-colors duration-200"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          View / डाउनलोड करा
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note on Downloads */}
            <p className="mt-8 text-sm text-gray-600">
              **टीप:** दस्तऐवज पाहण्यासाठी PDF व्ह्यूअरची आवश्यकता आहे.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CitizensCharter;
