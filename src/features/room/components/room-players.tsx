import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetRoom } from "@/features/room/api/use-get-room";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { AlertTriangle, Loader } from "lucide-react";
import { useGetPlayer } from "@/features/players/api/use-get-player";
import { UserItem } from "./use-item";
import { useState } from "react";
import { PreferenceModel } from "./prefrences-modal";
import { LoadingScreen } from "@/components/loading";

export const RoomPlayers = () => {
  const [open, setOpen] = useState(false);
  const roomId = useGetRoomId();
  const { data: room, isLoading: roomLoading } = useGetRoom({
    id: roomId,
  });

  const { data: members, isLoading: membersLoading } = useGetPlayer({
    roomId,
  });
  if (roomLoading || membersLoading) {
    return (
      <LoadingScreen />
    );
  }
  if (!room || !members) {
    return (
      <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className=" size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }
  return (
    <> 
    <PreferenceModel
        open={open}
        setOpen={setOpen}
        initialValue={room?.name}
      />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="lg" className="w-full">
          {roomLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            room?.name
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="center" side="bottom">
        <DropdownMenuItem
      onClick={() => setOpen(true)}

        className="cursor-pointer capitalize mb-2">
          <div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
            {room?.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col items-start">
            <p className="font-bold">{room?.name}</p>
            <p className="text-sx text-muted-foreground">Sala ativa</p>
          </div>
        </DropdownMenuItem>
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
    </>
   
  );
};
