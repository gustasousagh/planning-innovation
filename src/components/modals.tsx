"use client";
import { AuthModal } from "@/features/auth/components/auth-modal";
import { CreateRoomModal } from "@/features/room/components/create-room-modal";
import { useEffect, useState } from "react";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
    <CreateRoomModal/>
      <AuthModal />
    </>
  );
};
