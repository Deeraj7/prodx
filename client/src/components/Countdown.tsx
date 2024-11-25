// src/components/Countdown.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, AlertCircle } from 'lucide-react';

interface CountdownProps {
  deadline: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
    percentage: 100
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadlineTime = new Date(deadline).getTime();
      const difference = deadlineTime - now;
      const totalDuration = deadlineTime - new Date(deadline).getTime() + 1000 * 60 * 60 * 24 * 7; // 7 days total
      const percentage = Math.max(0, Math.min(100, (difference / totalDuration) * 100));
      
      if (difference <= 0) {
        return {
          days: 0, hours: 0, minutes: 0, seconds: 0,
          isExpired: true, percentage: 0
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
        percentage
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const getColor = () => {
    if (timeLeft.isExpired) return 'rgb(239 68 68)'; // red
    if (timeLeft.percentage < 20) return 'rgb(234 179 8)'; // yellow
    return 'rgb(34 197 94)'; // green
  };

  if (timeLeft.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2 bg-red-100 text-red-600 p-3 rounded-lg"
      >
        <AlertCircle className="animate-pulse" size={20} />
        <span className="font-semibold">Deadline Passed</span>
      </motion.div>
    );
  }

  const timeUnit = (value: number, label: string) => (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative"
    >
      <div className="bg-white rounded-lg p-3 shadow-sm border">
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="text-2xl font-bold text-gray-800"
          >
            {value.toString().padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
        <div className="text-xs text-gray-500 mt-1">{label}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Timer size={18} style={{ color: getColor() }} />
        <span className="text-sm font-medium text-gray-600">Time Remaining</span>
      </div>
      
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-gray-100"
          style={{ transform: 'scale(1)', transformOrigin: 'left' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: getColor(),
            transform: `scaleX(${timeLeft.percentage / 100})`,
            transformOrigin: 'left',
            opacity: 0.2
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {timeUnit(timeLeft.days, 'days')}
        {timeUnit(timeLeft.hours, 'hours')}
        {timeUnit(timeLeft.minutes, 'mins')}
        {timeUnit(timeLeft.seconds, 'secs')}
      </div>
    </div>
  );
};