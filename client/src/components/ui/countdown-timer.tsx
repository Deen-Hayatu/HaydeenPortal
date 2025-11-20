import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: Date;
  label: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate, label, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-2xl font-bold text-[#27AE60] mb-2">Launch Day!</div>
        <p className="text-gray-600">{label} is now available</p>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-[#0A3D62]" />
        <span className="text-sm font-medium text-gray-600">{label} launches in:</span>
      </div>
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        <div className="bg-white rounded-lg p-3 shadow-md text-center border-2 border-[#27AE60]">
          <div className="text-2xl md:text-3xl font-bold text-[#0A3D62]">{timeLeft.days}</div>
          <div className="text-xs text-gray-600 mt-1">Days</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-md text-center border-2 border-[#27AE60]">
          <div className="text-2xl md:text-3xl font-bold text-[#0A3D62]">{timeLeft.hours}</div>
          <div className="text-xs text-gray-600 mt-1">Hours</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-md text-center border-2 border-[#27AE60]">
          <div className="text-2xl md:text-3xl font-bold text-[#0A3D62]">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-600 mt-1">Minutes</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-md text-center border-2 border-[#27AE60]">
          <div className="text-2xl md:text-3xl font-bold text-[#0A3D62]">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-600 mt-1">Seconds</div>
        </div>
      </div>
    </div>
  );
}

