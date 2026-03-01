import { notFound } from "next/navigation";
import { buildings, getBuildingBySlug } from "@/entities/building/lib/data";
import BuildingPage from "@/widgets/building-page/ui/BuildingPage";

interface Props {
  params: Promise<{ building: string }>;
}

export function generateStaticParams() {
  return buildings
    .filter((b) => !b.link.startsWith("http"))
    .map((b) => ({ building: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { building: slug } = await params;
  const building = getBuildingBySlug(slug);

  if (!building) return {};

  return {
    title: `${building.name} | MapinSKHU`,
    description: `성공회대학교 ${building.name} 건물 정보`,
  };
}

export default async function BuildingPageRoute({ params }: Props) {
  const { building: slug } = await params;
  const building = getBuildingBySlug(slug);

  if (!building) notFound();

  return <BuildingPage building={building} />;
}
