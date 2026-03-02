import Image from "next/image";
import { Building } from "@/entities/building/model/types";
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
  return (
    <section className="relative w-full">
      {/* 건물 배경 이미지 */}
      <div className="relative h-[240px] w-full overflow-hidden md:h-[320px]">
        <Image
          src={building.image}
          alt={building.name}
          fill
          className="object-cover object-center"
          priority
        />
        {/* 아래로 페이드 아웃 그라데이션 */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/60 to-white" />
      </div>

      {/* 텍스트 오버레이 */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-6 text-center">
        <p className="mb-4 text-[1.3rem] font-bold text-(--mapin-gray-900) md:text-[1.6rem]">
          {building.name}
        </p>

        <h1 className="text-[6rem] font-extrabold leading-none text-(--mapin-gray-900) md:text-[8rem]">
          {roomId}
        </h1>

        {/* 현재 강의 상태 */}
        <div className="mt-3 flex flex-col items-center gap-12">
          {currentLecture ? (
            <p className="text-[1.3rem] font-medium text-(--mapin-gray-900)">
              현재{" "}
              <span className="rounded-[4px] border border-(--mapin-red-200) bg-(--mapin-red-100) px-[6px] py-[2px] text-[1.2rem] font-semibold text-(--mapin-red-900)">
                {currentLecture.name}
              </span>{" "}
              강의 중입니다.
            </p>
          ) : (
            <p className="text-[1.3rem] font-medium text-(--mapin-gray-900)">
              현재 강의가 없습니다.
            </p>
          )}
          <p className="text-[1.1rem] text-(--mapin-gray-700)">
            ⚠ 강의 자체 휴강은 표시되지 않습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
