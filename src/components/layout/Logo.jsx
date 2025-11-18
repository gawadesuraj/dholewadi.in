import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Import your image here
import yourLogoImage from "../../assets/grampanchayat.png";

function Logo() {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      className="flex items-center gap-3 group flex-shrink-0 hover:opacity-90 transition-opacity"
      aria-label={t("header.siteName")}
    >
      {/* Government Emblem Wrapper */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
        {/* Tricolor Gradient Border Ring */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-500 via-white to-green-600 shadow-md p-[3px]">
          {/* Inner White Circle Container */}
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
            {/* The Image */}
            <img
              src={yourLogoImage}
              alt={t("header.siteName")}
              className="w-full h-full object-contain p-1"
              // ^ object-contain ensures the whole logo fits.
              // ^ p-1 adds a tiny breathing room so logo doesn't touch the edges.
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Logo;
