import { useParams, Link } from "react-router-dom";
import { useState } from "react";
// Lucide icons for UI enhancement
import {
  Clock,
  IndianRupee,
  CheckCircle,
  FileText,
  ListOrdered,
  Phone,
  Mail,
  Clock4,
  ArrowRight,
  X,
  Info,
} from "lucide-react";

// बाह्य कंपोनेंट इंपोर्ट काढले, फक्त आवश्यक डेटा इंपोर्ट ठेवला
import { mockData } from "../../data/mockData";

function ServiceDetail() {
  const { slug } = useParams();
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const service = mockData.services.find((s) => s.slug === slug);

  // क्विक ॲक्शन बटण स्टाईल
  const baseButtonClass =
    "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150";

  // 404 - सेवा आढळली नाही
  if (!service) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center bg-white p-12 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-red-600">
            सेवा आढळली नाही
          </h1>
          <p className="text-gray-700">
            विनंती केलेली सेवा आमच्या रेकॉर्डमध्ये आढळू शकली नाही.
          </p>
          <Link
            to="/services"
            className="mt-6 inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
          >
            <ArrowRight className="w-4 h-4 mr-2" /> सर्व सेवा पाहा
          </Link>
        </div>
      </div>
    );
  }

  // ब्रेडक्रंब्स (Breadcrumbs)
  const breadcrumbs = [
    { label: "सेवा", href: "/services" },
    { label: service.name, href: null },
  ];

  // UI घटक: पेज हेडर (Page Header)
  const PageHeader = () => (
    <header className="py-12 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-lg">
      {/* ब्रेडक्रंब्स */}
      <nav className="text-sm mb-2 opacity-90 flex justify-center space-x-2">
        {breadcrumbs.map((item, index) => (
          <span key={index}>
            {item.href ? (
              <Link to={item.href} className="hover:underline text-teal-100">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-white">{item.label}</span>
            )}
            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
      </nav>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">{service.name}</h1>
      <p className="text-lg opacity-80">{service.description}</p>
    </header>
  );

  // UI घटक: कार्ड (Card) - फक्त डिव्ह वापरून
  const CustomCard = ({ children, className }) => (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );

  // UI घटक: मॉडेल (Modal)
  const CustomModal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null;

    const sizeClasses = size === "lg" ? "max-w-xl" : "max-w-md";

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses}`}>
          <div className="p-5 border-b flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader />

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* डावीकडील मुख्य माहिती (Left Section: Main Information) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview & Core Details */}
            <CustomCard className="shadow-xl border-t-4 border-teal-500">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-teal-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" /> सेवेचा आढावा
                </h2>
                <p className="text-gray-700 mb-6 border-b pb-4">
                  {service.fullDescription || service.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 p-4 bg-teal-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-teal-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        प्रक्रिया वेळ
                      </h4>
                      <p className="text-gray-700 font-semibold">
                        {service.processingTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-6 h-6 text-teal-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        सेवा शुल्क
                      </h4>
                      <p className="text-gray-700 font-semibold">
                        {service.fee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CustomCard>

            {/* Eligibility */}
            {service.eligibility && (
              <CustomCard className="shadow-lg">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" /> पात्रता निकष
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    {service.eligibility.map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                </div>
              </CustomCard>
            )}

            {/* Required Documents */}
            {service.documents && (
              <CustomCard className="shadow-lg">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" /> आवश्यक कागदपत्रे
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg transition hover:bg-blue-100"
                      >
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {doc.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {doc.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CustomCard>
            )}

            {/* Process Steps */}
            {service.process && (
              <CustomCard className="shadow-lg">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-teal-700 mb-6 flex items-center gap-2">
                    <ListOrdered className="w-5 h-5" /> अर्ज प्रक्रिया
                  </h2>
                  <div className="space-y-6">
                    {service.process.map((step, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                          {index + 1}
                        </div>
                        <div className="pt-1">
                          <h4 className="font-bold text-gray-900 mb-1">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CustomCard>
            )}
          </div>

          {/* उजवीकडील साइडबार (Right Section: Sidebar) */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <CustomCard className="shadow-xl border-t-4 border-teal-500">
              <div className="p-6">
                <h3 className="text-lg font-bold text-teal-700 mb-4">
                  त्वरित क्रिया
                </h3>
                <div className="space-y-3">
                  {/* ॲप्लिकेशन बटण लॉजिक */}
                  {service.isOnline ? (
                    <Link
                      to={service.applyRoute || "#"}
                      className="w-full block"
                    >
                      <button
                        className={`${baseButtonClass} bg-teal-600 hover:bg-teal-700 text-white`}
                      >
                        ऑनलाइन अर्ज करा
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setShowApplicationModal(true)}
                      className={`${baseButtonClass} bg-orange-600 hover:bg-orange-700 text-white`}
                    >
                      कार्यालयात भेट द्या
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* इतर क्रिया बटणे */}
                  <button
                    className={`${baseButtonClass} bg-white hover:bg-gray-50 border border-teal-500 text-teal-700`}
                  >
                    फॉर्म डाउनलोड करा
                  </button>
                  <button
                    className={`${baseButtonClass} text-blue-600 hover:bg-blue-50`}
                  >
                    स्थिती तपासा
                  </button>
                </div>
              </div>
            </CustomCard>

            {/* Help & Support */}
            <CustomCard className="shadow-lg">
              <div className="p-6">
                <h3 className="text-lg font-bold text-teal-700 mb-4">
                  मदत आणि संपर्क
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">हेल्पलाइन</div>
                      <div className="text-gray-700 font-semibold">
                        (02345) 272128
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">
                        ईमेल सपोर्ट
                      </div>
                      <div className="text-gray-700">
                        support@psshirala.gov.in
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock4 className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">
                        कार्यालयीन वेळ
                      </div>
                      <div className="text-gray-700">
                        सोम-शुक्र: सकाळी १० ते सायं ५ वाजेपर्यंत
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CustomCard>
          </div>
        </div>
      </div>

      {/* Application Modal (मराठीत रूपांतरित) */}
      <CustomModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title="अर्ज सबमिशन माहिती"
        size="lg"
      >
        <div className="text-center py-8">
          <div className="text-4xl mb-4 text-orange-500">🚧</div>
          <h3 className="text-xl font-bold mb-2 text-gray-900">
            सेवा उपलब्धतेची सूचना
          </h3>
          <p className="text-gray-600 mb-4">
            ही सेवा ऑनलाइन उपलब्ध नाही. कृपया अर्ज करण्यासाठी आवश्यक
            कागदपत्रांसह ग्रामपंचायत कार्यालयात भेट द्या.
          </p>
          <button
            onClick={() => setShowApplicationModal(false)}
            className={`${baseButtonClass} max-w-xs mx-auto bg-teal-600 hover:bg-teal-700 text-white`}
          >
            ठीक आहे
          </button>
        </div>
      </CustomModal>
    </div>
  );
}

export default ServiceDetail;
