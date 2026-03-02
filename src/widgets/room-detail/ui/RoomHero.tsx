import Image from "next/image";
import { Building } from "@/entities/building/model/types";
import { getRoomImage } from "@/entities/classroom/lib/data";
import { Lecture } from "../model/types";

interface RoomHeroProps {
  building: Building;
  roomId: string;
  currentLecture: Lecture | null;
}

export default function RoomHero({
  building,
  roomId,
  currentLecture,
}: RoomHeroProps) {
  const heroImage = getRoomImage(roomId) ?? building.image;

  return (
    <section className="relative w-full">
      {/* 강의실 or 건물 배경 이미지 */}
      <div className="relative h-[240px] w-full overflow-hidden md:h-[320px]">
        <Image
          src={heroImage}
          alt={`${building.name} ${roomId}호`}
          fill
          className="object-cover object-center"
          priority
        />
        {/* 아래로 페이드 아웃 그라데이션 */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/60 to-white" />
      </div>

      {/* 텍스트 오버레이 */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-6 text-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <p className="typo-heading-sm-bd text-(--mapin-gray-900)">
            {building.name}
          </p>

          <h1 className="typo-heading-5xl text-(--mapin-gray-900)">{roomId}</h1>

          {/* 현재 강의 상태 */}
          {currentLecture ? (
            <p className="mt-2 typo-body-md-md-20 font-medium text-(--mapin-gray-900)">
              현재{" "}
              <span className="rounded-[4px] border border-(--mapin-red-200) bg-(--mapin-red-100) px-[6px] py-[2px] text-xs font-semibold text-(--mapin-red-900)">
                {currentLecture.name}
              </span>{" "}
              강의 중입니다.
            </p>
          ) : (
            <p className="mt-2 typo-body-md-md-20 font-medium text-(--mapin-gray-900)">
              현재 강의가 없습니다.
            </p>
          )}
        </div>

        <p className="text-md-md-20 text-(--mapin-gray-700)">
          ⚠ 강의 자체 휴강은 표시되지 않습니다.
        </p>
      </div>
    </section>
  );
}
