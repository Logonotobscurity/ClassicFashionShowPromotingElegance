import { Button } from "@/components/ui/button";
import CountdownTimer from "../components/CountdownTimer";
import EventSchedule from "../components/EventSchedule";
import TicketSection from "../components/TicketSection";
import ImageCarousel from "../components/ImageCarousel";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center text-white py-20 md:py-0" 
        style={{
          background: "linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%), url('/hero%20page%20image.webp') center/cover no-repeat"
        }}>
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col space-y-6">
            <img 
              src="/assets/logo.webp" 
              alt="Classic Fashion Show" 
              className="absolute top-[-80px] md:top-[-100px] left-1/2 transform -translate-x-1/2 md:left-4 md:translate-x-0 h-28 md:h-40 w-auto object-contain"
            />
            <div className="mt-16 md:mt-20 flex flex-col items-center text-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Classic Fashion Show</h1>
              <p className="text-lg sm:text-xl md:text-2xl mt-4 text-white/90 drop-shadow-md">"Promoting Elegance"</p>
              <p className="text-base sm:text-lg md:text-xl mt-2 text-white/80 drop-shadow-md px-4">December 18th, 2024 • Amazing Place Event Centre, Akure</p>
              <div className="mt-8 w-full max-w-xl">
                <CountdownTimer targetDate="2024-12-18T12:00:00" />
              </div>
              <Button
                size="lg"
                className="mt-8 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                onClick={() => {
                  const element = document.getElementById('tickets');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Book Your Seat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Collections</h2>
          <ImageCarousel />
        </div>
      </section>

      {/* Event Schedule */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Event Schedule</h2>
          <EventSchedule />
        </div>
      </section>

      {/* Tickets */}
      <section id="tickets" className="py-20 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Get Your Tickets</h2>
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
