import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";

// ---------- Menu Data (Fully Marathi) ----------
const navItems = [
  { label: "मुख्यपृष्ठ", path: "/" },

  {
    label: "माहिती",
    children: [
      { label: "गावाबद्दल माहिती", path: "/about" },
      { label: "कार्यक्रम", path: "/events" },
      { label: "अधिकारी", path: "/officers" },
      { label: "नागरिक सनद", path: "/citizensCharter" },
    ],
  },

  {
    label: "शासकीय योजना",
    children: [
      { label: "जलजीवन मिशन योजना", path: "https://water.maharashtra.gov.in" },
      { label: "आयुष्मान भारत योजना", path: "/ayushman-bharat" },
      { label: "१५ वे वित्त आयोग", path: "/15thCommission" },
      { label: "लाडकी बहिण योजना", path: "/ladli-bahin" },
      { label: "भाग्यश्री - लेक माझी लाडकी", path: "/bhagyashree" },
      { label: "स्वच्छ भारत मिशन", path: "/swachh-bharat" },
      { label: "मनरेगा योजना", path: "/mgnrega" },
      { label: "प्रधानमंत्री मातृ वंदना योजना", path: "/PMMVY" },
    ],
  },

  {
    label: "लाभार्थी योजना",
    children: [
      { label: "MNREGA", path: "/mnrega" },
      { label: "प्रधानमंत्री आवास योजना (लाभार्थी)", path: "/pmay" },
    ],
  },

  {
    label: "सोयी",
    children: [
      { label: "स्व-घोषणा", path: "/declaration" },
      { label: "ई-लर्निंग", path: "/e-learning" },
      { label: "हवामान अंदाज", path: "/weather" },
      { label: "महत्वाचे दुवे", path: "/imp-links" },
    ],
  },

  { label: "गॅलरी", path: "/gallery" },
  { label: "विभाग", path: "/departments" },
  { label: "सेवा", path: "/services" },
  { label: "बातम्या", path: "/news" },

  {
    label: "शासन",
    children: [
      { label: "माहितीचा अधिकार (RTI)", path: "/rti" },
      { label: "आर.पी.एस.ए.", path: "/rpa" },
    ],
  },

  { label: "ई-गव्हर्नन्स धोरण", path: "/e-governance" },
  { label: "संपर्क", path: "/contact" },
];

// ---------- Utility ----------
const isItemActive = (item, pathname) => {
  if (item.path === pathname) return true;
  if (Array.isArray(item.children)) {
    return item.children.some((c) => c.path === pathname);
  }
  return false;
};

// ---------- Component ----------
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const submenuRefs = useRef({});

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Disable scroll when mobile menu opens
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        मुख्य आशयावर जा
      </a>

      {/* Top Government Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-2 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">महाराष्ट्र शासन</span>
              <span className="hidden md:inline text-gray-400">•</span>
              <span className="hidden md:inline text-gray-300">
                सांगली जिल्हा
              </span>
            </div>

            {/* Language Switch */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="hover:text-yellow-300">हिंदी</button>
              <span className="text-gray-500">|</span>
              <button className="hover:text-yellow-300">English</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group flex-shrink-0"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">PS</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-800 text-base sm:text-lg">
                  पंचायत समिती शिराळा
                </h1>
                <p className="text-xs text-gray-500">
                  Panchayat Samiti Shirala
                </p>
              </div>
            </Link>

            {/* Desktop Navbar */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <nav
                className="flex items-center space-x-2 bg-gray-100/80 rounded-full px-4 py-2 shadow-inner"
                aria-label="Main navigation"
              >
                <ul className="flex items-center gap-2">
                  {navItems.map((item) => {
                    const active = isItemActive(item, location.pathname);
                    const hasChildren = Array.isArray(item.children);
                    const isExternal =
                      item.path && item.path.startsWith("http");

                    return (
                      <li key={item.label} className="relative group">
                        {/* Parent Item */}
                        {isExternal ? (
                          <a
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                              active
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:text-blue-600 hover:bg-white"
                            }`}
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            to={item.path}
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                              active
                                ? "bg-blue-600 text-white"
                                : "text-gray-600 hover:text-blue-600 hover:bg-white"
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}

                        {/* Submenu */}
                        {hasChildren && (
                          <ul
                            ref={(el) => (submenuRefs.current[item.path] = el)}
                            className="absolute left-0 mt-2 min-w-[14rem] bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                          >
                            {item.children.map((sub) => {
                              const subActive =
                                location.pathname === sub.path;
                              const isExternalSub =
                                sub.path.startsWith("http");

                              return (
                                <li key={sub.label}>
                                  {isExternalSub ? (
                                    <a
                                      href={sub.path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`block px-4 py-2 text-sm ${
                                        subActive
                                          ? "text-blue-600 font-semibold"
                                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                      }`}
                                    >
                                      {sub.label}
                                    </a>
                                  ) : (
                                    <Link
                                      to={sub.path}
                                      className={`block px-4 py-2 text-sm ${
                                        subActive
                                          ? "text-blue-600 font-semibold"
                                          : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                                      }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/grievance"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
              >
                तक्रार
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen((s) => !s)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center">
                  <span
                    className={`bg-gray-800 h-0.5 w-6 rounded-sm ${
                      mobileMenuOpen ? "rotate-45 translate-y-1" : ""
                    }`}
                  />
                  <span
                    className={`bg-gray-800 h-0.5 w-6 rounded-sm my-0.5 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`bg-gray-800 h-0.5 w-6 rounded-sm ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;
