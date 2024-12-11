import { Button } from "@/components/ui/button";
import CountdownTimer from "../components/CountdownTimer";
import EventSchedule from "../components/EventSchedule";
import TicketSection from "../components/TicketSection";
import ImageCarousel from "../components/ImageCarousel";
import CollectionGrid from "../components/CollectionGrid";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-[100svh] flex items-center justify-center text-white pt-20 pb-12 md:py-0 overflow-hidden" 
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url('/assets/hero page image.webp')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: typeof window !== 'undefined' && /iPhone|iPad|iPod/i.test(window.navigator.userAgent) ? 'scroll' : 'fixed'
        }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center mt-8 md:mt-0">
            <div className="w-full flex justify-center mb-6 md:mb-12">
              <img 
                src="/assets/logo.webp" 
                alt="Classic Fashion Show" 
                className="h-20 md:h-40 w-auto object-contain transform scale-90 md:scale-100"
              />
            </div>
            <div className="flex flex-col items-center text-center space-y-3 md:space-y-6">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg max-w-3xl leading-tight">
                Classic Fashion Show
              </h1>
              <p className="text-lg sm:text-2xl md:text-3xl text-white/90 drop-shadow-md font-light">
                "Promoting Elegance"
              </p>
              <p className="text-base sm:text-xl md:text-2xl text-white/80 drop-shadow-md font-light max-w-2xl px-2">
                December 18th, 2024 • Amazing Place Event Centre, Akure
              </p>
              <div className="w-full max-w-[90%] sm:max-w-xl mt-4 md:mt-8">
                <CountdownTimer targetDate="2024-12-18T12:00:00" />
              </div>
              <Button
                size="lg"
                className="mt-6 md:mt-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg"
                onClick={() => {
                  const element = document.getElementById('tickets');
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Book Your Seat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a5d1a]">Featured Collections</h2>
          <div className="space-y-16">
            <ImageCarousel />
            <CollectionGrid />
          </div>
        </div>
      </section>

      {/* Event Schedule */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f5f9f5]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a5d1a]">Event Schedule</h2>
          <EventSchedule />
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" className="py-20 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#1a5d1a]">Get Your Tickets</h2>
          <TicketSection />
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}
