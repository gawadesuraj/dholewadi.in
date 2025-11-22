import React from "react";
import { Users } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";

function ImportantLinks() {
  const links = [
    {
      no: 1,
      desc: "ट्रेन बुकिंग",
      url: "https://www.irctc.co.in/nget/train-search",
    },
    { no: 2, desc: "पासपोर्ट अर्ज", url: "https://passportindia.gov.in" },
    {
      no: 3,
      desc: "ड्रायव्हिंग लायसन्स, वाहन आरसी (RC), इत्यादी",
      url: "https://parivahan.gov.in",
    },
    {
      no: 4,
      desc: "मतदार ओळखपत्र (Voter ID) नोंदणी/दुरुस्ती",
      url: "https://voterportal.eci.gov.in",
    },
    {
      no: 5,
      desc: "सरकारी कागदपत्रांचे डिजिटल साठवण",
      url: "https://digilocker.gov.in",
    },
    {
      no: 6,
      desc: "कॉमन सर्व्हिस सेंटर (CSC) पोर्टल",
      url: "https://sewa.csc.gov.in",
    },
    {
      no: 7,
      desc: "पीएम-किसान (PM-KISAN) लाभार्थी यादी आणि स्थिती",
      url: "https://pmkisan.gov.in",
    },
    {
      no: 8,
      desc: "डीबीटी (DBT) पेमेंट ट्रॅक करा",
      url: "https://pfms.nic.in",
    },
    {
      no: 9,
      desc: "युपीआय (UPI), एईपीएस (AePS), आणि आर्थिक पायाभूत सुविधा",
      url: "https://npci.org.in",
    },
    {
      no: 10,
      desc: "विमा योजना: पीएमजेजेबीवाय (PMJJBY), पीएमएसबीवाय (PMSBY), एपीवाय (APY)",
      url: "https://jansuraksha.gov.in",
    },
    {
      no: 11,
      desc: "राष्ट्रीय शिष्यवृत्ती पोर्टल (NSP)",
      url: "https://scholarships.gov.in",
    },
    {
      no: 12,
      desc: "राष्ट्रीय चाचणी संस्था (NTA) परीक्षा (NEET, JEE, इत्यादी)",
      url: "https://nta.ac.in",
    },
    {
      no: 13,
      desc: "एनसीईआरटी (NCERT) पाठ्यपुस्तके आणि अभ्यासक्रम",
      url: "https://ncert.nic.in",
    },
    {
      no: 14,
      desc: "विद्यापीठ अनुदान आयोग (UGC) अद्यतने",
      url: "https://ugc.ac.in",
    },
    {
      no: 15,
      desc: "सीबीएसई (CBSE) बोर्ड परीक्षा माहिती आणि निकाल",
      url: "https://cbse.gov.in",
    },
    {
      no: 16,
      desc: "आयुष्मान भारत (PM-JAY) हेल्थ कार्ड",
      url: "https://ayushmanbharat.gov.in",
    },
    {
      no: 17,
      desc: "आरोग्य मंत्रालय (Ministry of Health) अद्यतने",
      url: "https://mohfw.gov.in",
    },
    {
      no: 18,
      desc: "सामाजिक कल्याण योजना आणि तपशील",
      url: "https://socialjustice.gov.in",
    },
    {
      no: 19,
      desc: "कोणत्याही सरकारी विभागाकडे तक्रारी दाखल करा",
      url: "https://pgportal.gov.in",
    },
    {
      no: 20,
      desc: "ऑनलाइन आरटीआय (RTI) अर्ज दाखल करा",
      url: "https://rtionline.gov.in",
    },
    {
      no: 21,
      desc: "भारतीय न्यायालयांमधील खटल्यांची स्थिती",
      url: "https://ecourts.gov.in",
    },
    { no: 22, desc: "ग्राहक तक्रारी", url: "https://consumerhelpline.gov.in" },
    {
      no: 23,
      desc: "भारताचे राष्ट्रीय पोर्टल – सर्व सरकारी सेवांमध्ये प्रवेश",
      url: "https://india.gov.in",
    },
    {
      no: 24,
      desc: "शासनाच्या कामासाठी नागरिक सहभाग प्लॅटफॉर्म",
      url: "https://mygov.in",
    },
    { no: 25, desc: "आधार कार्ड सेवा", url: "https://uidai.gov.in" },
    {
      no: 26,
      desc: "पंतप्रधान यांचे अधिकृत संकेतस्थळ आणि अद्यतने",
      url: "https://pmindia.gov.in",
    },
    {
      no: 27,
      desc: "मनरेगा (MGNREGA) जॉब कार्ड आणि योजना माहिती",
      url: "https://nrega.nic.in",
    },
    {
      no: 28,
      desc: "आयकर भरणे आणि पॅन (PAN) सेवा",
      url: "https://incometax.gov.in",
    },
    {
      no: 29,
      desc: "भविष्य निर्वाह निधी (Provident Fund) आणि यूएएन (UAN) माहिती",
      url: "https://epfindia.gov.in",
    },
    {
      no: 30,
      desc: "असंघटित कामगारांसाठी ई-श्रम कार्ड",
      url: "https://eshram.gov.in",
    },
    {
      no: 31,
      desc: "पॅन (PAN) आणि टीडीएस (TDS) संबंधित माहिती",
      url: "https://nsdl.co.in",
    },
  ];
  const breadcrumbs = [{ label: "लिंक्स", href: null }];

  return (
    <div className="min-h-screen bg-gray-50 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-b-3xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 flex justify-between items-center bg-white">
          {breadcrumbs && <Breadcrumb  items={breadcrumbs} />}
        </div>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-700 to-blue-700 p-8 sm:p-12 text-center text-white rounded-3xl">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              महत्त्वाच्या सरकारी आणि नागरिक सेवा लिंक्स
            </h1>
            <p className="text-blue-100 text-lg">
              नागरिकांसाठी आवश्यक ऑनलाइन पोर्टल आणि सरकारी सेवांचा त्वरित
              प्रवेश.
            </p>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-8 sm:p-12 overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b border-gray-200">
                  अ.क्र. (S.No.)
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b border-gray-200">
                  माहिती
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold border-b border-gray-200">
                  लिंक
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="py-3 px-4 text-gray-700 text-sm border-b border-gray-200">
                    {link.no}
                  </td>
                  <td className="py-3 px-4 text-gray-800 text-sm border-b border-gray-200 font-medium">
                    {link.desc}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-indigo-700 font-medium text-sm underline underline-offset-2"
                    >
                      {link.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 py-4">
          © महाराष्ट्र शासन | ग्रामपंचायत ढोलेवाडी
        </div>
      </div>
    </div>
  );
}

export default ImportantLinks;
