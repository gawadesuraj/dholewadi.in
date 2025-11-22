import React from "react";
import { Home, FileCheck, Globe2, ExternalLink } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";
const breadcrumbs = [
  { label: "PMAY", href: null }, // Page title will be the final crumb
];
function PMAYBeneficiary() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl rounded-b-3xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 flex justify-between items-center bg-white">
          {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        </div>
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-emerald-700 to-teal-600 p-8 sm:p-12 text-center text-white rounded-3xl">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Home className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              प्रधानमंत्री आवास योजना (PMAY) – लाभार्थी माहिती
            </h1>
            <p className="max-w-3xl mx-auto text-teal-100 text-lg">
              "सर्वांसाठी घरे" अभियानांतर्गत प्रत्येक भारतीय कुटुंबाला परवडणारी
              घरे देऊन सक्षम करणे.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 space-y-10 text-gray-700">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-teal-700 mb-3">
              योजनेचा आढावा (Overview)
            </h2>
            <p className="leading-relaxed">
              <strong>प्रधानमंत्री आवास योजना (PMAY)</strong> हा भारत सरकारचा एक
              प्रमुख उपक्रम आहे, जो <strong>जून २०१५</strong> मध्ये सुरू करण्यात
              आला. याचे मुख्य उद्दिष्ट म्हणजे प्रत्येक भारतीय कुटुंबाला पाणी,
              स्वच्छता आणि वीज यांसारख्या मूलभूत सुविधांसह{" "}
              <strong>पक्के घर</strong> मिळावे. हे अभियान "सर्वांसाठी घरे" या
              संकल्पनेअंतर्गत देशभरातील <strong>शहरी (PMAY-U)</strong> आणि{" "}
              <strong>ग्रामीण (PMAY-G)</strong> कुटुंबांना कव्हर करते.
            </p>
          </section>

          {/* Objectives */}
          <section className="bg-teal-50 rounded-2xl p-6 shadow-sm border-l-4 border-teal-400">
            <h2 className="text-xl font-semibold text-teal-700 mb-3">
              उद्दिष्टे
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                ग्रामीण आणि शहरी भागातील पात्र कुटुंबांना परवडणारी कायमस्वरूपी
                घरे उपलब्ध करून देणे.
              </li>
              <li>
                अत्यावश्यक सेवांची उपलब्धता सुनिश्चित करणे – पाणी, वीज,
                स्वच्छतागृह आणि स्वयंपाकाचा गॅस.
              </li>
              <li>
                आर्थिक सुरक्षा आणि समानतेसाठी घरांची मालकी महिलांच्या नावे
                असण्यास प्रोत्साहन देणे.
              </li>
              <li>
                झोपडपट्टी पुनर्वसन आणि अल्प-उत्पन्न गटांसाठी क्रेडिट-लिंक्ड
                सबसिडी (Credit-linked Subsidy) ला आधार देणे.
              </li>
            </ul>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-teal-700 mb-3">
              पात्रता निकष
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>लाभार्थी कुटुंबाचे भारतात कोठेही पक्के घर नसावे.</li>
              <li>कुटुंबाचे वार्षिक उत्पन्न खालील श्रेणींमध्ये असावे:</li>
              <ul className="list-decimal list-inside ml-5">
                <li>
                  <strong>EWS (आर्थिकदृष्ट्या दुर्बल घटक):</strong> वार्षिक
                  उत्पन्न ₹३ लाखांपर्यंत.
                </li>
                <li>
                  <strong>LIG (अल्प उत्पन्न गट):</strong> वार्षिक उत्पन्न ₹६
                  लाखांपर्यंत.
                </li>
                <li>
                  <strong>MIG I:</strong> वार्षिक उत्पन्न ₹६–१२ लाख (कर्जावर ४%
                  सबसिडी ₹९ लाखांपर्यंत).
                </li>
                <li>
                  <strong>MIG II:</strong> वार्षिक उत्पन्न ₹१२–१८ लाख (कर्जावर
                  ३% सबसिडी ₹१२ लाखांपर्यंत).
                </li>
              </ul>
              <li>
                लाभार्थ्याने यापूर्वी केंद्र सरकारच्या कोणत्याही गृहनिर्माण
                योजनेचा लाभ घेतलेला नसावा.
              </li>
              <li>अर्जदाराकडे वैध आधार क्रमांक असणे आवश्यक आहे.</li>
            </ul>
          </section>

          {/* Benefits */}
          <section className="bg-emerald-50 rounded-2xl p-6 shadow-sm border-l-4 border-emerald-400">
            <h2 className="text-xl font-semibold text-emerald-700 mb-3">
              प्रमुख फायदे
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                गृहकर्जावर <strong>₹२.६७ लाखांपर्यंत</strong> व्याज सवलत
                (सबसिडी).
              </li>
              <li>
                PMAY-G अंतर्गत ग्रामीण कुटुंबांसाठी{" "}
                <strong>₹१.२ लाख – ₹२.५ लाख</strong> पर्यंत आर्थिक मदत.
              </li>
              <li>महिला, SC/ST आणि दिव्यांग लाभार्थ्यांना प्राधान्य.</li>
              <li>बांधलेली सर्व घरे हवामान-अनुकूल आणि पर्यावरणपूरक असतात.</li>
            </ul>
          </section>

          {/* Application Process */}
          <section>
            <h2 className="text-xl font-semibold text-teal-700 mb-3">
              अर्ज कसा करावा / लाभार्थी स्थिती
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                अधिकृत PMAY पोर्टलला भेट द्या:{" "}
                <a
                  href="https://pmaymis.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline hover:text-teal-800"
                >
                  pmaymis.gov.in
                </a>{" "}
                (PMAY-शहरी साठी).
              </li>
              <li>
                ग्रामीण लाभार्थ्यांसाठी, येथे भेट द्या{" "}
                <a
                  href="https://pmayg.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 underline hover:text-teal-800"
                >
                  pmayg.nic.in
                </a>{" "}
                (PMAY-ग्रामीण पोर्टल).
              </li>
              <li>
                "Search Beneficiary" निवडा आणि तुमची स्थिती तपासण्यासाठी आधार
                क्रमांक टाका.
              </li>
              <li>
                ऑनलाइन अर्ज करा किंवा तुमच्या जवळच्या CSC (कॉमन सर्व्हिस सेंटर)
                किंवा ग्रामपंचायतीशी संपर्क साधा.
              </li>
              <li>
                कागदपत्रे तयार ठेवा – आधार कार्ड, उत्पन्नाचा दाखला आणि रहिवासी
                प्रमाणपत्र.
              </li>
            </ol>
          </section>

          {/* Useful Links */}
          <section className="bg-teal-50 rounded-2xl p-6 shadow-sm border-l-4 border-teal-400">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-teal-700 mb-3">
              <Globe2 className="w-5 h-5 text-teal-600" /> महत्त्वाच्या लिंक्स
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <a
                  href="https://pmaymis.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-800 transition-colors duration-200"
                >
                  PMAY – शहरी पोर्टल
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmayg.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-800 transition-colors duration-200"
                >
                  PMAY – ग्रामीण पोर्टल
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmay-urban.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-800 transition-colors duration-200"
                >
                  गृहनिर्माण आणि शहरी व्यवहार मंत्रालय – अधिकृत वेबसाइट
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmayg.nic.in/netiay/Home.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-800 transition-colors duration-200"
                >
                  PMAY-G लाभार्थी यादी २०२५ तपासा
                  <ExternalLink className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </section>

          {/* Note */}
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">
              महत्त्वाची सूचना
            </h2>
            <p>
              लाभार्थ्यांना सल्ला दिला जातो की त्यांनी फक्त अधिकृत सरकारी पोर्टल
              किंवा अधिकृत CSC द्वारेच अर्ज करावा. त्रयस्थ एजंट्स (Agents) पासून
              सावध राहा. सर्व अर्जांची पडताळणी आधार आणि उत्पन्नाच्या तपशीलांवर
              आधारित केली जाते आणि अंतिम यादी अधिकृत PMAY पोर्टलवर प्रकाशित केली
              जाते.
            </p>
          </section>

          {/* Contact Info */}
          <section>
            <h2 className="text-xl font-semibold text-teal-700 mb-3">
              मदत आणि संपर्क
            </h2>
            <ul className="space-y-1">
              <li>
                📞 PMAY-U हेल्पलाइन:{" "}
                <strong>1800-11-3377 / 1800-11-3388</strong>
              </li>
              <li>
                📧 ईमेल:{" "}
                <a
                  href="mailto:pmaymis-mhupa@gov.in"
                  className="text-teal-600 underline"
                >
                  pmaymis-mhupa@gov.in
                </a>
              </li>
              <li>
                🏢 मंत्रालय: गृहनिर्माण आणि शहरी व्यवहार मंत्रालय, निर्माण भवन,
                नवी दिल्ली – ११०१०८
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 py-4">
          © भारत सरकार | गृहनिर्माण आणि शहरी व्यवहार मंत्रालय – PMAY मिशन २०२५
        </div>
      </div>
    </div>
  );
}

export default PMAYBeneficiary;
