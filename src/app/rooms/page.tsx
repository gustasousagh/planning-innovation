"use client";
import { useGetRooms } from "@/features/room/api/use-get-rooms";
import { useCreateRoomModal } from "@/features/room/store/use-create-room-modal";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const RoomId = () => {
  const [open, setOpen] = useCreateRoomModal();
  const {data, isLoading} = useGetRooms();
  const router = useRouter();
  const roomId = useMemo(() => data?.[0]?._id, [data]);
  useEffect(() => {
    if(isLoading) return;;
    if(roomId){
      router.replace(`/rooms/${roomId}`)
    }else if (!open){
      setOpen(true)
    }
  },  [roomId, isLoading, open, setOpen, router])
  return <></>;
};
export default RoomId;
