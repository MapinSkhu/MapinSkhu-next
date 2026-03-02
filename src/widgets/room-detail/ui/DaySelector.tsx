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
              ? "border border-(--mapin-green-400) bg-(--mapin-green-100) font-bold text-(--mapin-green-800)"
              : "border border-[#d1d1d6] font-medium text-(--mapin-gray-800)",
          )}
          aria-pressed={selectedDay === index}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
