"use client";
import { RoomPlayers } from "./room-players";
import { MobileSidebar } from "./mobile-sidebar";
import { Button } from "@/components/ui/button";
import { InvateModal } from "./invate-modal";
import { useGetRoom } from "@/features/room/api/use-get-room";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export const Toolbar = () => {
  const roomId = useGetRoomId();
  const { data, isLoading } = useGetRoom({
    id: roomId,
  });
  const [open, setopen] = useState(false);

  if (!data) {
    return <></>;
  }
  return (
    <>
      <InvateModal
        opem={open}
        setopen={setopen}
        joinCode={data?.joinCode}
        name={data?.name}
      />
      <nav className="flex items-center h-16 px-1.5">
        <MobileSidebar />
        <div className="md:pl-56 justify-center flex w-full">
          <RoomPlayers />
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <ThemeToggle />
          <Button onClick={() => setopen(true)}>Convidar</Button>
        </div>
      </nav>
    </>
  );
};
