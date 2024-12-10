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
      <section className="relative h-screen flex items-center text-white" 
        style={{
          background: "linear-gradient(135deg, rgba(0,128,0,0.6) 0%, rgba(0,0,0,0.4) 100%), url('/assets/hero page image.jpeg') center/cover"
        }}>
        <div className="container mx-auto">
          <div className="relative flex flex-col space-y-6">
            <img 
              src="/assets/logo.webp" 
              alt="Classic Fashion Show" 
              className="absolute top-[-100px] left-4 h-40 w-auto object-contain"
            />
            <div className="mt-20 pl-4">
              <h1 className="text-6xl font-bold text-white drop-shadow-lg">Classic Fashion Show</h1>
              <p className="text-2xl mt-4 text-white/90 drop-shadow-md">"Promoting Elegance"</p>
              <p className="text-xl mt-2 text-white/80 drop-shadow-md">December 18th, 2024 • Amazing Place Event Centre, Akure</p>
              <div className="mt-8">
                <CountdownTimer targetDate="2024-12-18T12:00:00" />
              </div>
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
