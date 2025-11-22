import React, { useState, useEffect } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

function Hero() {
  const villageImages = [
    {
      url: "https://res.cloudinary.com/dhgwquxar/image/upload/01_2_11zon_qcts1w.webp",
    },
    {
      url: "https://res.cloudinary.com/dhgwquxar/image/upload/02_4_11zon_ooet4h.webp",
    },
    {
      url: "https://res.cloudinary.com/dhgwquxar/image/upload/03_1_11zon_audadh.webp",
    },
    {
      url: "https://res.cloudinary.com/dhgwquxar/image/upload/04_5_11zon_lhdrkk.webp",
    },
    {
      url: "https://res.cloudinary.com/dhgwquxar/image/upload/05_3_11zon_zqdbzx.webp",
    },
    {
      url: "https://res.cloudinary.com/dhgwquxar/image/upload/06_6_11zon_bcns2k.webp",
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (isPlaying && villageImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === villageImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentImageIndex, isPlaying, villageImages.length]);

  const goToSlide = (index) => setCurrentImageIndex(index);
  const goToPrevious = () =>
    setCurrentImageIndex(
      currentImageIndex === 0 ? villageImages.length - 1 : currentImageIndex - 1
    );
  const goToNext = () =>
    setCurrentImageIndex(
      currentImageIndex === villageImages.length - 1 ? 0 : currentImageIndex + 1
    );

  const ControlButton = ({ onClick, children, ariaLabel, className = "" }) => (
    <button
      onClick={onClick}
      className={`bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300 shadow-2xl border border-white/30 active:scale-95 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );

  return (
    <section
      className="relative w-full 
    h-[380px]       /* mobile: reduced height */
    md:h-[480px]    /* tablet */
    lg:h-[650px]    /* desktop same */
    xl:h-[750px] 
    overflow-hidden"
    >
      <div className="absolute inset-0">
        {villageImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={`ग्रामपंचायत ढोलेवाडी दृश्य ${index + 1}`}
              className="w-full h-full object-fill"
              loading={index === 0 ? "eager" : "lazy"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/1200x800/297274/FFFFFF?text=Dholewadi";
              }}
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white pt-16 md:pt-0">
              <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
                <span className="inline-block leading-snug whitespace-nowrap py-1 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  आपले गाव
                </span>
                <br />
                <span className="inline-block leading-snug whitespace-nowrap py-1 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                  आपली ग्रामपंचायत
                </span>
                <span className="block mt-2 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white">
                  ढोलेवाडी
                </span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                ग्रामपंचायतीच्या
                <span className="text-yellow-400 font-semibold drop-shadow-md">
                  {" "}
                  डिजिटल सेवांमध्ये{" "}
                </span>
                आपले स्वागत. शासकीय सेवा मिळवा, माहिती जाणून घ्या आणि
                ग्रामपंचायतीशी सहज संपर्क ठेवा.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 hidden md:block">
        <ControlButton onClick={goToPrevious}>
          <ChevronLeft className="w-6 h-6" />
        </ControlButton>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 hidden md:block">
        <ControlButton onClick={goToNext}>
          <ChevronRight className="w-6 h-6" />
        </ControlButton>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <ControlButton onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </ControlButton>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {villageImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-200 shadow-md ${
              index === currentImageIndex
                ? "bg-white scale-125 ring-2 ring-yellow-400 ring-offset-2 ring-offset-black/20"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
