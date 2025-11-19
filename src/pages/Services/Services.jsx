/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
// Lucide icons are used directly
import {
  Search,
  FileText,
  Stamp,
  HeartHandshake,
  IndianRupee,
  List,
  ArrowRight,
} from "lucide-react";

// बाह्य डेटा स्रोत (Data Source)
import { mockData } from "../../data/mockData";

// --- स्थानिक UI घटक/उपयोगिता (Local UI Helpers) ---

// सेवा श्रेणींचे मराठीत रूपांतरण
const categoryMap = {
  all: "सर्व श्रेणी",
  certificates: "प्रमाणपत्रे",
  licenses: "परवाने",
  welfare: "कल्याणकारी योजना",
  tax: "कर आणि महसूल",
};

// श्रेणीनुसार आयकॉन मिळवण्याचे फंक्शन
const getCategoryIcon = (category) => {
  switch (category) {
    case "certificates":
      return <FileText className="w-6 h-6 text-teal-600" />;
    case "licenses":
      return <Stamp className="w-6 h-6 text-orange-600" />;
    case "welfare":
      return <HeartHandshake className="w-6 h-6 text-red-500" />;
    case "tax":
      return <IndianRupee className="w-6 h-6 text-green-600" />;
    default:
      return <List className="w-6 h-6 text-gray-500" />;
  }
};

function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "certificates", "licenses", "welfare", "tax"];

  // फिल्टरिंग लॉजिक
  const filteredServices = useMemo(() => {
    return mockData.services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // UI घटक: पेज हेडर (Page Header) - SelfDeclarations प्रमाणे डिझाइन
  const PageHeader = () => (
    <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 overflow-hidden mt-12 mb-8">
      <header className="relative bg-gradient-to-r from-teal-600 to-cyan-700 p-8 sm:p-12 text-center text-white">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full shadow-inner">
              <List className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            सरकारी सेवा पोर्टल
          </h1>
          <p className="text-teal-100 text-lg">
            ग्रामपंचायत ढोलेवाडीसाठी महत्त्वाच्या सेवा ऑनलाइन उपलब्ध
          </p>
        </div>
      </header>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      {/* HEADER SECTION (Outside the main container to allow full width effect, matching previous structure) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader />
      </div>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section (Using Custom Card/Box style) */}
        <div className="mb-10 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {/* Search Bar (SearchBar logic embedded) */}
            <div className="md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="सेवा, योजना किंवा प्रमाणपत्र शोधा..."
                  className="w-full px-5 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                श्रेणीनुसार फिल्टर करा
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-150 text-gray-700 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryMap[cat]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              // Custom Card implementation using div
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    {/* Category Icon */}
                    <div className="p-3 bg-teal-50 rounded-full shadow-inner">
                      {getCategoryIcon(service.category)}
                    </div>

                    {/* Status Tags */}
                    <div className="flex space-x-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold capitalize border ${
                          service.isOnline
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {service.isOnline ? "ऑनलाइन उपलब्ध" : "ऑफलाइन"}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 mt-4">
                    {service.name}
                  </h3>
                  <span className="text-xs font-medium text-teal-600 capitalize">
                    {categoryMap[service.category]}
                  </span>

                  <p className="text-gray-600 text-sm mb-4 mt-2 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Service Details in Marathi */}
                  <div className="space-y-1 text-xs text-gray-500 mb-4 border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium">⏱️ प्रक्रिया वेळ:</span>
                      <span>{service.processingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">💰 शुल्क:</span>
                      <span className="font-semibold text-gray-700">
                        {service.fee}
                      </span>
                    </div>
                  </div>

                  {/* Apply Now Button/Link (Custom button implementation) */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex items-center justify-center w-full bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition duration-200 shadow-md"
                  >
                    आता अर्ज करा
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="text-teal-400 text-6xl mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              कोणतीही सेवा आढळली नाही
            </h3>
            <p className="text-gray-600 text-lg">
              तुमचे शोध निकष किंवा श्रेणी फिल्टर समायोजित करण्याचा प्रयत्न करा.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
