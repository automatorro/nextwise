
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TestTimerProps {
  durationMinutes: number;
  onTimeUp?: () => void;
  isActive?: boolean;
}

const TestTimer: React.FC<TestTimerProps> = ({ 
  durationMinutes, 
  onTimeUp, 
  isActive = true 
}) => {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0 && onTimeUp) {
          onTimeUp();
        }
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = (): string => {
    const percentage = (timeLeft / (durationMinutes * 60)) * 100;
    if (percentage <= 10) return 'text-red-600';
    if (percentage <= 25) return 'text-orange-600';
    return 'text-gray-700';
  };

  return (
    <div className={`flex items-center space-x-2 ${getTimeColor()}`}>
      <Clock className="w-4 h-4" />
      <span className="font-mono text-sm font-medium">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default TestTimer;
