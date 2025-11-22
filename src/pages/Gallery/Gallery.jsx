import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
  Suspense,
} from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
// Importing Lucide icons for polished UI
import { Home, ChevronRight, X, ChevronLeft, Zap, Images } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";

// ---------------------- Enhanced Page Header Component ----------------------


// ---------------------- Gallery Component ----------------------
const Gallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [villageImages, setVillageImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbs = useMemo(
    () => [{ label: "छायाचित्र दालन", href: null }],
    []
  );

  // Fetch photos from Supabase
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from("photos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setVillageImages(data || []);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("फोटो लोड करण्यात अक्षम");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Lazy animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(timer);
  }, []);

  // Handlers (memoized)
  const openModal = useCallback((index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedImageIndex(null);
  }, []);

  const showNextImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === null ? 0 : (prev + 1) % villageImages.length
    );
  }, [villageImages.length]);

  const showPrevImage = useCallback(() => {
    setSelectedImageIndex((prev) =>
      prev === null
        ? 0
        : (prev - 1 + villageImages.length) % villageImages.length
    );
  }, [villageImages.length]);

  // Optimized keydown listener (only active when modal is open)
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") showNextImage();
      else if (e.key === "ArrowLeft") showPrevImage();
      else if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, showNextImage, showPrevImage, closeModal]);
  const breadcrumbItems = [{ label: "मुखपृष्ठ", href: "/" }];

  return (
    <div>
      {/* Embedded CSS for animations */}
      <style>{`
				@keyframes bounceIn {
					0% { opacity: 0; transform: translateY(20px) scale(0.98); }
					60% { opacity: 1; transform: translateY(-8px) scale(1.03); }
					80% { transform: translateY(4px) scale(0.99); }
					100% { transform: translateY(0) scale(1); }
				}
				@keyframes hoverBounce {
					0% { transform: scale(1) translateY(0); }
					30% { transform: scale(1.05) translateY(-3px); }
					60% { transform: scale(0.98) translateY(1px); }
					100% { transform: scale(1) translateY(0); }
				}
				.entry-bounce { animation: bounceIn 0.8s cubic-bezier(.215,.61,.355,1) both; will-change: transform, opacity; }
				.hover-bounce:hover { animation: hoverBounce 0.5s ease-in-out; box-shadow: 0 12px 24px rgba(0,0,0,0.25); }
				@media (prefers-reduced-motion: reduce) {
					.entry-bounce, .hover-bounce:hover { animation: none !important; transform: none !important; }
				}
			`}</style>

      {/* Header Updated to Marathi */}
      <PageHeader
        title="छायाचित्र दालन"
        subtitle="ग्रामपंचायत ढोलेवाडीतील खास क्षण आणि आठवणी."
        breadcrumbs={breadcrumbs}
      />

      {/* Gallery Grid */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-10 text-teal-600">
              <Zap className="w-6 h-6 animate-spin mx-auto mb-2" />
              फोटो लोड होत आहेत...
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-600 text-lg">
              {error}
            </div>
          ) : villageImages.length === 0 ? (
            <div className="text-center py-10 text-gray-600 bg-white rounded-xl shadow-lg">
              <Images className="w-8 h-8 mx-auto mb-2 text-teal-400" />
              <p>कोणतेही फोटो उपलब्ध नाहीत</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {villageImages.map((image, index) => {
                const delay = index * 90;
                return (
                  <div
                    key={image.id}
                    className={`group cursor-pointer overflow-hidden rounded-xl shadow-lg relative transition-all duration-300 ease-in-out hover:shadow-2xl hover-bounce border border-gray-200 bg-white
										${mounted ? "entry-bounce" : "opacity-0 translate-y-2"}`}
                    onClick={() => openModal(index)}
                    style={{ animationDelay: `${delay}ms` }}
                  >
                    <img
                      src={image.image_url}
                      alt={image.alt_text || "Gallery image"}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-60 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay to show text/icon on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-base font-semibold px-4 py-2 bg-black/50 rounded-lg">
                        {image.alt_text || "पाहण्यासाठी क्लिक करा"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal / Lightbox */}
        {modalOpen && selectedImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity"
            onClick={closeModal}
          >
            <div
              className="relative p-4 rounded-lg max-w-5xl max-h-[95vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* --- Close Button --- */}
              <button
                onClick={closeModal}
                // Enhanced Glassmorphism Close Button
                className="absolute -top-10 right-0 md:-right-10 md:top-0 z-50 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full p-3 text-white transition shadow-xl border border-white/30"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              {/* --- Image --- */}
              <div className="flex flex-col items-center">
                <img
                  src={villageImages[selectedImageIndex].image_url}
                  alt={
                    villageImages[selectedImageIndex].alt_text ||
                    "Gallery image"
                  }
                  className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl"
                />
                {/* Caption */}
                <p className="mt-4 text-lg font-semibold text-white bg-black/50 px-4 py-2 rounded-xl">
                  {villageImages[selectedImageIndex].alt_text || "छायाचित्र"}
                </p>
              </div>

              {/* --- Prev/Next Buttons --- */}
              <button
                onClick={showPrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition text-white shadow-xl hidden sm:block border border-white/30"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={showNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full transition text-white shadow-xl hidden sm:block border border-white/30"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

// Wrap in Suspense (future-proof for lazy imports)
export default function GalleryWrapper() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-600">लोड होत आहे...</div>
      }
    >
      <Gallery />
    </Suspense>
  );
}
