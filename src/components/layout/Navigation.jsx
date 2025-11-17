import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "मुख्यपृष्ठ", path: "/" },
  {
    label: "माहिती",
    children: [
      { label: "माहिती", path: "/about" },
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
      {
        label: "महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी योजना",
        path: "/mgnrega",
      },
      { label: "प्रधानमंत्री मातृ वंदना योजना", path: "/PMMVY" },
    ],
  },
  {
    label: "लाभार्थी योजना",
    children: [
      { label: "मनरेगा", path: "/mnrega" },
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
  { label: "समिती", path: "/departments" },
  { label: "सेवा", path: "/services" },
  { label: "बातम्या", path: "/news" },
  {
    label: "शासन",
    children: [
      { label: "माहितीचा अधिकार", path: "/rti" },
      { label: "आर.पी.एस.ए.", path: "/rpa" },
    ],
  },
  { label: "ई-गव्हर्नन्स धोरण", path: "/e-governance" },
  { label: "संपर्क", path: "/contact" },
  {
    label: "वापरकर्ता सेवा",
    children: [{ label: "अर्ज ट्रॅक करा", path: "/services/track" }],
  },
];

// Helper: format labels for camelCase etc.
const formatLabel = (label) => {
  if (label === "rti" || label === "rpsa") return label.toUpperCase();
  const result = label.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

// Utility: check if item (or its children) is active
const isItemActive = (item, pathname) => {
  if (item.path === pathname) return true;
  if (Array.isArray(item.children)) {
    return item.children.some((child) => child.path === pathname);
  }
  return false;
};

function Navigation() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Delayed close (prevents flicker when moving between menu & submenu)
  const handleMouseLeave = (label) => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
    }, 200);
  };

  const handleMouseEnter = (label) => {
    clearTimeout(closeTimeoutRef.current);
    setOpenDropdown(label);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex items-center flex-1" // <-- MODIFIED
      aria-label="Main Navigation"
      role="menubar"
    >
      <ul className="flex items-center justify-center flex-wrap gap-2 w-full">
        {" "}
        {/* <-- MODIFIED */}
        {navItems.map((item) => {
          const active = isItemActive(item, location.pathname);
          const hasChildren = Array.isArray(item.children);

          return (
            <li
              key={item.label}
              className="relative"
              role="none"
              onMouseEnter={() => hasChildren && handleMouseEnter(item.label)}
              onMouseLeave={() => hasChildren && handleMouseLeave(item.label)}
            >
              {/* --- Parent without dropdown --- */}
              {!hasChildren ? (
                item.path.startsWith("http") ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-md border-b-2 ${
                      active
                        ? "text-primary border-primary bg-primary/5"
                        : "text-gray-700 border-transparent hover:text-primary hover:border-primary/50 hover:bg-gray-50"
                    }`}
                  >
                    {formatLabel(item.label)}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-md border-b-2 ${
                      active
                        ? "text-primary border-primary bg-primary/5"
                        : "text-gray-700 border-transparent hover:text-primary hover:border-primary/50 hover:bg-gray-50"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {formatLabel(item.label)}
                    {active && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                        aria-hidden="true"
                      ></span>
                    )}
                  </Link>
                )
              ) : (
                /* --- Parent with dropdown --- */
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      )
                    }
                    className={`relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-md border-b-2 ${
                      active
                        ? "text-primary border-primary bg-primary/5"
                        : "text-gray-700 border-transparent hover:text-primary hover:border-primary/50 hover:bg-gray-50"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                  >
                    {formatLabel(item.label)}
                    <ChevronDown
                      className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                        openDropdown === item.label
                          ? "rotate-180 text-primary"
                          : "text-gray-500 group-hover:text-primary"
                      }`}
                    />
                    {active && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                        aria-hidden="true"
                      ></span>
                    )}
                  </button>

                  {/* Dropdown menu */}
                  {openDropdown === item.label && (
                    <ul
                      onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
                      onMouseLeave={() => handleMouseLeave(item.label)}
                      className="absolute left-0 mt-2 min-w-[18rem] max-w-sm bg-white border border-gray-100 rounded-md shadow-lg transition-all duration-200 z-50 animate-fade-in"
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      {item.children.map((sub) => {
                        const subActive = location.pathname === sub.path;
                        const isExternal = sub.path.startsWith("http");
                        return (
                          <li key={sub.label} role="none">
                            {isExternal ? (
                              <a
                                href={sub.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeAllDropdowns}
                                role="menuitem"
                                className={`block px-4 py-2 text-sm transition-colors whitespace-normal break-words ${
                                  subActive
                                    ? "text-primary font-semibold bg-primary/5"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                                }`}
                              >
                                {sub.label}
                              </a>
                            ) : (
                              <Link
                                to={sub.path}
                                onClick={closeAllDropdowns}
                                role="menuitem"
                                className={`block px-4 py-2 text-sm transition-colors whitespace-normal break-words ${
                                  subActive
                                    ? "text-primary font-semibold bg-primary/5"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
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
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
