import DashboardHeader from "@/features/dashboard/components/DashboardHeader";
import { JoinRoomSection } from "@/features/dashboard/components/JoinRoomSection";
import RoomListSection from "@/features/dashboard/components/RoomListSection";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[85vh]">
      <DashboardHeader />
      <JoinRoomSection />
      <RoomListSection />
    </div>
  );
}
