import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

// सेवांची यादी मराठीत
const services = [
  {
    title: "जन्म प्रमाणपत्र",
    description: "जलद प्रक्रियेसह जन्म प्रमाणपत्रासाठी ऑनलाइन अर्ज करा",
    icon: "👶",
    link: "/services/birth-certificate",
    color: "from-blue-500 to-blue-600",
    time: "७-१० दिवस",
    fee: "₹५०",
  },
  {
    title: "मृत्यू प्रमाणपत्र",
    description: "कायदेशीर प्रक्रियेसाठी मृत्यू प्रमाणपत्र मिळवा",
    icon: "📄",
    link: "/services/death-certificate",
    color: "from-gray-600 to-gray-700",
    time: "३-५ दिवस",
    fee: "₹५०",
  },
  {
    title: "उत्पन्न प्रमाणपत्र",
    description: "विविध कारणांसाठी अधिकृत उत्पन्न प्रमाणपत्र",
    icon: "💰",
    link: "/services/income-certificate",
    color: "from-green-500 to-green-600",
    time: "१५ दिवस",
    fee: "₹३०",
  },
  {
    title: "मालमत्ता कर",
    description: "मालमत्ता कर त्वरित ऑनलाइन भरा",
    icon: "🏠",
    link: "/services/property-tax",
    color: "from-purple-500 to-purple-600",
    time: "त्वरित",
    fee: "बदलते",
  },
  {
    title: "जलजोडणी (Water Connection)",
    description: "नवीन जलजोडणीसाठी अर्ज करा",
    icon: "💧",
    link: "/services/water-connection",
    color: "from-cyan-500 to-cyan-600",
    time: "३० दिवस",
    fee: "₹२,५००",
  },
  {
    title: "व्यापार परवाना",
    description: "व्यवसाय चालवण्यासाठी परवाना मिळवा",
    icon: "📋",
    link: "/services/trade-license",
    color: "from-orange-500 to-orange-600",
    time: "३० दिवस",
    fee: "₹१,०००+",
  },
];

function QuickServices() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className="text-center mb-16"
          data-aos="fade-up" // AOS Animation Added
        >
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-2 mb-4">
            <span className="text-primary font-semibold">⚡ डिजिटल सेवा</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            जलद{" "}
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent p-2">
              सरकारी सेवा
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            घरी बसल्या आवश्यक सरकारी सेवांचा लाभ घ्या. आमचे डिजिटल प्लॅटफॉर्म
            जलद, पारदर्शक आणि कार्यक्षम सेवा वितरण सुनिश्चित करते.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up" // AOS Animation Added
              data-aos-delay={index * 100} // Staggered delay for each card
            >
              <Card
                hover
                gradient
                className="group overflow-hidden h-full flex flex-col"
              >
                <div className="p-8 relative flex-grow flex flex-col">
                  {/* Background Icon */}
                  <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    {service.icon}
                  </div>

                  {/* Service Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {service.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {service.time}
                    </div>
                    <div className="flex items-center font-medium text-primary">
                      💳 {service.fee}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={service.link} className="mt-auto">
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                      rightIcon={
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      }
                    >
                      आताच अर्ज करा
                    </Button>
                  </Link>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-2xl transition-all duration-300 pointer-events-none"></div>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="text-center bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-12 text-white"
          data-aos="zoom-in" // AOS Animation Added
          data-aos-delay="300" // Delay to ensure it animates after the cards start appearing
        >
          <h3 className="text-3xl font-bold mb-4">आणखी सेवा हव्या आहेत?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            आमच्या सरकारी सेवा आणि अर्जांची संपूर्ण श्रेणी एक्सप्लोर करा.
            आपल्याला आवश्यक असलेली प्रत्येक गोष्ट फक्त एका क्लिकवर आहे.
          </p>
          <Button
            size="lg"
            variant="glass"
            leftIcon="🚀"
            className="min-w-[250px]"
          >
            <Link to="/services">सर्व सेवा पहा</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default QuickServices;
