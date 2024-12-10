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
          background: "url('/assets/hero page image.jpeg') center/cover"
        }}>
        <div className="container mx-auto">
          <div className="flex flex-col items-start space-y-6 p-4">
            <img 
              src="/assets/logo.webp" 
              alt="Classic Fashion Show" 
              className="h-32 w-auto object-contain mb-8"
            />
            <h1 className="text-6xl font-bold">Classic Fashion Show</h1>
            <p className="text-2xl">"Promoting Elegance"</p>
            <p className="text-xl">December 18th, 2024 • Amazing Place Event Centre, Akure</p>
            <CountdownTimer targetDate="2024-12-18T12:00:00" />
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
