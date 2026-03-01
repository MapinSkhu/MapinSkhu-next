"use client";

import { cn } from "@/shared/lib/utils";
import { DAYS } from "../model/constants";

interface DaySelectorProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

export default function DaySelector({
  selectedDay,
  onDayChange,
}: DaySelectorProps) {
  return (
    <div className="flex justify-around px-4 py-3 md:hidden">
      {DAYS.map((day, index) => (
        <button
          key={day}
          onClick={() => onDayChange(index)}
          className={cn(
            "flex h-[35px] w-[35px] items-center justify-center rounded-full text-[14px] transition-colors",
            selectedDay === index
              ? "border border-[#abe99f] bg-[#e5ffe0] font-bold text-[#35aa69]"
              : "border border-[#d1d1d6] font-medium text-[#878891]",
          )}
          aria-pressed={selectedDay === index}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
