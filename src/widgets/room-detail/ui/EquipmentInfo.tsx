"use client";

import { useState } from "react";
import { ArmchairIcon, Plug, TriangleAlert } from "lucide-react";
import { Equipment } from "../model/types";

interface EquipmentInfoProps {
  equipment: Equipment;
}

export default function EquipmentInfo({ equipment }: EquipmentInfoProps) {
  const [helpfulClicked, setHelpfulClicked] = useState(false);

  return (
    <section className="border-t border-gray-100 px-4 py-6 md:px-6">
      {/* 섹션 헤더 */}
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-[1.6rem] font-bold text-[#454549]">
          강의실 기자재 정보
        </h2>
        <p className="flex items-center gap-1 text-[1.1rem] text-[#95969d]">
          <TriangleAlert size={13} />
          학기 도중 변동될 수 있습니다
        </p>
      </div>

      {/* 기자재 목록 */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* 좌석 */}
        <div className="flex items-center gap-3 rounded-[10px] bg-gray-50 px-4 py-3">
          <ArmchairIcon
            size={22}
            className="shrink-0 text-(--new-main-color)"
          />
          <div>
            <p className="text-[1.3rem] font-semibold text-[#454549]">
              좌석 {equipment.seats}개
            </p>
            {equipment.seatNote && (
              <p className="text-[1.1rem] text-[#95969d]">
                {equipment.seatNote}
              </p>
            )}
          </div>
        </div>

        {/* 콘센트 */}
        <div className="flex items-center gap-3 rounded-[10px] bg-gray-50 px-4 py-3">
          <Plug
            size={22}
            className="shrink-0 text-(--new-main-color)"
          />
          <div>
            <p className="text-[1.3rem] font-semibold text-[#454549]">
              콘센트 {equipment.outlets}개
            </p>
            {equipment.outletNote && (
              <p className="text-[1.1rem] text-[#95969d]">
                {equipment.outletNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 피드백 */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-[1.2rem] text-[#95969d]">
          이 정보가 도움이 되셨나요?
        </p>
        <button
          onClick={() => setHelpfulClicked(true)}
          disabled={helpfulClicked}
          className="rounded-[8px] bg-(--new-main-color) px-6 py-2 text-[1.3rem] font-semibold text-white transition-opacity disabled:opacity-60"
        >
          {helpfulClicked ? "감사합니다!" : "도움이 되었어요"}
        </button>
      </div>
    </section>
  );
}
