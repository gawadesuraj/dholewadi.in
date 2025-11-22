/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
// Assuming these UI components are imported from their respective paths
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

// Import necessary icons and external data source
import {
  Zap,
  Clock,
  IndianRupee,
  ArrowRight,
  FileText,
  Home,
  Wallet,
  Droplet,
  Scale,
  List, // Reusing icons from the Services file you provided
} from "lucide-react";
// 🚨 Fetch data directly from the mock structure you used in the Services file
import { mockData } from "../../data/mockData";

// --- Helper function to map category to an icon component ---
// NOTE: These match the icons used in the Services component for consistency
const getServiceIconComponent = (category) => {
  switch (category) {
    case "certificates":
      return FileText;
    case "licenses":
      return Scale;
    case "welfare":
      return Wallet; // Using Wallet as a generic welfare icon placeholder
    case "tax":
      return Home; // Using Home for Property/Water tax
    default:
      return List;
  }
};

// --- Helper function to assign color based on category (for the icon circle) ---
const getServiceColor = (category) => {
  switch (category) {
    case "certificates":
      return "from-blue-500 to-blue-600";
    case "licenses":
      return "from-orange-500 to-orange-600";
    case "welfare":
      return "from-green-500 to-green-600";
    case "tax":
      return "from-teal-600 to-cyan-700"; // Teal theme
    default:
      return "from-gray-500 to-gray-600";
  }
};

const QuickServices = () => {
  // 🚨 FETCHING DATA
  // We assume the service objects in mockData.services contain:
  // id, name, description, category, slug, processingTime, fee, isOnline.
  const services = mockData.services || [];

  const primaryGradientClip =
    "bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent p-2";

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* --- Section Header --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-teal-600/10 rounded-full px-6 py-2 mb-4">
            <Zap className="w-4 h-4 mr-2 text-teal-700" />
            <span className="font-semibold text-teal-700"> डिजिटल सेवा</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            जलद <span className={primaryGradientClip}>सरकारी सेवा</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            घरी बसल्या आवश्यक सरकारी सेवांचा लाभ घ्या. आमचे डिजिटल प्लॅटफॉर्म
            जलद, पारदर्शक आणि कार्यक्षम सेवा वितरण सुनिश्चित करते.
          </p>
        </div>

        {/* --- Services Grid --- */}
        {services.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => {
              const IconComponent = getServiceIconComponent(service.category);
              const colorClass = getServiceColor(service.category);

              return (
                <div key={service.id || index}>
                  <Card
                    hover
                    gradient
                    className="group overflow-hidden h-full flex flex-col"
                    shadow="lg"
                  >
                    <div className="p-8 relative flex-grow flex flex-col">
                      {/* Service Icon */}
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <IconComponent className="w-8 h-8" />
                      </div>

                      {/* Content */}
                      <h3
                        className={`text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300`}
                      >
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                        {service.description}
                      </p>

                      {/* Service Details */}
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-6 border-t pt-4">
                        <div className="flex items-center text-gray-700">
                          <Clock className="w-4 h-4 mr-1 text-teal-600" />
                          <span className="font-medium">प्रक्रिया:</span>{" "}
                          {service.processingTime}
                        </div>
                        <div className="flex items-center font-medium text-teal-600">
                          <IndianRupee className="w-4 h-4 mr-1" />
                          {service.fee}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to={`/services/${service.slug}`}
                        className="mt-auto"
                      >
                        <Button
                          variant="outline"
                          className={`w-full text-teal-600 border-teal-600`}
                          rightIcon={
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          }
                        >
                          आताच अर्ज करा
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="text-teal-400 text-6xl mb-4">
              <Zap className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              सध्या कोणतीही सेवा उपलब्ध नाही
            </h3>
            <p className="text-gray-600 text-lg">
              कृपया नंतर तपासा किंवा अधिक माहितीसाठी ग्रामपंचायत कार्यालयात
              संपर्क साधा.
            </p>
          </div>
        )}

        {/* --- Call to Action --- */}
        <div className="text-center bg-gradient-to-r from-teal-600 to-cyan-700 rounded-3xl p-12 text-white shadow-xl">
          <h3 className="text-3xl font-bold mb-4">आणखी सेवा हव्या आहेत?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            आमच्या सरकारी सेवा आणि अर्जांची संपूर्ण श्रेणी एक्सप्लोर करा.
            आपल्याला आवश्यक असलेली प्रत्येक गोष्ट फक्त एका क्लिकवर आहे.
          </p>
          <Link to="/services">
            <Button
              size="lg"
              variant="glass"
              leftIcon={<Zap className="w-5 h-5 text-gray-800" />}
              className="min-w-[250px] text-gray-800 hover:text-white"
            >
              सर्व सेवा पहा
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickServices;
