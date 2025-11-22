import React, { useState, useEffect } from "react";

// --- Helper Components & Inlined Icons ---

const FaEnvelope = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M48 64C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.5 339.2c-22.8 17.1-54.3 17.1-77.1 0L0 176zM512 112c0-10.9-4.8-20.9-12.7-27.6L278.7 236.4c-13.4 10.1-31.4 10.1-44.8 0L12.7 84.4C4.8 91.1 0 101.1 0 112v1.4L256 261.2 512 113.4V112z"
    />
  </svg>
);

const FaClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
    />
  </svg>
);

// Images
import digitalIndiaLogo from "../../assets/digital-india.png";
import anotherLogo from "../../assets/satyamev-jayate.png";

function TopBar() {
  // *************** REAL TIME CLOCK ***************
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(formatted);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);
  // ************************************************

  return (
    <div className="bg-gradient-to-r from-orange-600 via-white to-green-600 border-b border-gray-200">
      <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            {/* LEFT SIDE */}
            <div className="hidden md:flex items-center space-x-6 text-gray-700">
              
              <a
                href="mailto:gpdholewadi415408@gmail.com"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <FaEnvelope />
                <span>gpdholewadi415408@gmail.com</span>
              </a>

              {/* Office Hours + Real Time Clock */}
              <div className="flex items-center space-x-3 text-gray-600">
                <FaClock />
                <span className="notranslate">
                  सोम - शनि: स. १०:०० - सायं. ०६:०० |{" "}
                  <span className="font-semibold text-black notranslate">
                    {currentTime}
                  </span>
                </span>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center space-x-4 ml-auto">
              <img src={anotherLogo} alt="Satyamev Jayate" className="h-8" />
              <img
                src={digitalIndiaLogo}
                alt="Digital India Logo"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
