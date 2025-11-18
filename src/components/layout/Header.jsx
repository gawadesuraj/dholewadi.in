/* eslint-disable no-unused-vars */
// FILE: src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Changed from "react-i18next"
import { useTranslation } from "react-i18next";
import TopBar from "./TopBar";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

// CTA Buttons
const CtaButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 ">
      {/* Grievance */}
      <Link
        to="/grievance"
        className="flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        {t("तक्रार नोंदवा")}
      </Link>

      {/* Services */}
      <Link
        to="/services"
        className="flex items-center px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        {t("सेवा पहा")}
      </Link>
    </div>
  );
};

// Mobile Menu Button
const MobileMenuButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors flex-shrink-0"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <span
          className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        />
        <span
          className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        />
      </div>
    </button>
  );
};

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Bar */}
      <TopBar />

      {/* Header */}
      <header
        // CHANGED: Removed 'sticky top-0' so it doesn't stick. Added 'relative'.
        className={`relative bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-lg border-b-2 border-gray-200"
            : "shadow-md border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* THIS IS THE FIX:
            'h-20' is changed to 'min-h-20'
            This allows the header to grow vertically if the nav items wrap.
          */}
          <div className="flex items-center justify-between min-h-20 py-2">
            {" "}
            {/* <-- MODIFIED */}
            {/* Logo */}
            <Logo />
            {/* Navigation */}
            <Navigation />
            {/* CTA (desktop) */}
            <CtaButtons />
            {/* Mobile Menu Toggle */}
            <MobileMenuButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            />
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

export default Header;
