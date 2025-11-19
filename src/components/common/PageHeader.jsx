import React from "react";
import Breadcrumb from "./Breadcrumb";
// Assuming you have Lucide icons available
import { FileText, ArrowRight } from "lucide-react";

function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  children,
  icon: Icon = FileText, // Default icon for a modern look
}) {
  // Determine the subtitle text content
  const finalSubtitle =
    subtitle ||
    (title ? `Information and details for ${title}` : "Welcome to our portal.");

  return (
    // Outer container for the full-width background effect
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- BREADCRUMB / ACTION BAR --- */}
        <div className="p-4 sm:p-6 flex justify-between items-center bg-white">
          {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
          {children}
        </div>
        {/* --- HEADER BLOCK: Styled with Gradient, Shadow, and Rounded Corners --- */}
        <div className="max-w-full mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <header className="relative bg-gradient-to-r from-teal-600 to-cyan-700 p-8 sm:p-12 text-center text-white">
            {/* Background Overlay for depth */}
            <div className="absolute inset-0 opacity-10"></div>

            <div className="relative z-10">
              {/* Icon Circle (Optional but adds flair) */}
              {Icon && (
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 p-3 rounded-full shadow-inner">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">{title}</h1>

              {/* Subtitle (Using remembered location for personalization) */}
              <p className="text-teal-100 text-lg">
                {finalSubtitle} - ग्रामपंचायत ढोलेवाडी
              </p>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
