import { Card } from "@/components/ui/card";

const schedule = [
  { time: "12:00 PM", event: "Registration & Networking" },
  { time: "2:00 PM", event: "Opening Ceremony" },
  { time: "3:00 PM", event: "Runway Show" },
  { time: "4:30 PM", event: "Musical Performance" },
  { time: "5:00 PM", event: "Fashion Awards" },
  { time: "6:00 PM", event: "Fashion After Party" },
  { time: "12:00 AM", event: "Closing Time" }
];

export default function EventSchedule() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schedule.map((item, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <time className="text-2xl font-bold text-primary">{item.time}</time>
          <h3 className="text-xl mt-2">{item.event}</h3>
        </Card>
      ))}
    </div>
  );
}
