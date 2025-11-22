/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FileText, Download, Hand, X, ExternalLink } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";

function SelfDeclarations() {
  // उदाहरण यादी (Example List) – फाइल लिंक्स जशास तशा ठेवल्या आहेत.
  const forms = [
    {
      // कोणत्याही योजनेचा लाभ न घेतल्याचे स्व-घोषणापत्र
      title: <strong>कोणत्याही योजनेचा लाभ न घेतल्याचे स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/%E0%A4%95%E0%A5%8B%E0%A4%A3%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B9%E0%A5%80-%E0%A4%AF%E0%A5%8B%E0%A4%9C%E0%A4%A8%E0%A5%87%E0%A4%9A%E0%A4%BE-%E0%A4%B2%E0%A4%BE%E0%A4%AD-%E0%A4%A8-%E0%A4%98%E0%A5%87%E0%A4%A4%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%9A%E0%A5%87-%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-compressed_oe70ae.pdf",
    },
    {
      // त्याच बाबत स्व-घोषणापत्र
      title: <strong>त्याच बाबत स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/v1762580351/%E0%A4%AA%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE-%E0%A4%85%E0%A4%B8%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%AC%E0%A4%A4-%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-compressed_htivsf.pdf",
    },
    {
      // रहिवासी दाखला स्व-घोषणापत्र
      title: <strong>रहिवासी दाखला स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/v1762580351/%E0%A4%B0%E0%A4%B9%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B6%E0%A5%80_%E0%A4%A6%E0%A4%BE%E0%A4%96%E0%A4%B2%E0%A4%BE_%E0%A4%B8%E0%A5%8D%E0%A4%B5_%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-compressed_hv70da.pdf",
    },
    {
      // विधवा असल्याबद्दल स्व-घोषणापत्र
      title: <strong>विधवा असल्याबद्दल स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/v1762580351/%E0%A4%B5%E0%A4%BF%E0%A4%A7%E0%A4%B5%E0%A4%BE-%E0%A4%85%E0%A4%B8%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%AC%E0%A4%A4-%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-1-compressed_znsag0.pdf",
    },
    {
      // विभक्त कुटुंब असल्याबद्दल स्व-घोषणापत्र
      title: <strong>विभक्त कुटुंब असल्याबद्दल स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/v1762580352/%E0%A4%B5%E0%A4%BF%E0%A4%AD%E0%A4%95%E0%A5%8D%E0%A4%A4-%E0%A4%95%E0%A5%81%E0%A4%9F%E0%A5%81%E0%A4%82%E0%A4%AC-%E0%A4%85%E0%A4%B8%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B8-%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-compressed_rsxsiu.pdf",
    },
    {
      // वीज जोडणी स्व-घोषणापत्र
      title: <strong>वीज जोडणी स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/v1762580352/%E0%A4%B5%E0%A5%80%E0%A4%9C-%E0%A4%9C%E0%A5%8B%E0%A4%A1%E0%A4%A3%E0%A5%80-%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-compressed_ll2ikf.pdf",
    },
    {
      // शौचालय उपलब्धतेबद्दल स्व-घोषणापत्र
      title: <strong>शौचालय उपलब्धतेबद्दल स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/v1762580351/%E0%A4%B6%E0%A5%8C%E0%A4%9A%E0%A4%BE%E0%A4%B2%E0%A4%AF-%E0%A4%85%E0%A4%B8%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%AC%E0%A4%A4-%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-compressed_lhiuis.pdf",
    },
    {
      // हयात (जिवंत) असल्याबद्दल स्व-घोषणापत्र
      title: <strong>हयात (जिवंत) असल्याबद्दल स्व-घोषणापत्र</strong>,
      file: "https://res.cloudinary.com/dhgwquxar/image/upload/v1762580351/%E0%A4%B9%E0%A4%AF%E0%A4%BE%E0%A4%A4-%E0%A4%85%E0%A4%B8%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%AC%E0%A4%A4-%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%AF%E0%A4%82%E0%A4%98%E0%A5%8B%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0-compressed_ygm5yw.pdf",
    },
  ];

  const [openPdf, setOpenPdf] = useState(null);

  // PDF डाउनलोड हाताळणी
  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name || "document.pdf";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      alert("डाउनलोड अयशस्वी झाले. कृपया नंतर पुन्हा प्रयत्न करा.");
    }
  };
  const breadcrumbs = [{ label: "स्व-घोषणापत्र", href: null } ];
  return (
    <div className="min-h-screen bg-gray-50 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-b-3xl border border-gray-200 overflow-hidden ">
      
        <div className="p-4 sm:p-6 flex justify-between items-center bg-white">
          {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        </div>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-sky-700 to-indigo-800 p-8 sm:p-12 text-center text-white rounded-3xl">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Hand className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              स्व-घोषणापत्र फॉर्म
            </h1>
            <p className="text-indigo-100 text-lg">
              पंचायत समिती शिराळा यांच्या आवश्यकतेनुसार आवश्यक स्व-घोषणापत्र
              फॉर्म डाउनलोड करा आणि सादर करा.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-8">
          {forms.map((form, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-slate-50 to-slate-100 hover:from-white hover:to-gray-50 transition-all duration-200 rounded-xl border border-gray-200 shadow-sm hover:shadow-md px-6 py-4"
            >
              <div className="flex items-center gap-3 text-slate-700 w-full sm:w-auto">
                <FileText className="w-6 h-6 text-sky-600 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">
                  {form.title}
                </span>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                {/* View PDF (opens modal) */}
                <button
                  onClick={() => setOpenPdf(form)}
                  className="inline-flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  पहा
                </button>

                {/* Download PDF (direct) */}
                <button
                  onClick={() =>
                    handleDownload(
                      form.file,
                      form.title.props.children + ".pdf"
                    )
                  }
                  className="inline-flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                  डाउनलोड
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 py-4">
          © महाराष्ट्र शासन | ग्रामपंचायत ढोलेवाडी
        </div>
      </div>

      {/* PDF Modal Viewer */}
      {openPdf && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-sky-700 to-indigo-800 text-white px-5 py-3">
              <h2 className="text-lg font-semibold truncate pr-4">
                {openPdf.title}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleDownload(
                      openPdf.file,
                      openPdf.title.props.children + ".pdf"
                    )
                  }
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md text-sm font-medium transition"
                >
                  <Download className="w-4 h-4" />
                  डाउनलोड
                </button>
                <button
                  onClick={() => setOpenPdf(null)}
                  className="p-2 rounded-md hover:bg-white/20 transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* PDF Frame */}
            <div className="h-[80vh] bg-gray-100">
              <iframe
                src={`${openPdf.file}#toolbar=0`}
                title={openPdf.title.props.children}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelfDeclarations;
