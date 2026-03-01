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

interface LectureCardProps {
  lecture: Lecture;
  compact?: boolean;
}

function LectureCard({ lecture, compact = false }: LectureCardProps) {
  return (
    <div className="h-full overflow-hidden rounded-[10px] border border-[#d5d8ef] bg-[#e8ecff] px-[15px] py-[12px]">
      {!compact && (
        <div className="flex flex-col gap-[6px]">
          <p className="text-[16px] font-extrabold leading-tight text-[#454d7b]">
            {lecture.startTime}~{lecture.endTime}
          </p>
          <p className="text-[14px] font-bold leading-tight text-[#6870a0]">
            {lecture.name}
          </p>
        </div>
      )}
      {compact && (
        <div className="flex flex-col gap-[6px]">
          <p className="text-[16px] font-extrabold leading-tight text-[#454d7b]">
            {lecture.startTime}~{lecture.endTime}
          </p>
          <p className="line-clamp-2 text-[14px] font-bold leading-tight text-[#6870a0]">
            {lecture.name}
          </p>
        </div>
      )}
      <p className="mt-[20px] text-[12px] font-medium text-[#7982b6]">
        {lecture.professor}
      </p>
    </div>
  );
}

interface TimetableProps {
  lectures: Lecture[];
  selectedDay: number;
  onDayChange: (day: number) => void;
  currentTime?: string; // "HH:MM"
}

export default function Timetable({
  lectures,
  selectedDay,
  onDayChange,
  currentTime,
}: TimetableProps) {
  const todayDayIndex = getDayIndex(new Date());

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
            <div className="flex items-center pb-6">
              <div className="w-[70px] shrink-0" />
              {DAYS.map((day, index) => (
                <div
                  key={day}
                  className="flex flex-1 items-center justify-center"
                >
                  <button
                    onClick={() => onDayChange(index)}
                    className={cn(
                      "flex h-[32px] w-[90px] items-center justify-center rounded-full text-[16px] font-bold transition-colors",
                      selectedDay === index
                        ? "border border-[#abe99f] bg-[#e5ffe0] text-[#35aa69]"
                        : "text-[#95969d] hover:text-[#35aa69]",
                    )}
                    aria-pressed={selectedDay === index}
                  >
                    {day}
                  </button>
                </div>
              ))}
            </div>

            {/* 시간 + 강의 그리드 */}
            <div className="relative flex">
              {/* 시간 컬럼 */}
              <div className="w-[70px] shrink-0">
                {TIME_SLOTS.map((slot, i) => (
                  <div
                    key={slot}
                    className="flex items-start justify-end pr-2"
                    style={{ height: `${SLOT_HEIGHT_PX}px` }}
                  >
                    {i % 2 === 0 && (
                      <span className="text-[12px] text-[#95969d]">{slot}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* 요일 컬럼 */}
              {DAYS.map((day, dayIndex) => (
                <div
                  key={day}
                  className="relative flex-1 border-l border-gray-100"
                  style={{ height: `${totalHeight}px` }}
                >
                  {/* 시간선 */}
                  {TIME_SLOTS.map((slot, i) => (
                    <div
                      key={slot}
                      className="absolute w-full border-t"
                      style={{
                        top: `${i * SLOT_HEIGHT_PX}px`,
                        borderColor: i % 2 === 0 ? "#e5e7eb" : "#f3f4f6",
                      }}
                    />
                  ))}

                  {/* 강의 카드 */}
                  {lecturesByDay[dayIndex]?.map((lecture) => {
                    const top = minutesToOffset(
                      timeToMinutes(lecture.startTime),
                    );
                    const height = lectureDurationHeight(
                      lecture.startTime,
                      lecture.endTime,
                    );
                    return (
                      <div
                        key={lecture.id}
                        className="absolute inset-x-1"
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        <LectureCard lecture={lecture} compact />
                      </div>
                    );
                  })}

                  {/* 현재 시각 라인 - 오늘 요일 컬럼에만 표시 */}
                  {currentLineOffset !== null && dayIndex === todayDayIndex && (
                    <div
                      className="absolute inset-x-0 z-10 h-[2px] bg-(--new-main-color)"
                      style={{ top: `${currentLineOffset}px` }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: 타임라인형 시간표 */}
      <div className="block px-4 pb-6 md:hidden">
        <div className="relative">
          {/* 세로 중앙 라인 */}
          <div
            className="absolute bottom-0 top-0 w-[2px] bg-gray-200"
            style={{ left: "60px" }}
          />

          <div style={{ height: `${totalHeight}px`, position: "relative" }}>
            {/* 시간 레이블 */}
            {TIME_SLOTS.map((slot, i) => (
              <div
                key={slot}
                className="absolute flex items-center"
                style={{
                  top: `${i * SLOT_HEIGHT_PX}px`,
                  left: 0,
                  width: "58px",
                }}
              >
                {i % 2 === 0 && (
                  <span className="w-full text-right text-[12px] text-[#95969d]">
                    {slot}
                  </span>
                )}
              </div>
            ))}

            {/* 강의 카드 */}
            {selectedDayLectures.map((lecture) => {
              const top = minutesToOffset(timeToMinutes(lecture.startTime));
              const height = lectureDurationHeight(
                lecture.startTime,
                lecture.endTime,
              );
              return (
                <div
                  key={lecture.id}
                  className="absolute"
                  style={{
                    top: `${top}px`,
                    left: "70px",
                    right: 0,
                    height: `${height}px`,
                  }}
                >
                  {/* 시작 지점 초록 점 */}
                  <div className="absolute left-[-14px] top-[6px] h-[8px] w-[8px] rounded-full bg-(--new-main-color)" />
                  <LectureCard lecture={lecture} />
                </div>
              );
            })}

            {/* 현재 시각 라인 (Mobile) - 오늘 요일 선택 시에만 표시 */}
            {currentLineOffset !== null && selectedDay === todayDayIndex && (
              <div
                className="absolute z-10 h-[2px] bg-(--new-main-color)"
                style={{
                  top: `${currentLineOffset}px`,
                  left: "62px",
                  right: 0,
                }}
              >
                <div className="absolute left-0 top-[-4px] h-[10px] w-[10px] rounded-full bg-(--new-main-color)" />
              </div>
            )}

            {/* 강의 없을 때 */}
            {selectedDayLectures.length === 0 && (
              <div
                className="absolute flex items-center justify-center"
                style={{ left: "70px", right: 0, top: 0, bottom: 0 }}
              >
                <p className="text-[13px] text-[#95969d]">
                  이 날은 강의가 없습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
