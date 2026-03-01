"use client";

import { useState, useEffect } from "react";
import { Building } from "@/entities/building/model/types";
import Header from "@/widgets/header/ui/Header";
import RoomHero from "./RoomHero";
import DaySelector from "./DaySelector";
import Timetable from "./Timetable";
import EquipmentInfo from "./EquipmentInfo";
import { mockRoomInfo } from "../model/mockData";
import { Lecture } from "../model/types";
import { timeToMinutes, getDayIndex } from "../lib/time";

interface RoomDetailProps {
  building: Building;
  roomId: string;
}

function getCurrentTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function findCurrentLecture(
  lectures: Lecture[],
  day: number,
  currentTime: string,
): Lecture | null {
  const now = timeToMinutes(currentTime);
  return (
    lectures.find((l) => {
      if (l.day !== day) return false;
      return (
        timeToMinutes(l.startTime) <= now && now < timeToMinutes(l.endTime)
      );
    }) ?? null
  );
}

export default function RoomDetail({ building, roomId }: RoomDetailProps) {
  const [selectedDay, setSelectedDay] = useState(() => getDayIndex(new Date()));
  const [currentTime, setCurrentTime] = useState(() => getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const roomInfo = mockRoomInfo;
  const currentLecture = findCurrentLecture(
    roomInfo.lectures,
    selectedDay,
    currentTime,
  );

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Header 높이만큼 여백 */}
      <div className="h-[60px]" />

      <main className="flex-1">
        <div className="mx-auto max-w-[1200px]">
          {/* Hero 영역 */}
          <RoomHero
            building={building}
            roomId={roomId}
            currentLecture={currentLecture}
          />

          {/* 요일 선택 + 시간표 */}
          <section className="mt-2">
            <DaySelector
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
            />
            <Timetable
              lectures={roomInfo.lectures}
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              currentTime={currentTime}
            />
          </section>

          {/* 기자재 정보 */}
          <EquipmentInfo equipment={roomInfo.equipment} />
        </div>
      </main>
    </div>
  );
}
