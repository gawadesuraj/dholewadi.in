import React from "react";
import { Heart, FileText, CheckCircle, Phone, FileCheck } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";

function AyushmanBharatScheme() {
  const breadcrumbs = [{ label: "आयुष्यमान भारत", href: null }];

  return (
    <div className="min-h-screen relative bg-gray-50 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Page Container */}
      <div className="max-w-5xl mx-auto bg-white/90 shadow-xl backdrop-blur-sm rounded-b-3xl border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 flex justify-between items-center bg-white">
          {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
        </div>
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-8 sm:p-12 text-center text-white rounded-3xl">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY)
            </h1>
            <p className="max-w-3xl mx-auto text-blue-100 text-lg">
              भारताची प्रमुख आरोग्य सुरक्षा योजना जी लाखो कुटुंबांना परवडणारी,
              सुलभ आणि दर्जेदार आरोग्य सेवा सुनिश्चित करते.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 sm:p-12 space-y-10 text-gray-700">
          {/* Objective */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-blue-700 mb-3">
              <FileText className="w-6 h-6 text-blue-500" />
              योजनेचा उद्देश
            </h2>
            <p className="leading-relaxed text-gray-600">
              <strong>आयुष्मान भारत योजना</strong> हा भारत सरकारचा एक
              महत्त्वाकांक्षी आरोग्य उपक्रम आहे, ज्याचा उद्देश
              <span className="text-blue-700 font-medium">
                गरीब आणि गरजू कुटुंबांना मोफत आरोग्य सेवा प्रदान करणे
              </span>
              हा आहे. ही योजना सुनिश्चित करते की कोणताही नागरिक आर्थिक
              अडचणींमुळे दर्जेदार उपचारांपासून वंचित राहणार नाही, कारण
              <strong>
                सरकार मोठ्या आजारांचा आणि शस्त्रक्रियांचा रुग्णालयीन खर्च उचलते
              </strong>
              .
            </p>
          </section>

          {/* Plan Features */}
          <section className="bg-blue-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              💡 प्रमुख वैशिष्ट्ये
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>प्रति कुटुंब प्रति वर्ष ₹५ लाखांपर्यंत</strong> मोफत
                आरोग्य विमा संरक्षण.
              </li>
              <li>
                संलग्न (Empanelled) रुग्णालयांमध्ये कॅशलेस आणि पेपरलेस
                प्रक्रिया.
              </li>
              <li>
                शस्त्रक्रिया, निदान चाचण्या, औषधे आणि रुग्णालयात दाखल होण्याचा
                खर्च समाविष्ट.
              </li>
              <li>
                सेवा <strong>भारतातील १५,०००+ रुग्णालयांमध्ये</strong> उपलब्ध.
              </li>
            </ul>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              🧾 पात्रता
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                ग्रामीण आणि शहरी भागातील <strong>SECC 2011</strong> डेटाबेसमध्ये
                समाविष्ट असलेली कुटुंबे.
              </li>
              <li>असंघटित क्षेत्रातील कामगार.</li>
              <li>
                लाभ घेण्यासाठी <strong>कोणतीही नोंदणी फी किंवा प्रीमियम</strong>{" "}
                भरण्याची गरज नाही.
              </li>
              <li>
                महाराष्ट्रात, ही योजना{" "}
                <strong>महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)</strong>{" "}
                सोबत राबवली जाते.
              </li>
            </ul>
          </section>

          {/* Benefits */}
          <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              🎯 लाभ
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                प्रति कुटुंब प्रति वर्ष <strong>₹५ लाखांपर्यंत</strong> आरोग्य
                विमा.
              </li>
              <li>
                १३००+ हून अधिक उपचार पॅकेजेस (शस्त्रक्रिया, कर्करोग, डायलिसिस).
              </li>
              <li>
                रुग्णालयात दाखल होण्यापूर्वीचे ३ दिवस आणि डिस्चार्ज
                मिळाल्यानंतरचे १५ दिवस औषधे आणि चाचण्यांचा खर्च समाविष्ट.
              </li>
              <li>शासकीय आणि खाजगी संलग्न रुग्णालयांमध्ये मोफत उपचार.</li>
            </ul>
          </section>

          {/* Facilities */}
          <section>
            <h2 className="text-xl font-semibold text-indigo-700 mb-3">
              🏥 उपलब्ध सुविधा
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>संलग्न रुग्णालयांमध्ये कॅशलेस उपचार.</li>
              <li>२४x७ हेल्पलाइन आणि सुविधा केंद्र.</li>
              <li>पेपरलेस ॲडमिशन आणि डिस्चार्ज प्रक्रिया.</li>
            </ul>
          </section>

          {/* Documents */}
          <section>
            <h2 className="text-xl font-semibold text-amber-700 mb-3">
              <FileCheck className="inline-block w-5 h-5 mr-1 text-amber-500" />
              आवश्यक कागदपत्रे
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>आधार कार्ड</li>
              <li>रेशन कार्ड किंवा SECC यादीतील नाव</li>
              <li>आयुष्मान भारत (ABHA) हेल्थ आयडी</li>
              <li>लाभार्थ्याशी लिंक असलेला मोबाईल नंबर</li>
            </ul>
          </section>

          {/* Application Process */}
          <section className="bg-yellow-50 p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
            <h2 className="text-xl font-semibold text-yellow-700 mb-3">
              🧭 अर्ज आणि नोंदणी प्रक्रिया
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                जवळच्या{" "}
                <strong>
                  आयुष्मान भारत सुविधा केंद्राला (CSC / जनसेवा केंद्र)
                </strong>{" "}
                भेट द्या.
              </li>
              <li>
                येथे पात्रता यादी तपासा:{" "}
                <a
                  href="https://pmjay.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://pmjay.gov.in
                </a>
                .
              </li>
              <li>आवश्यक कागदपत्रांसह AB-PMJAY कार्ड प्राप्त करा.</li>
              <li>रुग्णालयात कॅशलेस उपचारांसाठी कार्ड दाखवा.</li>
            </ol>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500" />
              संपर्क आणि हेल्पलाइन
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>राष्ट्रीय हेल्पलाइन:</strong> 14555 / 1800-111-565
              </li>
              <li>
                <strong>अधिकृत वेबसाइट:</strong>{" "}
                <a
                  href="https://pmjay.gov.in"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://pmjay.gov.in
                </a>
              </li>
              <li>
                <strong>महाराष्ट्र पोर्टल:</strong>{" "}
                <a
                  href="https://www.jeevandayee.gov.in"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://www.jeevandayee.gov.in
                </a>
              </li>
            </ul>
          </section>

          {/* Important Note */}
          <section className="bg-gradient-to-r from-yellow-100 to-orange-50 p-6 rounded-2xl border-l-4 border-orange-400">
            <h2 className="text-lg font-semibold text-orange-700 mb-2">
              ⚠️ महत्वाची सूचना
            </h2>
            <p className="text-gray-700 leading-relaxed">
              महाराष्ट्रात, आयुष्मान भारत योजना{" "}
              <strong>महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY)</strong>{" "}
              सोबत संयुक्तपणे चालवली जाते. रुग्णालयात दाखल होण्यापूर्वी पात्रता
              यादीत नाव तपासून लाभार्थी दोन्ही योजनांचा लाभ घेऊ शकतात.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AyushmanBharatScheme;
