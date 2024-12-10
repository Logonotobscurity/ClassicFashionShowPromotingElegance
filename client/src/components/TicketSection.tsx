import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tickets = [
  {
    name: "REG",
    price: "₦20,000",
    description: "Regular seating with full event access",
    link: "https://paystack.com/pay/regular-"
  },
  {
    name: "VIP",
    price: "₦50,000",
    description: "Premium seating with complimentary refreshments",
    link: "https://paystack.com/pay/vip-"
  },
  {
    name: "GOLD TABLE",
    price: "₦100,000",
    description: "Reserved table with premium services",
    link: "https://paystack.com/pay/gold-"
  },
  {
    name: "PREMIUM TABLE",
    price: "₦200,000",
    description: "Exclusive table with VIP treatment",
    link: "https://paystack.com/pay/premium-tick"
  }
];

export default function TicketSection() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tickets.map((ticket, index) => (
        <Card key={index} className="p-6 flex flex-col">
          <h3 className="text-2xl font-bold">{ticket.name}</h3>
          <div className="text-3xl font-bold text-primary my-4">{ticket.price}</div>
          <p className="text-muted-foreground flex-grow">{ticket.description}</p>
          <Button className="mt-6 w-full" asChild>
            <a href={ticket.link} target="_blank" rel="noopener noreferrer">
              Book Now
            </a>
          </Button>
        </Card>
      ))}
    </div>
  );
}
