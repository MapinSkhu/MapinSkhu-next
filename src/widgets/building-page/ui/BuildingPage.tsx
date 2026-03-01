"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Building } from "@/entities/building/model/types";

interface BuildingPageProps {
  building: Building;
}

export default function BuildingPage({ building }: BuildingPageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
        <Link
          href="/"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="지도로 돌아가기"
        >
          <ArrowLeft size={20} className="text-(--new-main-color)" />
        </Link>
        <h1 className="text-lg font-bold text-(--new-main-color)">
          {building.name}
        </h1>
      </header>

      <main className="flex-1 p-4">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={building.image}
              alt={`${building.name} 건물 이미지`}
              width={600}
              height={400}
              className="h-auto w-full"
              priority
            />
          </div>

          <section className="mt-6">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              강의실 목록
            </h2>
            <p className="text-sm text-gray-500">
              강의실 정보가 준비 중입니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
