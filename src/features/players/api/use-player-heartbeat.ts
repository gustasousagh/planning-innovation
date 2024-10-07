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
    // Envia um "heartbeat" a cada 30 segundos
    const intervalId = setInterval(() => {
      updatePresence({ roomId });
    }, 30000);

    // Limpa o intervalo se o componente desmontar (ou o navegador fechar)
    return () => clearInterval(intervalId);
  }, [updatePresence, roomId]);
};
