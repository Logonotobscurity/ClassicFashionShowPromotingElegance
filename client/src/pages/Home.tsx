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
      <section className="relative h-screen flex items-center justify-center text-white" 
        style={{
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/hero-page.jpeg') center/cover"
        }}>
        <div className="text-center space-y-6 p-4">
          <h1 className="text-6xl font-bold">Classic Fashion Show</h1>
          <p className="text-2xl">"Promoting Elegance"</p>
          <p className="text-xl">December 18th, 2024 • Amazing Place Event Centre, Akure</p>
          <CountdownTimer targetDate="2024-12-18T12:00:00" />
          <Button 
            size="lg" 
            className="mt-8 bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/50 transition-all duration-300 hover:shadow-emerald-500/70 hover:scale-105 rounded-full px-8"
            onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Your Seat
          </Button>
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
