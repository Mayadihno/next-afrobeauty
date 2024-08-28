"use client";
import { data } from "@/components/aboutUs/data";
import React, { useEffect, useState } from "react";

const CountDown = ({ item }: any) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  interface TimeLeft {
    [key: string]: number;
  }

  function calculateTimeLeft() {
    const difference = +new Date(item) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval, index) => {
    if (!timeLeft[interval as keyof typeof timeLeft]) {
      return null;
    }

    return (
      <span key={interval} className="text-2xl text-[#475ad2]">
        {timeLeft[interval as keyof typeof timeLeft]} {interval}
        {index < Object.keys(timeLeft).length - 1 && " : "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
