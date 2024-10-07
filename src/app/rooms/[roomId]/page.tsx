"use client";
import { useGetOnlinePlayers } from "@/features/players/api/use-get-online-players";
import { usePlayerHeartbeat } from "@/features/players/api/use-player-heartbeat";
import { useRoomId } from "@/hooks/use-room-id";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSelectNumber } from "@/features/players/api/UseSelectNumberProps";
import { useRevealNumbers } from "@/features/players/api/useRevealNumbers";
import { useResetVisibility } from "@/features/room/api/useResetVisibility";
import { PlayerCard } from "./components/player-card";

const RoomPlayersList = () => {
  const roomId = useRoomId();
  const { players, isLoading } = useGetOnlinePlayers({ roomId });
  usePlayerHeartbeat({ roomId });
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const { mutate: selectNumber, isPending: isSelectingNumber } = useSelectNumber();
  const { mutate: revealNumbers, isPending: isRevealingNumbers } = useRevealNumbers();
  const { mutate: resetVisibility, isPending: isResetting } = useResetVisibility();

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    selectNumber({ roomId, number }, {
      onSuccess: () => {
        toast.success(`Número ${number} selecionado com sucesso!`);
      },
      onError: () => {
        toast.error("Erro ao selecionar número. Tente novamente.");
      },
    });
  };

  const handleRevealClick = () => {
    revealNumbers({ roomId }, {
      onSuccess: () => {
        toast.success("Números revelados com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao revelar números. Tente novamente.");
      },
    });
  };

  const handleResetClick = () => {
    resetVisibility({ roomId }, {
      onSuccess: () => {
        toast.success("Visibilidade redefinida com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao redefinir visibilidade. Tente novamente.");
      },
    });
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  const numbers = [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 22, 89];
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <ul className="flex overflow-y-auto flex-row">
        {players.map((player) => (
          <PlayerCard key={player._id} hasChosenNumber={player.hasChosenNumber} name={player.user.name} selected={typeof player.selectedNumber === "number" ? player.selectedNumber : undefined}
          image={player.user.image}/>
        ))}
      </ul>

      <div className="overflow-x-hidden whitespace-nowrap p-4">
        <div className="flex gap-2">
          {numbers.map((number) => (
             <button
             key={number}
             onClick={() => handleNumberClick(number)}
             className={`p-2 w-12 h-12 border border-gray-300 rounded ${
               selectedNumber === number ? "bg-blue-500 text-white" : "bg-white text-gray-800"
             }`}
             disabled={isSelectingNumber}
           >
             {number}
           </button>
       
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Button 
          onClick={handleRevealClick} 
          disabled={isRevealingNumbers} 
          className="bg-green-500 text-white rounded"
        >
          Revelar Números
        </Button>
        <Button 
          onClick={handleResetClick} 
          disabled={isResetting} 
          className="bg-red-500 text-white rounded"
        >
          Resetar Visibilidade
        </Button>
      </div>
    </div>
  );
};

export default RoomPlayersList;

