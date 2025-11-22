// Officers.js
import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import { mockData } from "../../data/mockData";

// Category Constants (Prevents Spelling Errors)
const CATEGORIES = {
  DIGNITARIES: "DIGNITARIES",
  HONORABLE: "HONORABLE OFFICER",
  SADASYA: "PANCHAYAT SAMITI SADASYA",
  SAMITI_OFFICER: "PANCHAYAT SAMITI OFFICER",
  TIMELINE: "PANCHAYAT SAMITI OFFICER TIMELINE",
};

function Officers() {
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.DIGNITARIES
  );

  const breadcrumbs = [{ label: "Officers", href: null }];

  // Mapping dropdown selection to correct mockData list
  const categoryMap = {
    [CATEGORIES.DIGNITARIES]: mockData.dignitaries,
    [CATEGORIES.HONORABLE]: mockData.honorableOfficers,
    [CATEGORIES.SAMITI_OFFICER]: mockData.officers,
    [CATEGORIES.TIMELINE]: mockData.timeline,
    [CATEGORIES.SADASYA]: mockData.sadasya,
  };

  const officersList = categoryMap[selectedCategory] || [];

  return (
    <div>
      <PageHeader
        title="अधिकारी निर्देशिका"
        subtitle="मान्यवर अधिकारी"
        breadcrumbs={breadcrumbs}
      />

      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        {/* Dropdown Selector */}
        <div className="mb-8 flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4">
          <label
            htmlFor="officer-category"
            className="block text-sm font-medium text-gray-700 sm:hidden"
          >
            श्रेणी निवडा:
          </label>

          <select
            id="officer-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto border px-4 py-3 rounded-md text-sm md:text-base bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm transition-all duration-200"
          >
            <option value={CATEGORIES.DIGNITARIES}>मान्यवर</option>
            <option value={CATEGORIES.HONORABLE}>
              गटविकास अधिकारी, पंचायत समिती शिराळा
            </option>
            <option value={CATEGORIES.SADASYA}>
              ढोलेवाडी ग्रामपंचायत सदस्य
            </option>
            <option value={CATEGORIES.SAMITI_OFFICER}>
              ढोलेवाडी ग्रामपंचायत कर्मचारी
            </option>
            <option value={CATEGORIES.TIMELINE}>
              ग्रामपंचायत अधिकारी, सरपंच, उपसरपंच, सदस्य कारकीर्द
            </option>
          </select>
        </div>

        {/* Timeline PDF Button */}
        {selectedCategory === CATEGORIES.TIMELINE ? (
          <div className="flex justify-center">
            <a
              href="/files/panchayat-timeline.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary text-white text-base md:text-lg font-medium rounded-xl shadow hover:bg-primary-dark transition-colors text-center"
            >
              📑 ग्रामपंचायत निहाय ग्रामपंचायत सरपंच व उपसरपंच व ग्रामसेवक
              कारकीर्द
            </a>
          </div>
        ) : officersList.length === 0 ? (
          // No Data UI
          <div className="text-center text-gray-500 text-lg py-10">
            माहिती उपलब्ध नाही
          </div>
        ) : (
          // Officer Cards
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {officersList.map((officer) => (
              <Card key={officer.id} className="hover-lift">
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    {officer.image && (
                      <img
                        src={officer.image}
                        alt={officer.name}
                        className="w-[220px] h-[320px] sm:w-[250px] sm:h-[350px] rounded-xl mb-3 object-cover border officer-img"
                      />
                    )}
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {officer.name}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">
                      {officer.designation}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {officer.department}
                    </p>

                    {/* Only show Call/Email for Panchayat Samiti Employees */}
                    {selectedCategory === CATEGORIES.SAMITI_OFFICER && (
                      <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                        {officer.phone && (
                          <a
                            href={`tel:${officer.phone}`}
                            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors w-full sm:w-auto"
                          >
                            📞 Call
                          </a>
                        )}
                        {officer.email && (
                          <a
                            href={`mailto:${officer.email}`}
                            className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors w-full sm:w-auto"
                          >
                            ✉️ Email
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Officers;
