// frontend/src/pages/News/News.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import SearchBar from "../../components/common/SearchBar";
import { supabase } from "../../services/supabaseClient";

function News() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageModal, setImageModal] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (!error) setNews(data);
      setLoading(false);
    }

    fetchNews();

    const channel = supabase
      .channel("realtime-news")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "news" },
        (payload) => {
          setNews((prev) => {
            if (payload.eventType === "INSERT") return [payload.new, ...prev];
            if (payload.eventType === "UPDATE")
              return prev.map((n) =>
                n.id === payload.new.id ? payload.new : n
              );
            if (payload.eventType === "DELETE")
              return prev.filter((n) => n.id !== payload.old.id);
            return prev;
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const filteredNews = news.filter(
    (n) =>
      n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const breadcrumbs = [{ label: "बातम्या", href: null }];

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        Loading news...
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="बातम्या"
        subtitle="Latest news, announcements and updates"
        breadcrumbs={breadcrumbs}
      />

      <div className="container py-12">
        {/* Search */}
        <div className="mb-12 flex justify-center px-4">
          <div className="w-full max-w-lg">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search news by title..."
            />
          </div>
        </div>

        {filteredNews.length > 0 ? (
          <div className="grid gap-6">
            {filteredNews.map((n) => (
              <Card key={n.id} hover>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <span className="text-gray-500 text-sm">
                        {new Date(n.published_at).toLocaleDateString()}
                      </span>

                      <h2 className="text-xl font-semibold mb-3 hover:text-primary transition-colors">
                        <Link to={`/news/${n.id}`}>{n.title}</Link>
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {n.summary}
                      </p>

                      <Link
                        to={`/news/${n.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        संपूर्ण बातमी वाचा...
                      </Link>
                    </div>

                    {n.image_url ? (
                      <img
                        src={n.image_url}
                        alt=""
                        className="w-full md:w-64 h-48 object-cover rounded-lg cursor-pointer"
                        onClick={() => setImageModal(n.image_url)}
                      />
                    ) : (
                      <div className="w-full md:w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          News Image
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">No news found</div>
        )}
      </div>

      {/* Full Image Modal */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setImageModal(null)}
        >
          <img
            src={imageModal}
            alt="Full Image"
            className="max-w-full max-h-full rounded-xl shadow-lg"
          />
        </div>
      )}
    </div>
  );
}

export default News;
