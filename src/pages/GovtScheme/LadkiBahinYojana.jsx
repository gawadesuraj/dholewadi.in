import React from "react";
import { Heart, FileText, Star, CheckCircle2, PhoneCall, FileCheck } from "lucide-react";

function LadkiBahinYojana() {
  return (
    <div
      className="min-h-screen relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Page Container */}
      <div className="max-w-5xl mx-auto bg-white/90 shadow-xl backdrop-blur-sm rounded-3xl border border-gray-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-cyan-700 to-slate-800 p-8 sm:p-12 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              लाडकी बहीण योजना — महाराष्ट्र शासन
            </h1>
            <p className="max-w-3xl mx-auto text-cyan-100 text-lg">
              महाराष्ट्रातील महिलांना सक्षम करण्यासाठी, त्यांना दरमहा आर्थिक मदत देऊन आर्थिक स्वातंत्र्य देण्यासाठीची एक कल्याणकारी योजना.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 space-y-10 text-gray-700">

          {/* Objective */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-cyan-700 mb-3">
              <FileText className="w-6 h-6 text-cyan-500" />
              योजनेचा उद्देश
            </h2>
            <p className="leading-relaxed text-gray-600">
              <strong>लाडकी बहीण योजना</strong> ही महाराष्ट्र सरकारने महिलांच्या आर्थिक स्वातंत्र्यासाठी 
              आणि स्वावलंबनासाठी सुरू केलेली एक सामाजिक कल्याणकारी योजना आहे. 
              याद्वारे पात्र महिलांना त्यांचे जीवनमान उंचावण्यासाठी आणि कुटुंबावरील आर्थिक ताण 
              कमी करण्यासाठी दरमहा आर्थिक मदत दिली जाते.
            </p>
          </section>

          {/* Important Features */}
          <section className="bg-cyan-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-cyan-700 mb-3">
              प्रमुख वैशिष्ट्ये
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                लाभार्थ्याच्या बँक खात्यात दरमहा <strong>₹१,५००</strong> थेट जमा केले जातात.
              </li>
              <li>
                निधी <strong>थेट लाभ हस्तांतरण (DBT)</strong> प्रणालीद्वारे सुरक्षितपणे हस्तांतरित केला जातो.
              </li>
              <li>
                महाराष्ट्रातील <strong>महिलांच्या आर्थिक सक्षमीकरणासाठी</strong> राबवलेला एक प्रमुख उपक्रम.
              </li>
              <li>
                राज्यातील सर्व जिल्ह्यांमधील पात्र महिलांसाठी उपलब्ध.
              </li>
            </ul>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-slate-700 mb-3">
              पात्रता निकष
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>अर्जदार <strong>महाराष्ट्राचा रहिवासी</strong> असावा.</li>
              <li>वय <strong>२१ ते ६५ वर्षे</strong> असावे.</li>
              <li>कुटुंबाचे वार्षिक उत्पन्न <strong>₹२.५ लाखांपेक्षा कमी</strong> असावे.</li>
              <li>
                महिला <strong>अविवाहित, विधवा, घटस्फोटित किंवा विवाहित</strong> असू शकतात.
              </li>
              <li>
                हे <strong>कामगार, घरकाम करणाऱ्या महिला, शेतमजूर</strong> आणि असंघटित क्षेत्रातील महिलांसाठी लागू आहे.
              </li>
            </ul>
          </section>

          {/* Required Documents */}
          <section className="bg-gradient-to-r from-cyan-50 to-slate-50 p-6 rounded-2xl shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-cyan-700 mb-3">
              <FileCheck className="w-5 h-5 text-cyan-500" />
              आवश्यक कागदपत्रे
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>आधार कार्ड</li>
              <li>रहिवासी पुरावा (अधिवास प्रमाणपत्र / रेशन कार्ड)</li>
              <li>उत्पन्न प्रमाणपत्र</li>
              <li>बँक खाते तपशील (DBT साठी)</li>
              <li>हमीपत्र (विहित नमुन्यात)</li>
              <li>पासपोर्ट आकाराचा फोटो</li>
            </ul>
          </section>

          {/* Application Process */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-700 mb-3">
              अर्ज प्रक्रिया
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                योजना अधिकृतपणे सुरू झाल्यानंतर <strong>नारी शक्ती दूत ॲप (Nari Shakti Doot App)</strong> द्वारे, <strong>ऑनलाइन पोर्टल</strong> किंवा <strong>अंगणवाडी केंद्रात</strong> अर्ज सादर करावेत.
              </li>
              <li>अर्ज सादर करताना सर्व आवश्यक कागदपत्रे अपलोड करावीत.</li>
              <li>
                पडताळणीनंतर, रक्कम थेट लाभार्थ्याच्या बँक खात्यात जमा केली जाईल.
              </li>
            </ol>
          </section>

          {/* Scheme Start Date */}
          <section className="bg-slate-50 p-6 rounded-2xl border-l-4 border-cyan-500 shadow-sm">
            <h2 className="text-xl font-semibold text-cyan-700 mb-3">
              योजना सुरू होण्याची तारीख
            </h2>
            <p className="text-gray-700">
              <strong>लाडकी बहीण योजना</strong> अधिकृतपणे <strong>आर्थिक वर्ष २०२४-२५</strong> मध्ये लागू करण्यात आली.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-cyan-50 to-slate-50 p-6 rounded-2xl shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-700 mb-3">
              <PhoneCall className="w-5 h-5 text-cyan-500" />
              संपर्क आणि मदत
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                तुमच्या <strong>स्थानिक अंगणवाडी सेविका</strong>, <strong>ग्रामपंचायत</strong> किंवा <strong>नगरपालिका कार्यालयाला</strong> भेट द्या.
              </li>
              <li>
                संपर्क:{" "}
                <strong>
                  महिला आणि बाल विकास विभाग, महाराष्ट्र शासन
                </strong>
                .
              </li>
              <li>
                अधिकृत वेबसाइट:{" "}
                <a
                  href="https://ladakibahin.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 underline hover:text-cyan-800"
                >
                  https://ladakibahin.maharashtra.gov.in
                </a>
              </li>
            </ul>
          </section>

          {/* Note */}
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">टीप</h2>
            <p className="text-gray-700 leading-relaxed">
              ही योजना सध्या अंमलबजावणीच्या टप्प्यात आहे. काही पात्रता निकष किंवा अर्ज प्रक्रियेत बदल होऊ शकतात. 
              अर्ज करण्यापूर्वी अर्जदारांनी स्थानिक कार्यालयात किंवा अधिकृत सरकारी वेबसाइटवर तपशील तपासावेत.
            </p>
          </section>

          {/* Footer */}
          <div className="pt-6 text-center text-sm text-gray-500 border-t border-gray-200">
            © महाराष्ट्र शासन | महिला आणि बाल विकास विभाग
          </div>
        </div>
      </div>
    </div>
  );
}

export default LadkiBahinYojana;