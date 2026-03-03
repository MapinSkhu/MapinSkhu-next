"use client";

import { useState, useEffect } from "react";
import Header from "@/widgets/header/ui/Header";
import BuildingIcon from "@/entities/building/ui/BuildingIcon";
import BuildingModal from "@/entities/building/ui/BuildingModal";
import { buildings } from "@/entities/building/lib/data";
import { Building } from "@/entities/building/model/types";
import { useBreakpoint } from "@/shared/lib/useMediaQuery";

export default function CampusMap() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBuildingClick = (building: Building) => {
    setSelectedBuilding(building);
  };

  const handleCloseModal = () => {
    setSelectedBuilding(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white">
        <img
          src="/images/main/maploading.gif"
          alt="Loading"
          width={250}
          height={250}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Header />

      {/* 배경 이미지 */}
      <div className="fixed inset-0 -z-10">
        {isMobile ? (
          <img
            src="/images/main/M_back.png"
            alt="Campus Map Mobile"
            className="h-full w-full object-fill"
          />
        ) : (
          <img
            src="/images/main/P_back_new.png"
            alt="Campus Map"
            className="h-full w-full object-fill"
          />
        )}
      </div>

      {/* 건물 아이콘들 */}
      <div className="relative h-screen w-screen">
        {buildings.map((building) => (
          <BuildingIcon
            key={building.id}
            building={building}
            onClick={() => handleBuildingClick(building)}
            isActive={selectedBuilding?.id === building.id}
          />
        ))}
      </div>

      {/* 건물 모달 */}
      {selectedBuilding && (
        <BuildingModal building={selectedBuilding} onClose={handleCloseModal} />
      )}
    </div>
  );
}
