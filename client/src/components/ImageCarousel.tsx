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

  return (
    <div className="w-full max-w-6xl mx-auto">
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
