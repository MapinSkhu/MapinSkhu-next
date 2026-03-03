"use client";

import { useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { Lecture } from "../model/types";
import { DAYS } from "../model/constants";
import { timeToMinutes, getDayIndex } from "../lib/time";

// 09:00 ~ 22:00, 30분 간격 슬롯
const TIME_SLOTS: string[] = [];
for (let h = 9; h <= 22; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, "0")}:00`);
  if (h < 22) {
    TIME_SLOTS.push(`${String(h).padStart(2, "0")}:30`);
  }
}

const START_MINUTES = timeToMinutes("09:00");
const SLOT_HEIGHT_PX = 40; // 30분당 픽셀 높이

function minutesToOffset(minutes: number): number {
  return ((minutes - START_MINUTES) / 30) * SLOT_HEIGHT_PX;
}

function lectureDurationHeight(start: string, end: string): number {
  const diff = timeToMinutes(end) - timeToMinutes(start);
  return (diff / 30) * SLOT_HEIGHT_PX;
}

type CardVariant = "default" | "today" | "current";

function getLectureVariant(
  lecture: Lecture,
  todayDayIndex: number,
  currentMinutes: number | null,
): CardVariant {
  const isToday = lecture.day === todayDayIndex;
  if (!isToday) return "default";

  if (currentMinutes !== null) {
    const start = timeToMinutes(lecture.startTime);
    const end = timeToMinutes(lecture.endTime);
    if (currentMinutes >= start && currentMinutes < end) return "current";
  }

  return "today";
}

interface LectureCardProps {
  lecture: Lecture;
  variant: CardVariant;
  compact?: boolean;
}

function LectureCard({ lecture, variant, compact = false }: LectureCardProps) {
  const containerClass = cn(
    "h-full overflow-hidden rounded-[10px] border px-[15px] py-[12px] transition-shadow duration-200 hover:shadow-[4px_4px_20px_rgba(0,0,0,0.15)]",
    variant === "default" &&
      "border-(--mapin-gray-450) bg-(--mapin-white-900) hover:border-(--mapin-gray-450) hover:bg-(--mapin-white-900)",
    variant === "today" &&
      "border-(--mapin-navy-400) bg-(--mapin-navy-200) hover:border-(--mapin-navy-400) hover:bg-(--mapin-navy-200)",
    variant === "current" &&
      "border-(--mapin-green-400) bg-(--mapin-green-100) shadow-[4px_4px_20px_rgba(0,0,0,0.15)] hover:border-(--mapin-green-400) hover:bg-(--mapin-green-100)",
  );

  const timeClass = cn(
    "typo-body-lg-exbd leading-tight",
    variant === "default" && "text-(--mapin-gray-900)",
    variant === "today" && "text-(--mapin-navy-800)",
    variant === "current" && "text-(--mapin-green-800)",
  );

  const nameClass = cn(
    "typo-body-md-bd",
    variant === "default" && "text-(--mapin-gray-800)",
    variant === "today" && "text-(--mapin-navy-750)",
    variant === "current" && "text-(--mapin-green-700)",
  );

  const professorClass = cn(
    "typo-body-sm-md-20",
    variant === "default" && "text-(--mapin-gray-600)",
    variant === "today" && "text-(--mapin-navy-700)",
    variant === "current" && "text-(--mapin-green-750)",
  );

  return (
    <div className={containerClass}>
      <div className="flex flex-col gap-[4px]">
        <p className={timeClass}>
          {lecture.startTime}~{lecture.endTime}
        </p>
        <p className={cn(nameClass, compact && "line-clamp-2")}>
          {lecture.name}
        </p>
      </div>
      <div className="mt-[8px] flex items-center gap-[6px]">
        <p className={professorClass}>{lecture.professor}</p>
        {lecture.isGraduate && (
          <span className="rounded-[4px] bg-(--mapin-navy-200) px-[6px] py-[2px] typo-body-sm-md-16 text-(--mapin-gray-900)">
            대학원 강의
          </span>
        )}
      </div>
    </div>
  );
}

interface TimetableProps {
  lectures: Lecture[];
  currentTime?: string; // "HH:MM"
}

export default function Timetable({ lectures, currentTime }: TimetableProps) {
  const todayDayIndex = getDayIndex(new Date());
  const selectedDay = todayDayIndex;

  const lecturesByDay = useMemo(() => {
    const map: Record<number, Lecture[]> = {};
    for (let i = 0; i < 5; i++) {
      map[i] = lectures.filter((l) => l.day === i);
    }
    return map;
  }, [lectures]);

  const selectedDayLectures = lecturesByDay[selectedDay] ?? [];

  const currentMinutes = currentTime ? timeToMinutes(currentTime) : null;
  const currentLineOffset =
    currentMinutes !== null &&
    currentMinutes >= START_MINUTES &&
    currentMinutes <= timeToMinutes("22:00")
      ? minutesToOffset(currentMinutes)
      : null;

  const totalHeight = TIME_SLOTS.length * SLOT_HEIGHT_PX;

  return (
    <>
      {/* PC: 그리드형 시간표 */}
      <div className="hidden md:block">
        <div className="overflow-x-auto px-6 pb-6">
          <div className="min-w-[600px]">
            {/* 요일 헤더 */}
            <div className="flex items-center pb-4">
              {/* 왼쪽 시간 컬럼 너비만큼 여백 */}
              <div className="w-[70px] shrink-0" />
              {DAYS.map((day, index) => (
                <div
                  key={day}
                  className="flex flex-1 items-center justify-center"
                >
                  <div
                    className={cn(
                      "flex h-[32px] w-[48px] items-center justify-center rounded-full typo-body-lg-bd",
                      todayDayIndex === index
                        ? "border border-(--mapin-green-400) bg-(--mapin-green-100) text-(--mapin-green-800)"
                        : "text-(--mapin-gray-700)",
                    )}
                    aria-current={todayDayIndex === index ? "date" : undefined}
                  >
                    {day}
                  </div>
                </div>
              ))}
            </div>

            {/* 시간표 배경 컨테이너 */}
            <div className="rounded-[20px] bg-(--mapin-gray-100) px-4 py-5">
              {/* 건물 오픈 시간 표시 */}
              <div
                style={{ height: `${SLOT_HEIGHT_PX + SLOT_HEIGHT_PX / 2}px` }}
              >
                <div
                  className="relative flex w-[70px] flex-col items-end pr-2"
                  style={{ top: "-10px" }}
                >
                  <span className="typo-body-lg-bd text-(--mapin-gray-500)">
                    05:00
                  </span>
                  <span className="typo-body-lg-bd text-(--mapin-gray-500)">
                    ~
                  </span>
                </div>
              </div>

              {/* 시간 + 강의 그리드 */}
              <div className="flex">
                {/* 왼쪽 시간 컬럼 */}
                <div
                  className="relative w-[70px] shrink-0"
                  style={{ height: `${totalHeight}px` }}
                >
                  {TIME_SLOTS.map((slot, i) =>
                    i % 2 === 0 ? (
                      <div
                        key={slot}
                        className="absolute right-0 pr-2 typo-body-lg-bd text-(--mapin-gray-500)"
                        style={{ top: `${i * SLOT_HEIGHT_PX - 16}px` }}
                      >
                        {slot}
                      </div>
                    ) : null,
                  )}
                </div>

                {/* 요일 컬럼 영역 */}
                <div className="relative min-w-0 flex-1">
                  <div className="relative flex">
                    {/* 수평 점선 그리드 (배경) */}
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0"
                      style={{ height: `${totalHeight}px` }}
                    >
                      {TIME_SLOTS.map((slot, i) => (
                        <div
                          key={slot}
                          className="absolute w-full"
                          style={{ top: `${i * SLOT_HEIGHT_PX}px` }}
                        >
                          <div
                            className={cn(
                              "border-t",
                              i % 2 === 0
                                ? "border-dashed border-(--mapin-gray-450)"
                                : "border-dashed border-(--mapin-gray-400)",
                            )}
                          />
                        </div>
                      ))}
                    </div>

                    {/* 요일별 컬럼 */}
                    {DAYS.map((day, dayIndex) => (
                      <div
                        key={day}
                        className="relative flex-1"
                        style={{ height: `${totalHeight}px` }}
                      >
                        {/* 강의 카드 */}
                        {lecturesByDay[dayIndex]?.map((lecture) => {
                          const top = minutesToOffset(
                            timeToMinutes(lecture.startTime),
                          );
                          const height = lectureDurationHeight(
                            lecture.startTime,
                            lecture.endTime,
                          );
                          const variant = getLectureVariant(
                            lecture,
                            todayDayIndex,
                            currentMinutes,
                          );
                          return (
                            <div
                              key={lecture.id}
                              className="absolute inset-x-1 hover:z-30"
                              style={{ top: `${top}px`, height: `${height}px` }}
                            >
                              <LectureCard
                                lecture={lecture}
                                variant={variant}
                                compact
                              />
                            </div>
                          );
                        })}

                        {/* 현재 시각 라인 */}
                        {currentLineOffset !== null && (
                          <div
                            className="absolute inset-x-0 z-20 h-[2px] bg-(--mapin-green-800)"
                            style={{ top: `${currentLineOffset}px` }}
                          />
                        )}
                      </div>
                    ))}

                    {/* 현재 시각 배지 - 오른쪽 끝에 한 번만 표시 */}
                    {currentLineOffset !== null && (
                      <div
                        className="absolute right-6 z-20 translate-x-full pl-[4px]"
                        style={{ top: `${currentLineOffset - 12}px` }}
                      >
                        <span className="rounded-full bg-(--mapin-green-800) px-[8px] py-[2px] typo-body-lg-md text-(--mapin-white-900) whitespace-nowrap">
                          {currentTime}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: 타임라인형 시간표 */}
      <div className="block px-4 pb-6 md:hidden">
        {/* 시간표 배경 컨테이너 */}
        <div className="rounded-[20px] bg-(--mapin-gray-100) px-4 py-5">
          {/* 건물 오픈 시간 표시 */}
          <div style={{ height: `${SLOT_HEIGHT_PX + SLOT_HEIGHT_PX / 2}px` }}>
            <div
              className="relative flex w-[58px] flex-col items-end pr-2"
              style={{ top: "-10px" }}
            >
              <span className="typo-body-lg-bd text-(--mapin-gray-500)">
                05:00
              </span>
              <span className="typo-body-lg-bd text-(--mapin-gray-500)">~</span>
            </div>
          </div>

          <div className="flex">
            {/* 왼쪽 시간 컬럼 */}
            <div
              className="relative w-[58px] shrink-0"
              style={{ height: `${totalHeight}px` }}
            >
              {TIME_SLOTS.map((slot, i) =>
                i % 2 === 0 ? (
                  <div
                    key={slot}
                    className="absolute right-0 pr-2 typo-body-lg-bd text-(--mapin-gray-500)"
                    style={{ top: `${i * SLOT_HEIGHT_PX - 16}px` }}
                  >
                    {slot}
                  </div>
                ) : null,
              )}
            </div>

            {/* 타임라인 영역 */}
            <div className="relative min-w-0 flex-1">
              <div style={{ height: `${totalHeight}px`, position: "relative" }}>
                {/* 수평 점선 */}
                {TIME_SLOTS.map((slot, i) => (
                  <div
                    key={slot}
                    className="absolute w-full"
                    style={{ top: `${i * SLOT_HEIGHT_PX}px` }}
                  >
                    <div
                      className={cn(
                        "border-t",
                        i % 2 === 0
                          ? "border-dashed border-(--mapin-gray-450)"
                          : "border-dashed border-(--mapin-gray-400)",
                      )}
                    />
                  </div>
                ))}

                {/* 강의 카드 */}
                {selectedDayLectures.map((lecture) => {
                  const top = minutesToOffset(timeToMinutes(lecture.startTime));
                  const height = lectureDurationHeight(
                    lecture.startTime,
                    lecture.endTime,
                  );
                  const variant = getLectureVariant(
                    lecture,
                    todayDayIndex,
                    currentMinutes,
                  );
                  return (
                    <div
                      key={lecture.id}
                      className="absolute inset-x-0 hover:z-30"
                      style={{ top: `${top}px`, height: `${height}px` }}
                    >
                      <LectureCard lecture={lecture} variant={variant} />
                    </div>
                  );
                })}

                {/* 현재 시각 라인 (Mobile) - 오늘 요일 선택 시에만 표시 */}
                {currentLineOffset !== null &&
                  selectedDay === todayDayIndex && (
                    <div
                      className="absolute z-10 flex items-center"
                      style={{
                        top: `${currentLineOffset}px`,
                        left: 0,
                        right: 0,
                      }}
                    >
                      <div className="h-[2px] flex-1 bg-(--mapin-green-800)" />
                      <span className="rounded-full bg-(--mapin-green-800) px-[8px] py-[2px] typo-body-lg-md text-(--mapin-white-900) whitespace-nowrap">
                        {currentTime}
                      </span>
                    </div>
                  )}

                {/* 강의 없을 때 */}
                {selectedDayLectures.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="typo-body-md-md-20 text-(--mapin-gray-700)">
                      이 날은 강의가 없습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
