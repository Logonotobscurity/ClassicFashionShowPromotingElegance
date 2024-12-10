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

const images = [
  "WhatsApp Image 2024-12-09 at 7.38.04 PM-2.jpeg",
  "WhatsApp Image 2024-12-09 at 7.35.22 PM.jpeg",
  "WhatsApp Image 2024-12-09 at 7.35.22 PM-2.jpeg",
  "WhatsApp Image 2024-12-09 at 7.38.04 PM.jpeg",
  "WhatsApp Image 2024-12-09 at 7.38.04 PM-3.jpeg",
  "WhatsApp Image 2024-12-09 at 7.35.22 PM-3.jpeg",
  "WhatsApp Image 2024-12-09 at 7.35.20 PM.jpeg",
  "image 1.jpeg"
];

export default function ImageCarousel() {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    duration: 20,
    skipSnaps: false
  }, [
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      playOnInit: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  ]);

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
                <div className="aspect-square relative rounded-lg overflow-hidden group cursor-pointer transform transition-all duration-500 ease-in-out hover:z-10">
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
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
