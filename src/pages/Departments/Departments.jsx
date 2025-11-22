import React, { useState } from "react";
import { Link } from "react-router-dom";
// Lucide icons
import {
  ChevronDown,
  Users,
  Settings,
  HeartHandshake,
  Wrench,
  Brush,
  Shield,
  User,
  Check,
  Briefcase,
} from "lucide-react";

// 🚨 Assuming these components are the enhanced, centralized versions
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
// Note: Removed local Card and PageHeader definitions

// --- Committee Data from Document (No Change) ---
const committeesData = [
  {
    name: "ग्राम आरोग्य पोषण, पाणीपुरवठा व स्वच्छता समिती",
    members: [
      {
        id: 1,
        name: "श्री. रणजीत सर्जेराव मोरे",
        designation: "सरपंच",
        role: "अध्यक्ष",
      },
      {
        id: 2,
        name: "सौ. सविता मारुती मोरे",
        designation: "आशा",
        role: "सचिव",
      },
      {
        id: 3,
        name: "श्रीमती. सुधाताई बबन यादव",
        designation: "अंगणवाडी सेविका",
        role: "सदस्या",
      },
      {
        id: 4,
        name: "सौ. अर्चना नानासो साळुंखे",
        designation: "C.R.P.",
        role: "सदस्या",
      },
      {
        id: 5,
        name: "सौ. तेजस्वीनी संदीप जाधव",
        designation: "महिला सदस्या",
        role: "सदस्या",
      },
      {
        id: 6,
        name: "सौ. शारदा बाजीराव मोरे",
        designation: "महिला सदस्या",
        role: "सदस्या",
      },
      {
        id: 7,
        name: "श्री. आप्पासो सोपान मोरे",
        designation: "पुरुष सदस्य",
        role: "सदस्य",
      },
      {
        id: 8,
        name: "श्री. संजय वसंत मोरे",
        designation: "पा.पु. कर्मचारी",
        role: "सदस्य",
      },
      {
        id: 9,
        name: "श्री. अमित वसंत पवार",
        designation: "मनरेगा समन्वयक",
        role: "सदस्य",
      },
      {
        id: 10,
        name: "सौ. शुभांगी संजय पवार",
        designation: "बचत गट",
        role: "सदस्या",
      },
      {
        id: 11,
        name: "श्री. सुरज सुनिल ढोले",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
    ],
    icon: HeartHandshake, // Health & Welfare Icon
  },
  {
    name: "बांधकाम समिती",
    members: [
      {
        id: 1,
        name: "श्री. रणजीत सर्जेराव मोरे",
        designation: "सरपंच",
        role: "अध्यक्ष",
      },
      {
        id: 2,
        name: "श्री. माणिक राजाराम पाटील",
        designation: "ग्रामसेवक",
        role: "सचिव",
      },
      {
        id: 3,
        name: "श्री. सुनिल आनंदा मोरे",
        designation: "अभियंता",
        role: "सदस्य",
      },
      {
        id: 4,
        name: "श्री. संदीप बाबुराव मोरे",
        designation: "कुशल मजूर",
        role: "सदस्य",
      },
    ],
    icon: Wrench, // Construction Icon
  },
  {
    name: "कला/क्रीडा/सांस्कृतिक/पर्यटन समिती",
    members: [
      {
        id: 1,
        name: "सुरज सुनिल ढोले",
        designation: "ग्रामस्थ",
        role: "अध्यक्ष",
      },
      {
        id: 2,
        name: "विनायक भानुदास मोरे",
        designation: "ग्रामस्थ",
        role: "उप अध्यक्ष",
      },
      {
        id: 3,
        name: "उदय महादेव मोरे",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
      {
        id: 4,
        name: "महादेव शिवाजी मोरे",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
      {
        id: 5,
        name: "सुहास दिनकर साळुंखे",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
      {
        id: 6,
        name: "नानासो शिवाजी साळुंखे",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
      { id: 7, name: "महेश बाळू मोरे", designation: "ग्रामस्थ", role: "सदस्य" },
      { id: 8, name: "मनोज गोरख मोरे", designation: "ग्रामस्थ", role: "सदस्य" },
      {
        id: 9,
        name: "दिग्विजय दिलीप मोरे",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
      {
        id: 10,
        name: "प्रविण बाळकृष्ण मोरे",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
      {
        id: 11,
        name: "प्रसाद रविकांत नायकवडी",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
      {
        id: 12,
        name: "सर्वजित दिलीप मोरे",
        designation: "ग्रामस्थ",
        role: "सदस्य",
      },
    ],
    icon: Brush, // Culture/Arts Icon
  },
  {
    name: "तंटामुक्ती समिती",
    members: [
      { id: 1, name: "श्री. सुरेश तानाजी मोरे", role: "अध्यक्ष" },
      { id: 2, name: "श्री. बाबासो भगवान मोरे", role: "उप अध्यक्ष" },
      { id: 3, name: "श्री. अमृत आण्णा मोरे", role: "पोलीस पाटील" },
      { id: 4, name: "श्री. राजेश बाजीराव पाटील", role: "सदस्य" },
      { id: 5, name: "श्री. अतुल शिवाजी मोरे", role: "सदस्य" },
      { id: 6, name: "सौ. शारदा बाजीराव मोरे", role: "सदस्य" },
      { id: 7, name: "श्री. शिवाजी रघुनाथ मोरे", role: "सदस्य" },
      { id: 8, name: "श्री. उत्तम तुकाराम मोरे", role: "सदस्य" },
      { id: 9, name: "श्री. सुनिल आनंदा मोरे", role: "सदस्य" },
      { id: 10, name: "श्री. सुनिल तुकाराम ढोले", role: "सदस्य" },
      { id: 11, name: "श्री. आप्पासो दादू ढोले", role: "सदस्य" },
    ],
    icon: Shield, // Conflict Resolution Icon
  },
];

// --- Main Component ---
function Departments() {
  const [selectedCommittee, setSelectedCommittee] = useState(committeesData[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // 🎯 Breadcrumb Fix: Home > समित्या
  const breadcrumbs = [
    { label: "समित्या", href: null }, // Page title will be the final crumb
  ];

  // --- Dropdown Logic (Mouse Hover) ---
  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms delay before closing
    setTimeoutId(newTimeoutId);
  };

  // --- Dropdown Logic (Click/Select) ---
  const handleCommitteeSelect = (committee) => {
    setSelectedCommittee(committee);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Enhanced Page Header */}
      <PageHeader
        title="ग्रामपंचायत समित्या"
        subtitle="गावाच्या विकासासाठी कार्यरत असलेल्या विविध समित्या."
        breadcrumbs={breadcrumbs}
        icon={Users} // Use an appropriate icon
      />

      <div className="container mx-auto py-12 px-4 space-y-10">
        {/* 2. Dropdown Menu (Committee Selector) */}
        <div
          className="relative inline-block text-left w-full md:w-96"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Selected Button (Enhanced Styling) */}
          <div>
            <button
              type="button"
              className="inline-flex justify-between items-center w-full rounded-xl border border-gray-300 shadow-lg px-6 py-3 bg-white text-base font-semibold text-teal-700 hover:bg-teal-50 focus:outline-none focus:ring-4 focus:ring-teal-200 transition duration-150"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle on click for mobile/touch
            >
              <span className="truncate">{selectedCommittee.name}</span>
              <ChevronDown
                className={`-mr-1 ml-3 h-5 w-5 transition-transform duration-200 ${
                  isDropdownOpen
                    ? "transform rotate-180 text-teal-600"
                    : "text-gray-500"
                }`}
              />
            </button>
          </div>

          {/* Dropdown Options (Enhanced Styling) */}
          {isDropdownOpen && (
            <div
              className="origin-top-left absolute left-0 mt-2 w-full md:w-96 rounded-xl shadow-2xl bg-white ring-1 ring-black/10 z-20 overflow-hidden"
              style={{ maxHeight: "400px", overflowY: "auto" }} // Scrollable list for many committees
            >
              <div className="py-1" role="menu" aria-orientation="vertical">
                {committeesData.map((committee, index) => (
                  <a
                    href="#"
                    key={index}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition duration-150 border-b border-gray-100 last:border-b-0 flex items-center"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCommitteeSelect(committee);
                    }}
                  >
                    <committee.icon className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
                    {committee.name}
                    {selectedCommittee.name === committee.name && (
                      <Check className="w-5 h-5 ml-auto text-teal-600" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Selected Committee Chart (Enhanced Table UI) */}
        {selectedCommittee && (
          <Card shadow="lg">
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 flex items-center">
                <selectedCommittee.icon className="w-6 h-6 mr-3 text-teal-600" />
                {selectedCommittee.name} - सदस्य यादी
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-teal-50 border-b-2 border-teal-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">
                        अ.क्र.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">
                        नाव
                      </th>
                      {/* Check if the first member has a 'designation' property to decide column visibility */}
                      {selectedCommittee.members[0].designation !==
                        undefined && (
                        <th className="px-6 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider hidden sm:table-cell">
                          मूळ पदनाम
                        </th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-bold text-teal-700 uppercase tracking-wider">
                        समितीतील भूमिका
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedCommittee.members.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-teal-50/50 transition duration-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {member.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                          {member.name}
                        </td>
                        {/* Conditional rendering for Designation column data */}
                        {member.designation !== undefined && (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">
                            {member.designation}
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              member.role === "अध्यक्ष"
                                ? "bg-indigo-100 text-indigo-700"
                                : member.role === "सचिव"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {member.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Fallback Message */}
        {!selectedCommittee && (
          <Card shadow="lg">
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">
                कृपया वर दिलेल्या ड्रॉपडाउनमधून पाहण्यासाठी एक समिती निवडा.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Departments;
