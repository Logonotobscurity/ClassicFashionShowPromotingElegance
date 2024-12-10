import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Ensure all images are preloaded and properly served from the public directory
const images = [
  "/assets/collections/fashion-1.jpeg",
  "/assets/collections/fashion-2.jpeg",
  "/assets/collections/fashion-3.jpeg",
  "/assets/collections/fashion-4.jpeg",
  "/assets/collections/fashion-5.jpeg",
  "/assets/collections/fashion-6.jpeg",
  "/assets/collections/fashion-7.jpeg",
  "/assets/collections/fashion-8.jpeg"
];

export default function ImageCarousel() {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      slidesToScroll: 1,
      duration: 30,
      skipSnaps: true,
      startIndex: Math.floor(Math.random() * images.length),
      dragFree: false
    },
    [
      Autoplay({
        delay: 3000,
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
    <div className="w-full max-w-4xl mx-auto">
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
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-500 ease-in-out hover:shadow-xl">
                  {loadedImages.includes(src) ? (
                    <>
                      <img 
                        src={src} 
                        alt={`Fashion Collection ${index + 1}`}
                        className="w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110"
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
