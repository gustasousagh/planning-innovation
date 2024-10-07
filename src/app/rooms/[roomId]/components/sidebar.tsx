import Image from "next/image";
import { RoomsSection } from "./workspace-section";
import { useGetRooms } from "@/features/room/api/use-get-rooms";
import { SidebarItem } from "./sidebar-item";
import { HashIcon } from "lucide-react";
import { useCreateRoomModal } from "@/features/room/store/use-create-room-modal";
import Logo from "@/public/logo.svg";

import Link from "next/link";
import { useRoomId } from "@/hooks/use-room-id";

export const Sidebar = () => {
  const roomId = useRoomId();
  const { data: workspace, isLoading: workspaceLoading } = useGetRooms();
  const [_open, setOpen] = useCreateRoomModal();
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <Link href="/" className="flex items-center gap-2 px-2 py-4">
        <Image src={Logo} className="size-10" alt="Logo" />
        <h4 className="text-3xl font-semibold">
          Scrum<span className="text-primary">Player</span>
        </h4>
      </Link>
      <RoomsSection
        label="Salas"
        hint="Nova sala"
        onNew={() => setOpen(true)}
      >
        {workspace?.map((item) => (
          <SidebarItem
            key={item._id}
            icon={HashIcon}
            label={item.name}
            id={item._id}
            variant={roomId === item._id ? "active" : "default"}
          />
        ))}
      </RoomsSection>
    </div>
  );
};
