import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel, { type EmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// WebP optimized images for better performance
const images = [
  "/collection 1.webp",
  "/collection2.jpeg",
  "/collection3.webp",
  "/collection 4.webp",
  "/collection6.webp",
  "/collection7.webp",
  "/collection8.webp"
].sort(() => Math.random() - 0.5); // Shuffle images on load

// Image descriptions for accessibility
const imageDescriptions = [
  "Elegant evening wear showcasing classic fashion",
  "Contemporary fashion design with traditional elements",
  "Sophisticated formal attire collection",
  "Modern interpretation of classic fashion",
  "Timeless fashion pieces in motion",
  "Avant-garde classic fashion designs",
  "Elegant female fashion collection",
  "Classic men's fashion collection"
];

export default function ImageCarousel() {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      duration: 30,
      startIndex: 0,
      dragFree: true,
      containScroll: "trimSnaps",
      direction: "ltr",
      skipSnaps: false,
      inViewThreshold: 0.7,
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement as HTMLElement
      })
    ]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    if (!api) return;
    setPrevBtnEnabled(api.canScrollPrev());
    setNextBtnEnabled(api.canScrollNext());
  }, []);

  useEffect(() => {
    // Preload images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => [...prev, src]);
      };
    });
  }, []);

  useEffect(() => {
    // Preload images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages(prev => [...prev, src]);
      };
    });

    // Setup carousel event handlers
    if (emblaApi) {
      emblaApi.on('select', () => {
        onSelect(emblaApi);
        setShowHint(false);
      });
      
      emblaApi.on('pointerDown', () => setShowHint(false));
      
      // Initial state
      onSelect(emblaApi);
    }

    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4000); // Hide hint after 4 seconds

    return () => {
      clearTimeout(timer);
      if (emblaApi) {
        emblaApi.off('select', () => onSelect(emblaApi));
      }
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      {showHint && (
        <div 
          className="absolute inset-y-0 left-0 z-10 pointer-events-none md:hidden
                     flex items-center px-4"
          style={{
            animation: 'fadeOut 0.5s ease-in forwards',
            animationDelay: '3.5s'
          }}
        >
          <div className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm
                        animate-slideLeft">
            Swipe Left
          </div>
        </div>
      )}
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4 relative">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-500 ease-in-out hover:shadow-xl">
                {loadedImages.includes(src) ? (
                  <>
                    <img 
                      src={src} 
                      alt={imageDescriptions[index]}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
                      loading="lazy"
                      style={{
                        willChange: 'transform',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="animate-pulse w-full h-full bg-muted-foreground/10" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
