"use client";

import { Building } from "@/entities/building/model/types";
import { useBreakpoint } from "@/shared/lib/useMediaQuery";

interface BuildingIconProps {
  building: Building;
  onClick: () => void;
  isActive: boolean;
}

export default function BuildingIcon({
  building,
  onClick,
  isActive,
}: BuildingIconProps) {
  const breakpoint = useBreakpoint();

  const position = building.position[breakpoint];

  const positionStyle: React.CSSProperties = {
    top: position.top,
    left: position.left,
    right: position.right,
  };

  const isMobile = breakpoint === "mobile";

  return (
    <div
      className="absolute cursor-pointer"
      style={positionStyle}
      onClick={onClick}
    >
      <img
        src={building.icon}
        alt={building.name}
        className={`animate-bounce transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-70"
        }`}
        style={{
          filter: "drop-shadow(0.5vw 0.5vw 0.5vw var(--new-main-color))",
          width: isMobile ? "10vw" : breakpoint === "tablet" ? "5.5vw" : "4.5vw",
          height: "auto",
        }}
      />
    </div>
  );
}
