import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Ensure all images are preloaded and properly served from the public directory
const images = [
  "./assets/collections/fashion-1.jpeg",
  "./assets/collections/fashion-2.jpeg",
  "./assets/collections/fashion-3.jpeg",
  "./assets/collections/fashion-4.jpeg",
  "./assets/collections/fashion-5.jpeg",
  "./assets/collections/fashion-6.jpeg",
  "./assets/collections/fashion-7.jpeg",
  "./assets/collections/fashion-8.jpeg"
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
                        alt={`Fashion Collection ${index + 1}`}
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
