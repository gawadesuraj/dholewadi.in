import React from "react";
import {
  Droplets,
  FileText,
  CheckCircle2,
  Building2,
  Users,
  Link2,
  Info,
  Leaf,
} from "lucide-react";

function SwachhBharatMission() {
  return (
    <div
      className="min-h-screen relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Page Container - uniform across all scheme pages */}
      <div className="max-w-5xl mx-auto bg-white/95 shadow-xl backdrop-blur-sm rounded-3xl border border-gray-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-sky-700 to-cyan-600 p-8 sm:p-12 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Droplets className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              स्वच्छ भारत अभियान
            </h1>
            <p className="max-w-3xl mx-auto text-cyan-100 text-lg">
              स्वच्छ, निरोगी आणि हागणदारीमुक्त भारत घडवण्यासाठी राबवली जाणारी देशव्यापी स्वच्छता मोहीम.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 sm:p-12 space-y-10 text-gray-700">

          {/* Objective */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-sky-700 mb-3">
              <FileText className="w-6 h-6 text-cyan-500" />
              योजनेचा उद्देश
            </h2>
            <p className="leading-relaxed text-gray-700">
              भारत सरकारने <strong>हागणदारीमुक्त</strong> आणि <strong>स्वच्छ भारत</strong> साध्य करण्याच्या उद्देशाने 
              <strong> स्वच्छ भारत अभियान </strong> सुरू केले. या अभियानाचे उद्दिष्ट स्वच्छतेविषयी 
              जागरूकता निर्माण करणे, प्रत्येक घरात शौचालय बांधणे आणि नागरिकांना शाश्वत स्वच्छतेच्या सवयी 
              अंगीकारण्यास प्रोत्साहित करणे हे आहे.
            </p>
          </section>

          {/* Important Features */}
          <section className="bg-cyan-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-sky-700 mb-3">
              प्रमुख वैशिष्ट्ये
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>शौचालय बांधणे आणि त्याचा वापर करण्यास प्रोत्साहन.</li>
              <li>ग्रामीण आणि शहरी दोन्ही भागात स्वच्छता आणि आरोग्याविषयी जागरूकता.</li>
              <li>कचरा वर्गीकरण, पुनर्वापर आणि प्लास्टिकमुक्त पर्यावरणावर भर.</li>
              <li>सक्रिय लोकसहभागातून अंमलबजावणी.</li>
            </ul>
          </section>

          {/* Two Phases */}
          <section>
            <h2 className="text-xl font-semibold text-sky-700 mb-3">
              स्वच्छ भारत अभियानाचे दोन टप्पे
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-cyan-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-sky-700 mb-2">
                  स्वच्छ भारत अभियान – ग्रामीण (SBM-G)
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>ग्रामीण भागात घरगुती शौचालयांचे बांधकाम.</li>
                  <li>गाव पातळीवर हागणदारीमुक्त (ODF) प्रमाणपत्र.</li>
                  <li>स्वच्छता मोहिमेसाठी ग्रामपंचायतीमार्फत निधी व्यवस्थापन.</li>
                </ul>
              </div>
              <div className="bg-white border border-cyan-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-sky-700 mb-2">
                  स्वच्छ भारत अभियान – शहरी (SBM-U)
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>शहरांमधील स्वच्छता सुधारण्यावर भर.</li>
                  <li>घनकचरा व्यवस्थापन प्रणालीचा विकास.</li>
                  <li>कचरा संकलनासाठी आधुनिक स्मार्ट तंत्रज्ञानाचा वापर.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Beneficiaries */}
          <section className="bg-gradient-to-r from-sky-50 to-cyan-50 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-sky-700 mb-3">लाभार्थी</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>नागरिक, ग्रामपंचायती, नगरपालिका आणि शाळा.</li>
              <li>शौचालय बांधण्यासाठी गरीब आणि वंचित कुटुंबांना आर्थिक मदत.</li>
              <li>शहरी भागातील रहिवाशांसाठी सार्वजनिक स्वच्छता सुविधा.</li>
            </ul>
          </section>

          {/* Subsidy */}
          <section>
            <h2 className="text-xl font-semibold text-sky-700 mb-3">शौचालय अनुदान तपशील</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>पात्र कुटुंबांना शौचालय बांधण्यासाठी <strong>₹१२,०००</strong> पर्यंत अनुदान मिळते.</li>
              <li>पडताळणीनंतर निधी थेट लाभार्थ्यांच्या बँक खात्यात जमा केला जातो.</li>
              <li>नगरपालिका आणि ग्रामपंचायती निधी वितरण आणि अंमलबजावणीवर देखरेख करतात.</li>
            </ul>
          </section>

          {/* Public Participation */}
          <section className="bg-cyan-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-sky-700 mb-3">
              जनजागृती आणि लोकसहभाग
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>स्वच्छता ही सेवा</strong> आणि <strong>प्लास्टिकमुक्त भारत</strong> यांसारख्या देशव्यापी मोहिमा.</li>
              <li>शाळा आणि समाजामध्ये स्वच्छता मोहीम, प्रतिज्ञा आणि रॅलींचे आयोजन.</li>
              <li>स्वयंसेवी संस्था, नागरिक स्वयंसेवक आणि स्थानिक स्वराज्य संस्थांचा सहभाग.</li>
            </ul>
          </section>

          {/* Contact Info */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-sky-700 mb-3">
              <Link2 className="w-5 h-5 text-sky-500" />
              संपर्क आणि माहिती
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                अधिकृत वेबसाइट:{" "}
                <a
                  href="https://swachhbharatmission.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 underline hover:text-sky-800"
                >
                  https://swachhbharatmission.gov.in
                </a>
              </li>
              <li>राज्य स्वच्छता कक्ष, महाराष्ट्र शासन</li>
              <li>जवळची ग्रामपंचायत किंवा नगरपालिका कार्यालय</li>
            </ul>
          </section>

          {/* Note */}
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">महत्वाची सूचना</h2>
            <p className="text-gray-700 leading-relaxed">
              अर्जदारांनी आधार कार्ड, घराचा फोटो, बँक तपशील आणि बीपीएल प्रमाणपत्र (लागू असल्यास) 
              यासारखी आवश्यक कागदपत्रे सादर करणे आवश्यक आहे. 
              जास्तीत जास्त प्रभाव पाडण्यासाठी स्वच्छ भारत अभियान शहरी आणि ग्रामीण भागासाठी 
              स्वतंत्र धोरणांसह देशभर राबवले जाते.
            </p>
          </section>

          {/* Footer */}
          <div className="pt-6 text-center text-sm text-gray-500 border-t border-gray-200">
            © भारत सरकार | गृहनिर्माण आणि शहरी व्यवहार मंत्रालय | स्वच्छ भारत अभियान
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwachhBharatMission;