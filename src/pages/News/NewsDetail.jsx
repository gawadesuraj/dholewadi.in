<<<<<<< HEAD
import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/ui/Card'
import { supabase } from '../../services/supabaseClient'

function NewsDetail() {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [related, setRelated] = useState([])
  const [showImageModal, setShowImageModal] = useState(false)
=======
// frontend/src/pages/News/NewsDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import { supabase } from "../../services/supabaseClient";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [related, setRelated] = useState([]);
  const [imageModal, setImageModal] = useState(null);
>>>>>>> 8250f81e779a44d93e736ef3b582dfcf96ddc997

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
<<<<<<< HEAD
        .from('news')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) {
        setNews(data)

        const { data: rel } = await supabase
          .from('news')
          .select('*')
          .neq('id', id)
          .eq('category', data.category)
          .limit(3)

        setRelated(rel || [])
=======
        .from("news")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) {
        setNews(data);
        const { data: rel } = await supabase
          .from("news")
          .select("*")
          .neq("id", id)
          .eq("category", data.category)
          .limit(3);
        setRelated(rel || []);
>>>>>>> 8250f81e779a44d93e736ef3b582dfcf96ddc997
      }
    }
    fetchNews();
  }, [id]);

  if (!news)
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">News not found</h1>
        <Link to="/news" className="text-primary hover:underline">
<<<<<<< HEAD
          ← Back to News
        </Link>
      </div>
    )

  const breadcrumbs = [
    { label: 'News', href: '/news' },
    { label: news.title.substring(0, 50) + '...', href: null }
  ]
=======
          ← मागे या
        </Link>
      </div>
    );
>>>>>>> 8250f81e779a44d93e736ef3b582dfcf96ddc997

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: "बातम्या", href: "/news" },
          { label: news.title.substring(0, 50) + "...", href: null },
        ]}
      />

      <div className="container py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <article className="lg:col-span-3">
            <Card>
              <div className="p-8">
<<<<<<< HEAD
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    {news.category && (
                      <span className="bg-primary text-white text-sm px-3 py-1 rounded-full capitalize">
                        {news.category}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">
                      {new Date(news.published_at).toLocaleDateString()}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold mb-4 leading-tight">
                    {news.title}
                  </h1>

                  {news.summary && (
                    <p className="text-xl text-gray-600 leading-relaxed notranslate">
                      {news.summary}
                    </p>
                  )}
                </div>
=======
                <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                <p className="text-gray-600 mb-6">{news.summary}</p>
>>>>>>> 8250f81e779a44d93e736ef3b582dfcf96ddc997

                {/* IMAGE WITH MODAL */}
                {news.image_url && (
<<<<<<< HEAD
                  <>
                    <img
                      src={news.image_url}
                      alt=""
                      onClick={() => setShowImageModal(true)}
                      className="w-full h-64 object-cover rounded-lg mb-8 cursor-pointer"
                    />

                    {showImageModal && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                        onClick={() => setShowImageModal(false)}
                      >
                        <img
                          src={news.image_url}
                          alt="Full"
                          className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                      </div>
                    )}
                  </>
                )}

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {news.content?.split('\n').map((p, i) => (
=======
                  <img
                    src={news.image_url}
                    alt=""
                    className="w-full h-72 object-cover rounded-lg cursor-pointer mb-8"
                    onClick={() => setImageModal(news.image_url)}
                  />
                )}

                <div className="prose max-w-none">
                  {news.content?.split("\n").map((p, i) => (
>>>>>>> 8250f81e779a44d93e736ef3b582dfcf96ddc997
                    <p key={i}>{p}</p>
                  ))}
                </div>

<<<<<<< HEAD
                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Published on {new Date(news.published_at).toLocaleString()}
                    </span>
                    <Link to="/news" className="text-primary hover:underline">
                      ← Back to News
                    </Link>
                  </div>
=======
                <div className="mt-8 text-gray-500 text-sm">
                  प्रकाशित:
                  {new Date(news.published_at).toLocaleString()}
>>>>>>> 8250f81e779a44d93e736ef3b582dfcf96ddc997
                </div>
              </div>
            </Card>
          </article>

          <aside className="space-y-6">
            {related.length > 0 && (
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Related News</h3>
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/news/${r.id}`}
                      className="block mb-3 hover:text-primary"
                    >
                      {r.title}
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </aside>
        </div>
      </div>

      {/* Full Screen Image Preview */}
      {imageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setImageModal(null)}
        >
          <img
            src={imageModal}
            alt="Full View"
            className="max-w-full max-h-full rounded-xl"
          />
        </div>
      )}
    </div>
  );
}

export default NewsDetail;
