import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Assuming these UI components are imported from their respective paths
import Card from "../../components/ui/Card";
// Importing Lucide icons for visual enhancement
import { Newspaper, Clock, ArrowRight, Zap } from "lucide-react";
import { supabase } from "../../services/supabaseClient";

function NewsHighlights() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define color classes for consistent styling
  const primaryGradientClip =
    "bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent";

  // ✅ Fetch latest news (3 items) and set up real-time subscription
  useEffect(() => {
    setLoading(true);
    async function fetchNews() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (!error) setNews(data || []);
      setLoading(false);
    }

    fetchNews();

    // ✅ Realtime subscription
    const channel = supabase
      .channel("news-highlights")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "news" },
        (payload) => {
          setNews((prev) => {
            // Simple update logic for the top 3 items
            if (payload.eventType === "INSERT")
              return [payload.new, ...prev].slice(0, 3);
            if (payload.eventType === "UPDATE")
              return prev.map((n) =>
                n.id === payload.new.id ? payload.new : n
              );
            // Re-fetch everything on delete to ensure the limit of 3 is met correctly
            if (payload.eventType === "DELETE") {
              fetchNews();
              return prev.filter((n) => n.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* --- Section Header (Enhanced Styling) --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-teal-600/10 rounded-full px-6 py-2 mb-4">
            <Newspaper className="w-4 h-4 mr-2 text-teal-700" />
            <span className="font-semibold text-teal-700">
               ताज्या बातम्या
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            बातम्या आणि <span className={primaryGradientClip}>अद्यतने</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ग्रामपंचायत ढोलेवाडी कडील ताज्या बातम्या आणि घोषणांसह अद्ययावत रहा.
          </p>
        </div>

        {/* --- News Grid --- */}
        {loading ? (
          <div className="text-center py-12 text-teal-600">
            <svg
              className="animate-spin h-8 w-8 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-3">Loading news...</p>
          </div>
        ) : news.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div key={item.id}>
                {/* Use enhanced Card component with hover effect */}
                <Card
                  hover
                  className="h-full group transition-all duration-300"
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Date and Tag */}
                    <div className="flex items-center gap-3 mb-3 border-b pb-3">
                      <Clock className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <span className="text-gray-500 text-sm font-medium">
                        {new Date(item.published_at).toLocaleDateString(
                          "mr-IN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      {/* Optional: Add a small 'New' tag for very recent posts */}
                      {index === 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-bold ml-auto">
                          नवीन
                        </span>
                      )}
                    </div>

                    {/* Title and Summary */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                      {item.summary || "वर्णन उपलब्ध नाही."}
                    </p>

                    {/* Read More Link */}
                    <Link
                      to={`/news/${item.id}`}
                      className="mt-auto inline-flex items-center text-teal-600 hover:text-teal-800 font-semibold text-sm transition-colors duration-300"
                    >
                      अधिक वाचा
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-100 rounded-xl shadow-inner text-gray-600">
            <Newspaper className="w-8 h-8 mx-auto mb-3 text-teal-400" />
            <p className="font-medium">
               अद्याप कोणत्याही बातम्या उपलब्ध नाहीत.
            </p>
            <p className="text-sm mt-1">
              ग्रामपंचायत लवकरच नवीन घोषणा प्रकाशित करेल.
            </p>
          </div>
        )}

        {/* --- View All News Link (Enhanced Styling) --- */}
        <div className="text-center mt-12">
          <Link
            to="/news"
            className="inline-flex items-center text-teal-600 hover:text-teal-800 font-bold transition duration-300 border-b-2 border-teal-200 hover:border-teal-400 pb-1"
          >
            सर्व बातम्या पहा
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NewsHighlights;
