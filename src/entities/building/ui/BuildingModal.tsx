"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Building } from "@/entities/building/model/types";
import { useBreakpoint } from "@/shared/lib/useMediaQuery";

interface BuildingModalProps {
  building: Building;
  onClose: () => void;
}

export default function BuildingModal({
  building,
  onClose,
}: BuildingModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const isExternalLink = building.link.startsWith("http");
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const hl = building.highlight;

  return (
    <>
      {/* PC/태블릿: 하이라이트 박스 모달 */}
      {!isMobile && hl && (
        <div className="fixed inset-0 z-999 animate-[fadeIn_0.3s_ease-out]" onClick={onClose}>
          {/* 어두운 오버레이 (하이라이트 영역만 투명하게 뚫림) */}
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <mask id="highlight-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect
                  x={hl.left}
                  y={hl.top}
                  width={hl.width}
                  height={hl.height}
                  rx="10"
                  fill="black"
                />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.4)"
              mask="url(#highlight-mask)"
            />
          </svg>

          {/* 하이라이트 박스 (글래스모피즘) */}
          <div
            className="absolute animate-[highlightIn_1s_ease-out] rounded-[10px] bg-transparent shadow-[0_8px_32px_0_rgba(0,0,0,0.664)]"
            style={{
              top: hl.top,
              left: hl.left,
              width: hl.width,
              height: hl.height,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* X 닫기 버튼 - 박스 바깥 우측 상단 */}
            <button
              onClick={onClose}
              className="absolute -right-4 -top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-(--new-main-color) transition-transform hover:scale-110"
            >
              <X size={28} strokeWidth={3} />
            </button>

            {/* 바로가기 버튼 - 박스 안 하단 중앙 */}
            <div className="absolute bottom-[-24px] left-0 flex w-full justify-center">
              <Link
                href={building.link}
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center whitespace-nowrap rounded-[50vw] bg-(--new-sub-color) px-8 py-3 text-[15px] font-bold text-(--new-main-color) no-underline shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform hover:scale-105"
              >
                {building.name} 바로가기
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 모바일: 기존 슬라이드업 모달 */}
      {isMobile && (
        <div
          className="fixed inset-0 z-999 bg-black/40"
          onClick={onClose}
        >
          <div
            className="fixed left-0 top-[30%] flex h-[70vh] w-full animate-[slideUpMobile_0.5s_ease-out] flex-col items-center justify-center rounded-none bg-black/55 shadow-[0_8px_32px_0_rgba(0,0,0,0.664)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-[5%] top-0 flex h-[6vh] w-[6vw] cursor-pointer items-center justify-center text-[10vw] font-bold text-(--new-sub-color) transition-colors"
            >
              ×
            </button>

            <div className="absolute top-[10%] grid grid-cols-1 grid-rows-[1.5fr_1fr] place-items-center">
              <div className="relative mb-[5vh] h-[38vh] w-[70vw]">
                <img
                  src={building.image}
                  alt={building.name}
                  className="h-full w-full object-contain"
                />
              </div>

              <Link
                href={building.link}
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noopener noreferrer" : undefined}
                className="mb-[20vh] flex h-[6vh] w-[60vw] items-center justify-center rounded-[50vw] bg-(--new-sub-color) text-[17px] font-bold text-(--new-main-color) no-underline shadow-[0.5vw_0.5vh_0_0_var(--new-main-color)] transition-transform hover:scale-105"
              >
                {building.name.length > 10
                  ? building.name.split("/").map((name, i) => (
                      <span key={i}>
                        {name}
                        {i === 0 && <br />}
                      </span>
                    ))
                  : `${building.name} 바로가기`}
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes highlightIn {
          from {
            opacity: 0;
            transform: scale(1.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUpMobile {
          from { top: 90%; }
          to { top: 30%; }
        }
      `}</style>
    </>
  );
}
