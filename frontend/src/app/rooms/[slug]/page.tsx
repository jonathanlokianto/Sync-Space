import { ContentForm } from "@/features/rooms/components/ContentForm";
import { ContentHeader } from "@/features/rooms/components/ContentHeader";

interface RoomPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const resolvedParams = await params;
  const roomSlug = resolvedParams.slug;
  console.log(roomSlug);
  console.log("YES");

  return (
    <section className="flex flex-col flex-1 w-full h-full p-4 md:p-6 gap-4 max-w-6xl mx-auto">
      <ContentHeader roomSlug={roomSlug} />
      <ContentForm />
    </section>
  );
}