import { RoomDetailContainer } from "@/features/rooms/containers/RoomDetailContainer";

interface RoomPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const resolvedParams = await params;
  const roomSlug = resolvedParams.slug;
  // console.log(roomSlug);
  // console.log("YES");

  return <RoomDetailContainer roomSlug={roomSlug} />;
}
