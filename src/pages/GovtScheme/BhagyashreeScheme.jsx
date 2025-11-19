import React from "react";
import {
  Baby,
  HeartHandshake,
  FileText,
  CheckCircle2,
  BookOpen,
  FileCheck,
  PhoneCall,
} from "lucide-react";

function BhagyashreeScheme() {
  return (
    <div className="min-h-screen relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Container */}
      <div className="max-w-5xl mx-auto bg-white/95 shadow-xl backdrop-blur-sm rounded-3xl border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-violet-700 to-fuchsia-700 p-8 sm:p-12 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Baby className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              भाग्यश्री लेक माझी लाडकी योजना
            </h1>
            <p className="max-w-3xl mx-auto text-violet-100 text-lg">
              मुलींचा जन्म, शिक्षण आणि सक्षमीकरणाला प्रोत्साहन देण्यासाठी
              महाराष्ट्र सरकारचा एक प्रमुख उपक्रम.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 sm:p-12 space-y-10 text-gray-700">
          {/* Purpose Section */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-violet-700 mb-3">
              <HeartHandshake className="w-6 h-6 text-fuchsia-500" />
              योजनेचा उद्देश
            </h2>
            <p className="leading-relaxed text-gray-700">
              मुलींच्या जन्माला प्रोत्साहन देणे, लिंगभेद रोखणे आणि प्रत्येक
              मुलीला शिक्षणाची संधी उपलब्ध करून देण्यासाठी महाराष्ट्र सरकारने{" "}
              <strong>भाग्यश्री (लेक माझी लाडकी)</strong> योजना सुरू केली आहे.
              ही योजना जन्मापासून उच्च शिक्षणापर्यंत आर्थिक मदत पुरवते, ज्यामुळे
              दीर्घकालीन सामाजिक आणि शैक्षणिक आधार मिळतो.
            </p>
          </section>

          {/* Features */}
          <section className="bg-fuchsia-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">
              योजनेची वैशिष्ट्ये
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>जन्मापासून आर्थिक मदत</strong> – मुलीच्या जन्मानंतर
                पालकांना प्रोत्साहनपर रक्कम दिली जाते.
              </li>
              <li>
                <strong>शैक्षणिक आधार</strong> – शिक्षणाच्या प्रत्येक टप्प्यावर
                शिष्यवृत्ती आणि प्रोत्साहन दिले जाते.
              </li>
              <li>
                मुलीचे <strong>शिक्षण, सक्षमीकरण आणि कल्याणावर</strong> (प्रौढ
                होईपर्यंत) भर.
              </li>
            </ul>
          </section>

          {/* Beneficiaries */}
          <section>
            <h2 className="text-xl font-semibold text-violet-700 mb-3">
              पात्र लाभार्थी
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                महाराष्ट्रातील <strong>दारिद्र्य रेषेखालील (BPL)</strong>{" "}
                कुटुंबे.
              </li>
              <li>
                हा लाभ फक्त <strong>पहिल्या दोन मुलींसाठी</strong> लागू आहे.
              </li>
              <li>
                कुटुंबाचे वार्षिक उत्पन्न <strong>₹१ लाखांपेक्षा कमी</strong>{" "}
                असावे.
              </li>
              <li>
                दोन्ही पालक <strong>महाराष्ट्राचे रहिवासी</strong> असावेत.
              </li>
              <li>पालकांनी कुटुंब नियोजन शस्त्रक्रिया करणे आवश्यक आहे.</li>
            </ul>
          </section>

          {/* Benefits Table */}
          <section className="bg-gradient-to-r from-fuchsia-50 to-violet-50 p-6 rounded-2xl shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-fuchsia-700 mb-3">
              <BookOpen className="w-5 h-5 text-fuchsia-500" />
              योजनेअंतर्गत मिळणारे लाभ
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
                <thead className="bg-fuchsia-100 text-gray-700">
                  <tr>
                    <th className="text-left px-4 py-2 border-b">टप्पा</th>
                    <th className="text-left px-4 py-2 border-b">
                      प्रोत्साहन रक्कम (₹)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-2">मुलीचा जन्म</td>
                    <td className="px-4 py-2">
                      ₹५,००० – ₹२५,००० (जिल्ह्यानुसार)
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-4 py-2">इयत्ता १ ली ते ७ वी</td>
                    <td className="px-4 py-2">₹२,००० – ₹३,००० प्रति वर्ष</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2">इयत्ता ८ वी ते १० वी</td>
                    <td className="px-4 py-2">₹४,००० – ₹५,००० प्रति वर्ष</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-4 py-2">इयत्ता ११ वी आणि १२ वी</td>
                    <td className="px-4 py-2">₹६,००० – ₹७,००० प्रति वर्ष</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">उच्च / व्यावसायिक शिक्षण</td>
                    <td className="px-4 py-2">विशेष योजनांतर्गत मदत</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              (टीप: रक्कम जिल्हा किंवा वर्गवारीनुसार बदलू शकते.)
            </p>
          </section>

          {/* Required Documents */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-violet-700 mb-3">
              <FileCheck className="w-5 h-5 text-violet-500" />
              आवश्यक कागदपत्रे
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>पालकांचे आधार कार्ड</li>
              <li>मुलीचा जन्म दाखला</li>
              <li>उत्पन्न प्रमाणपत्र</li>
              <li>जातीचा दाखला (लागू असल्यास)</li>
              <li>कुटुंब नियोजन प्रमाणपत्र</li>
              <li>बँक खाते तपशील (मुलीच्या किंवा पालकांच्या नावावर)</li>
              <li>रहिवासी प्रमाणपत्र (डोमिसाईल)</li>
            </ul>
          </section>

          {/* Application Process */}
          <section className="bg-violet-50 p-6 rounded-2xl border-l-4 border-violet-400 shadow-sm">
            <h2 className="text-xl font-semibold text-violet-700 mb-3">
              अर्ज प्रक्रिया
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                अर्ज <strong>स्थानिक अंगणवाडी केंद्र</strong>,{" "}
                <strong>ग्रामपंचायत</strong> किंवा{" "}
                <strong>महिला आणि बाल विकास विभाग कार्यालयात</strong> सादर करता
                येतील.
              </li>
              <li>विहित नमुन्यातील अर्ज भरा आणि सर्व आवश्यक कागदपत्रे जोडा.</li>
              <li>
                पडताळणीनंतर, प्रोत्साहन रक्कम थेट लाभार्थ्याच्या खात्यात जमा
                केली जाईल.
              </li>
            </ol>
          </section>

          {/* Contact Info */}
          <section className="bg-fuchsia-50 p-6 rounded-2xl shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-fuchsia-700 mb-3">
              <PhoneCall className="w-5 h-5 text-fuchsia-500" />
              संपर्क आणि माहिती
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>महिला आणि बाल विकास विभाग, महाराष्ट्र शासन</strong>
              </li>
              <li>
                जवळचे अंगणवाडी केंद्र / ग्रामपंचायत / पंचायत समिती कार्यालय
              </li>
              <li>
                अधिकृत वेबसाइट:{" "}
                <a
                  href="https://wcd.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fuchsia-600 underline hover:text-fuchsia-800"
                >
                  https://wcd.maharashtra.gov.in
                </a>
              </li>
            </ul>
          </section>

          {/* Notes */}
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">टीप:</h2>
            <p className="text-gray-700 leading-relaxed">
              सरकारी धोरणातील अद्यतनांनुसार अटी, पात्रता आणि लाभ वेळोवेळी
              सुधारित केले जाऊ शकतात. अर्ज करण्यापूर्वी अर्जदारांनी जवळच्या
              स्थानिक प्राधिकरणाकडून किंवा अधिकृत वेबसाइटवरून तपशीलाची खात्री
              करावी.
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

export default BhagyashreeScheme;
