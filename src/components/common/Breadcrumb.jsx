import { Link } from "react-router-dom";
// Assuming you import Lucide icons
import { ChevronRight, Home } from "lucide-react";

function Breadcrumb({ items }) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2">
        {/* --- Home Link --- */}
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="text-gray-500 hover:text-teal-600 text-sm p-1 rounded-md transition duration-200"
            aria-label="मुखपृष्ठ"
          >
            <Home className="w-4 h-4" /> {/* Use Home icon */}
          </Link>
        </li>

        {/* --- Dynamic Items --- */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {/* Separator Icon */}
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />

              <div className="flex items-center">
                {item.href && !isLast ? (
                  // Link item (Intermediate path)
                  <Link
                    to={item.href}
                    className="ml-1 text-gray-700 hover:text-teal-600 text-sm font-medium transition duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  // Current/Active item (Last path)
                  <span className="ml-1 text-gray-600 text-sm font-semibold">
                    {item.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
