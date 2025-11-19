import React from "react";
import {
  FileText,
  CheckCircle2,
  ClipboardList,
  BarChart3,
  FileCheck,
  Users,
} from "lucide-react";

function MGNREGA() {
  return (
    <div className="min-h-screen relative bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Uniform width across all scheme pages */}
      <div className="max-w-5xl mx-auto bg-white/95 shadow-xl backdrop-blur-sm rounded-3xl border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-green-700 to-emerald-600 p-8 sm:p-12 text-center text-white">
          <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] opacity-10"></div>
          <div className="relative">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full shadow-inner">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना (MGNREGA)
            </h1>
            <p className="max-w-3xl mx-auto text-emerald-100 text-lg">
              भारतातील ग्रामीण भागातील रोजगार आणि पायाभूत सुविधांच्या विकासासाठी
              १०० दिवसांच्या हमी कामाची खात्री देणारा एक प्रमुख कार्यक्रम.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-12 space-y-10 text-gray-700">
          {/* Introduction */}
          <section>
            <h2 className="flex items-center gap-2 text-2xl font-semibold text-green-700 mb-3">
              <FileText className="w-6 h-6 text-emerald-500" />
              परिचय
            </h2>
            <p className="leading-relaxed text-gray-700">
              <strong>
                महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी कायदा
              </strong>{" "}
              भारत सरकारने २००५ मध्ये सुरू केला. हे अकुशल मजुरीचे काम करण्यास
              इच्छुक असलेल्या प्रत्येक ग्रामीण कुटुंबातील प्रौढ सदस्यांना
              वर्षाला किमान <strong>१०० दिवसांच्या रोजगाराची हमी</strong> देते.
            </p>
          </section>

          {/* Objectives */}
          <section className="bg-green-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              योजनेची उद्दिष्टे
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>ग्रामीण भागातील बेरोजगारी कमी करणे.</li>
              <li>
                ग्रामीण कुटुंबांसाठी शाश्वत उत्पन्नाचे स्रोत उपलब्ध करून देणे.
              </li>
              <li>
                पायाभूत सुविधांच्या विकासासाठी श्रम-केंद्रित कामांना प्रोत्साहन
                देणे.
              </li>
              <li>महिलांच्या सहभागास आणि सक्षमीकरणास प्रोत्साहन देणे.</li>
              <li>पर्यावरणीय शाश्वतता आणि संसाधन संवर्धनास समर्थन देणे.</li>
            </ul>
          </section>

          {/* Key Features */}
          <section>
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              प्रमुख वैशिष्ट्ये
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "प्रत्येक कुटुंबाला १०० दिवसांच्या रोजगाराची हमी.",
                "पुरुष आणि महिलांना समान वेतन.",
                "मजुरी थेट बँक किंवा पोस्ट ऑफिस खात्यात जमा.",
                "ग्रामपंचायतींमार्फत कालबद्ध अंमलबजावणी.",
                "जलसंधारण, ग्रामीण रस्ते आणि वनीकरणावर भर.",
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-emerald-50 border border-emerald-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Process */}
          <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-green-700 mb-3">
              <ClipboardList className="w-5 h-5 text-green-500" />
              अंमलबजावणी प्रक्रिया
            </h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-green-800 mb-1">
                  १. अर्ज प्रक्रिया
                </h3>
                <p>
                  अर्जदार ग्रामपंचायतीकडे अर्ज सादर करू शकतात. कुटुंबातील
                  कोणताही प्रौढ सदस्य (१८+) अर्ज करू शकतो.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">
                  २. जॉब कार्ड वाटप
                </h3>
                <p>
                  पात्र कुटुंबांना १५ दिवसांच्या आत जॉब कार्ड दिले जाते,
                  ज्यामध्ये सदस्यांची नावे आणि अधिकारांची माहिती असते.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">
                  ३. रोजगार मिळवणे
                </h3>
                <p>
                  जॉब कार्ड धारकांनी कामाची मागणी केल्यावर त्यांना १५ दिवसांच्या
                  आत रोजगार उपलब्ध करून दिला जातो.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">
                  ४. मजुरी वाटप
                </h3>
                <p>
                  काम पूर्ण झाल्यानंतर १५ दिवसांच्या आत मजुरी थेट बँक खात्यात
                  जमा केली जाते.
                </p>
              </div>
            </div>
          </section>

          {/* Performance in Maharashtra */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-green-700 mb-3">
              <BarChart3 className="w-5 h-5 text-green-500" />
              महाराष्ट्रातील कामगिरी
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                २०२३-२४ मध्ये MGNREGA अंतर्गत <strong>१ कोटीहून अधिक</strong>{" "}
                मजुरांची नोंदणी.
              </li>
              <li>
                <strong>४० लाखांहून अधिक</strong> कुटुंबांना रोजगाराचा लाभ.
              </li>
              <li>१५ लाखांहून अधिक ग्रामीण पायाभूत सुविधा प्रकल्प पूर्ण.</li>
            </ul>
          </section>

          {/* Importance */}
          <section className="bg-green-50 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-green-700 mb-3">महत्व</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>ग्रामीण रोजगाराला चालना देते आणि स्थलांतर रोखते.</li>
              <li>लिंग समानतेची खात्री - ४५% महिलांचा सहभाग.</li>
              <li>नैसर्गिक साधनसंपत्ती व्यवस्थापन आणि शाश्वतता सुधारते.</li>
              <li>पंचायत राज संस्थांद्वारे स्थानिक प्रशासन मजबूत करते.</li>
            </ul>
          </section>

          {/* Required Documents */}
          <section>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-green-700 mb-3">
              <FileCheck className="w-5 h-5 text-green-500" />
              आवश्यक कागदपत्रे
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>आधार कार्ड</li>
              <li>मतदार ओळखपत्र</li>
              <li>बँक पासबुक / खात्याचा तपशील</li>
              <li>जॉब कार्ड (जर आधीच जारी केले असेल तर)</li>
            </ul>
          </section>

          {/* Infographic Summary */}
          <section className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              थोडक्यात सारांश
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 border border-green-100 rounded-xl bg-white text-center shadow-sm">
                <h4 className="text-green-700 font-semibold mb-1">
                  रोजगार हमी
                </h4>
                <p className="text-gray-600 text-sm">
                  प्रत्येक ग्रामीण कुटुंबाला १०० दिवसांचे काम
                </p>
              </div>
              <div className="p-4 border border-green-100 rounded-xl bg-white text-center shadow-sm">
                <h4 className="text-green-700 font-semibold mb-1">
                  महिला सहभाग
                </h4>
                <p className="text-gray-600 text-sm">
                  ४५% पेक्षा जास्त कामगार महिला आहेत
                </p>
              </div>
              <div className="p-4 border border-green-100 rounded-xl bg-white text-center shadow-sm">
                <h4 className="text-green-700 font-semibold mb-1">
                  ग्रामीण विकास
                </h4>
                <p className="text-gray-600 text-sm">
                  रस्ते, पाणी आणि वनीकरणासाठी १५ लाखांहून अधिक प्रकल्प
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-6 text-center text-sm text-gray-500 border-t border-gray-200">
            © भारत सरकार | ग्रामीण विकास मंत्रालय | MGNREGA
          </div>
        </div>
      </div>
    </div>
  );
}

export default MGNREGA;
