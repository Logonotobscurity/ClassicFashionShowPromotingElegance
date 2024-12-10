import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

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
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      slidesToScroll: 1,
      dragFree: true,
      skipSnaps: true,
      inViewThreshold: 0.7,
      speed: 7,
    },
    [
      Autoplay({ 
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      })
    ]
  );

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
                  <img 
                    src={src} 
                    alt={`Fashion Collection ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
