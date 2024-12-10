import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// WebP optimized images for better performance
const images = [
  "./assets/collections/fashion-1.webp",
  "./assets/collections/fashion-2.webp",
  "./assets/collections/fashion-3.webp",
  "./assets/collections/fashion-4.webp",
  "./assets/collections/fashion-5.webp",
  "./assets/collections/fashion-6.webp",
  "./assets/collections/fashion-7.webp",
  "./assets/collections/fashion-8.webp"
];

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
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      duration: 35,
      skipSnaps: false,
      startIndex: 0,
      dragFree: false,
      containScroll: "trimSnaps",
      direction: "rtl"
    },
    [
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement
      })
    ]
  );

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
    const handleInteraction = () => {
      setShowHint(false);
    };

    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000); // Hide after 5 seconds even without interaction

    if (emblaRef.current) {
      emblaRef.current.on('select', handleInteraction);
      emblaRef.current.on('pointerDown', handleInteraction);
    }

    return () => {
      clearTimeout(timer);
      if (emblaRef.current) {
        emblaRef.current.off('select', handleInteraction);
        emblaRef.current.off('pointerDown', handleInteraction);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {showHint && (
        <div 
          className="absolute inset-y-0 left-0 z-10 pointer-events-none md:hidden
                     flex items-center px-4 animate-fadeOut"
          style={{
            animation: 'fadeOut 0.5s ease-in forwards',
            animationDelay: '4.5s'
          }}
        >
          <div className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm
                        animate-slideLeft">
            Slide Left
          </div>
        </div>
      )}
      <Carousel 
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <div className="relative overflow-hidden" ref={emblaRef}>
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-3/4 md:basis-1/2">
                <div className="aspect-[3/4] md:aspect-[4/3] relative rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-700 ease-in-out hover:shadow-xl">
                  {loadedImages.includes(src) ? (
                    <>
                      <img 
                        src={src} 
                        alt={imageDescriptions[index]}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <div className="animate-pulse w-full h-full bg-muted-foreground/10" />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
