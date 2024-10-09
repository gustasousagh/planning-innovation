import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetRoom } from "@/features/room/api/use-get-room";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { Loader } from "lucide-react";
import { useGetPlayer } from "@/features/players/api/use-get-player";
import { UserItem } from "./use-item";

export const RoomPlayers = () => {
  const roomId = useGetRoomId();
  const { data: workspace, isLoading: workspaceLoading } = useGetRoom({
    id: roomId,
  });

  const { data: members, isLoading: membersLoading } = useGetPlayer({
    roomId,
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="lg" className="w-full">
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="center" side="bottom">
        {members?.map((item) => (
          <UserItem
            id={item._id}
            key={item._id}
            label={item.user.name}
            image={item.user.image}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
