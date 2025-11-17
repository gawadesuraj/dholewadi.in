/* eslint-disable no-unused-vars */
// MobileMenu.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ---------- MENU DATA (Translated to Marathi) ----------
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
  { label: "विभाग", path: "/departments" },
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

// ---------- COMPONENT ----------
function MobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState(new Set());

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) newSet.delete(label);
      else newSet.add(label);
      return newSet;
    });
  };

  const handleCloseAll = () => {
    setOpenSubmenus(new Set());
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Hide scrollbar */}
          <style>{`
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {/* Dim Background */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAll}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 w-72 sm:w-80 h-full bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">मेनू</h2>
              <button
                onClick={handleCloseAll}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-5 hide-scrollbar">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const hasChildren = Array.isArray(item.children);
                  const isSubmenuOpen = openSubmenus.has(item.label);

                  return (
                    <li key={item.path || item.label}>
                      {hasChildren ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(item.label)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-base font-medium ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-gray-800 hover:bg-gray-100"
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                isSubmenuOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {/* Submenu */}
                          <AnimatePresence>
                            {isSubmenuOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pl-6 mt-1 border-l border-gray-200"
                              >
                                {item.children.map((sub) => {
                                  const isSubActive =
                                    location.pathname === sub.path;
                                  return (
                                    <li key={sub.path}>
                                      <Link
                                        to={sub.path}
                                        onClick={handleCloseAll}
                                        className={`block px-3 py-2 rounded-md text-sm ${
                                          isSubActive
                                            ? "text-primary font-semibold"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        // Simple Item
                        <Link
                          to={item.path}
                          onClick={handleCloseAll}
                          className={`block px-4 py-3 rounded-md text-base ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA BUTTONS (Translated) */}
            <div className="border-t border-gray-200 p-5 space-y-3">
              <Link
                to="/grievance"
                onClick={handleCloseAll}
                className="block w-full text-center px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
              >
                तक्रार नोंदवा
              </Link>

              <Link
                to="/services"
                onClick={handleCloseAll}
                className="block w-full text-center px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md"
              >
                सेवा पहा
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
