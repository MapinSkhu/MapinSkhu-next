"use client";

import { cn } from "@/shared/lib/utils";
import { DAYS } from "../model/constants";
import { getDayIndex } from "../lib/time";

export default function DaySelector() {
  const todayIndex = getDayIndex(new Date());

  return (
    <div className="flex justify-around px-4 py-3 md:hidden">
      {DAYS.map((day, index) => (
        <div
          key={day}
          className={cn(
            "flex h-[35px] w-[35px] items-center justify-center rounded-full text-[14px]",
            todayIndex === index
              ? "border border-(--mapin-green-400) bg-(--mapin-green-100) font-bold text-(--mapin-green-800)"
              : "border border-(--mapin-gray-450) font-medium text-(--mapin-gray-800)",
          )}
          aria-current={todayIndex === index ? "date" : undefined}
        >
          {day}
        </div>
      ))}
    </div>
  );
}
