import React from "react";
import {
  HeartPulse,
  FileText,
  CheckCircle2,
  ClipboardList,
  FileCheck,
  Link2,
} from "lucide-react";

function PradhanMantriMatruVandanaYojana() {
  return (
    <div
      className="min-h-screen relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Page Container */}
      <div className="max-w-5xl mx-auto bg-white/95 shadow-xl backdrop-blur-sm rounded-3xl border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-700 to-rose-500 p-8 sm:p-12 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <HeartPulse className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              प्रधानमंत्री मातृ वंदना योजना
            </h1>
            <p className="max-w-3xl mx-auto text-rose-100 text-lg">
              गर्भवती आणि स्तनदा मातांसाठी सुरक्षित मातृत्व आणि बालकाचा सुदृढ विकास सुनिश्चित करणारी मातृत्व लाभ योजना.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-10 text-gray-700">
          
          {/* Objective */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-rose-700 mb-3">
              <FileText className="w-6 h-6 text-rose-500" />
              योजनेचा उद्देश
            </h2>
            <p className="leading-relaxed text-gray-700">
              <strong>प्रधानमंत्री मातृ वंदना योजना (PMMVY)</strong> ही भारत सरकारच्या 
              <strong> महिला आणि बाल विकास मंत्रालयाने</strong> राबवलेली मातृत्व लाभ योजना आहे. 
              ही योजना गर्भवती आणि स्तनदा मातांना त्यांच्या पोषणाच्या गरजा पूर्ण करण्यासाठी 
              आणि सुरक्षित प्रसूती व माता आरोग्याची खात्री करण्यासाठी आर्थिक मदत प्रदान करते.
            </p>
          </section>

          {/* Plan Features */}
          <section className="bg-rose-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-rose-700 mb-3">
              योजनेची वैशिष्ट्ये
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                गर्भवती महिलांना तीन हप्त्यांमध्ये <strong>₹५,०००</strong> ची आर्थिक मदत दिली जाते.
              </li>
              <li>
                हा लाभ फक्त <strong>पहिल्या जिवंत अपत्यासाठी</strong> लागू आहे.
              </li>
              <li>
                माता आणि बालकासाठी नियमित आरोग्य तपासणी, लसीकरण आणि पौष्टिक आहारास प्रोत्साहन देते.
              </li>
            </ul>
          </section>

          {/* Qualifications */}
          <section>
            <h2 className="text-xl font-semibold text-rose-700 mb-3">पात्रता निकष</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>गर्भवती महिला आणि स्तनदा माता पात्र आहेत.</li>
              <li>फक्त पहिल्या जिवंत अपत्याच्या जन्मासाठी लागू.</li>
              <li>महिलांचे वय <strong>१९ वर्षे किंवा त्यापेक्षा जास्त</strong> असावे.</li>
              <li>सरकारी कर्मचारी या योजनेसाठी <strong>पात्र नाहीत</strong>.</li>
              <li>लाभार्थी भारतीय नागरिक असावा.</li>
            </ul>
          </section>

          {/* Financial Benefits Table */}
          <section className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-rose-700 mb-3">
              आर्थिक फायदे (तीन हप्त्यांमध्ये)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-rose-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">हप्ता</th>
                    <th className="px-4 py-2 text-left">अटी</th>
                    <th className="px-4 py-2 text-left">रक्कम</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t">
                    <td className="px-4 py-2">पहिला</td>
                    <td className="px-4 py-2">गर्भधारणा नोंदणी केल्यानंतर</td>
                    <td className="px-4 py-2">₹१,०००</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">दुसरा</td>
                    <td className="px-4 py-2">किमान एक प्रसूतीपूर्व तपासणी (ANC) केल्यानंतर</td>
                    <td className="px-4 py-2">₹२,०००</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">तिसरा</td>
                    <td className="px-4 py-2">
                      बाळाचे लसीकरण (BCG, OPV, DPT, HepB) पूर्ण झाल्यानंतर
                    </td>
                    <td className="px-4 py-2">₹२,०००</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              <strong>एकूण ₹५,०००</strong> — रक्कम थेट लाभार्थ्याच्या आधार लिंक असलेल्या बँक खात्यात जमा होते.
            </p>
          </section>

          {/* Required Documents */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-rose-700 mb-3">
              <FileCheck className="w-5 h-5 text-rose-500" />
              आवश्यक कागदपत्रे
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>गर्भवती महिलेचे आधार कार्ड</li>
              <li>महिलेच्या नावावर असलेल्या बँक खात्याचा तपशील (पासबुक)</li>
              <li>गर्भधारणा नोंदणी प्रमाणपत्र (MCP कार्ड)</li>
              <li>बाळाचा जन्म दाखला (तिसऱ्या हप्त्यासाठी)</li>
              <li>लसीकरण प्रमाणपत्र</li>
            </ul>
          </section>

          {/* Application Process */}
          <section className="bg-pink-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-rose-700 mb-3">
              अर्ज प्रक्रिया
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>तुमच्या जवळच्या अंगणवाडी केंद्र किंवा सरकारी आरोग्य केंद्राला भेट द्या.</li>
              <li>PMMVY फॉर्म (1-A, 1-B, 1-C) भरा आणि आवश्यक कागदपत्रे जोडा.</li>
              <li>कागदपत्रांची पडताळणी झाल्यानंतर रक्कम थेट लाभार्थ्याच्या बँक खात्यात जमा केली जाते.</li>
            </ol>
          </section>

          {/* Contact */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-rose-700 mb-3">
              <Link2 className="w-5 h-5 text-rose-500" />
              संपर्क आणि माहिती
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>महिला आणि बाल विकास विभाग, महाराष्ट्र</li>
              <li>अंगणवाडी सेविका / आशा सेविका</li>
              <li>
                अधिकृत वेबसाइट्स:{" "}
                <a
                  href="https://wcd.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 underline hover:text-rose-800"
                >
                  https://wcd.nic.in
                </a>{" "}
                |{" "}
                <a
                  href="https://pmmvy-cas.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 underline hover:text-rose-800"
                >
                  https://pmmvy-cas.nic.in
                </a>
              </li>
            </ul>
          </section>

          {/* Usefulness */}
          <section className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-rose-700 mb-3">
              योजनेचे महत्व
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>माता आणि बाल पोषणासाठी आर्थिक आधार मिळतो.</li>
              <li>सुरक्षित मातृत्व आणि आरोग्यदायी प्रसूतीस प्रोत्साहन मिळते.</li>
              <li>नियमित आरोग्य तपासणी आणि लसीकरणास उत्तेजन मिळते.</li>
              <li>सरकारी आरोग्य योजनांबद्दल जागरूकता वाढते.</li>
            </ul>
          </section>

          {/* Footer */}
          <div className="pt-6 text-center text-sm text-gray-500 border-t border-gray-200">
            © महिला आणि बाल विकास मंत्रालय, भारत सरकार | PMMVY
          </div>
        </div>
      </div>
    </div>
  );
}

export default PradhanMantriMatruVandanaYojana;