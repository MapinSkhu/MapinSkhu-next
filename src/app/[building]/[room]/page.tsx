import { notFound } from "next/navigation";
import { getBuildingBySlug } from "@/entities/building/lib/data";
import RoomDetail from "@/widgets/room-detail/ui/RoomDetail";

interface Props {
  params: Promise<{ building: string; room: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { building: slug, room } = await params;
  const building = getBuildingBySlug(slug);

  if (!building) return {};

  return {
    title: `${room}호 - ${building.name} | MapinSKHU`,
    description: `성공회대학교 ${building.name} ${room}호 강의실 정보`,
  };
}

export default async function RoomPageRoute({ params }: Props) {
  const { building: slug, room } = await params;
  const building = getBuildingBySlug(slug);

  if (!building) notFound();

  return <RoomDetail building={building} roomId={room} />;
}
