import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-1 sm:gap-2 md:gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <Card key={unit} className="p-1 sm:p-2 md:p-4 w-[4rem] sm:w-20 md:w-24 bg-black/75 backdrop-blur-md border-primary/50 shadow-lg">
          <div className="text-base sm:text-xl md:text-3xl font-bold text-center text-white">{value}</div>
          <div className="text-[8px] sm:text-xs md:text-sm uppercase text-center text-white/90">{unit}</div>
        </Card>
      ))}
    </div>
  );
}
