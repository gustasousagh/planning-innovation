"use client";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

interface Props {
  roomId: Id<"rooms">;
}

export const usePlayerHeartbeat = ({ roomId }: Props) => {
  const updatePresence = useMutation(api.players.updatePlayerPresence);
  useEffect(() => {
    updatePresence({ roomId });
    const intervalId = setInterval(() => {
      updatePresence({ roomId });
    }, 30000);
    return () => clearInterval(intervalId);
  }, [updatePresence, roomId]);
};
