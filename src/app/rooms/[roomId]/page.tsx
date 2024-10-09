"use client";
import { useGetOnlinePlayers } from "@/features/players/api/use-get-online-players";
import { usePlayerHeartbeat } from "@/features/players/api/use-player-heartbeat";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSelectNumber } from "@/features/players/api/Use-select-number-props";
import { useRevealNumbers } from "@/features/room/api/use-reveal-numbers";
import { useResetVisibility } from "@/features/room/api/use-reset-visibility";
import { LoadingScreen } from "@/components/loading";
import { PlayerCard } from "@/features/players/components/player-card";
import { useGetRoom } from "@/features/room/api/use-get-room";

const RoomPlayersList = () => {
  const roomId = useGetRoomId();
  const { players, isLoading } = useGetOnlinePlayers({ roomId });
  usePlayerHeartbeat({ roomId });
  const [blockRevealButton, setBlockRevealButton] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const { data, isLoading: isRoomLoading } = useGetRoom({id: roomId});

  const { mutate: selectNumber, isPending: isSelectingNumber } =
    useSelectNumber();
  const { mutate: revealNumbers, isPending: isRevealingNumbers, isSuccess } =
    useRevealNumbers();
    console.log("isSuccess (Reveal Numbers):", isSuccess);
  const { mutate: resetVisibility, isPending: isResetting } =
    useResetVisibility();

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    selectNumber(
      { roomId, number },
      {
        onSuccess: () => {
          toast.success(`Número ${number} selecionado com sucesso!`);
        },
        onError: () => {
          toast.error("Erro ao selecionar número. Tente novamente.");
        },
      }
    );
  };

  const handleRevealClick = () => {
    revealNumbers(
      { roomId },
      {
        onSuccess: () => {
          setBlockRevealButton(true)
          toast.success("Números revelados com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao revelar números. Tente novamente.");
        },
      }
    );
  };

  const handleResetClick = () => {
    resetVisibility(
      { roomId },
      {
        onSuccess: () => {
          setBlockRevealButton(false)
          toast.success("Visibilidade redefinida com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao redefinir visibilidade. Tente novamente.");
        },
      }
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  const numbers = [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 24];
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <ul className="flex overflow-y-auto flex-row max-h-96 w-full justify-center">
        {players.map((player) => (
          <PlayerCard
            key={player._id}
            hasChosenNumber={player.hasChosenNumber}
            name={player.user.name}
            selected={
              typeof player.selectedNumber === "number"
                ? player.selectedNumber
                : undefined
            }
            image={player.user.image}
          />
        ))}
      </ul>
     
      <div className="overflow-x-auto p-4 max-w-full flex justify-center">
  <div
    className="grid gap-4 w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 "
    style={{
      maxWidth: "100%",
    }}
  >
    {numbers.map((number) => (
      <Button
        key={number}
        onClick={() => handleNumberClick(number)}
        className={`aspect-[3/4] h-[180px] border border-gray-300 rounded-lg ${
          selectedNumber === number
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-800"
        }`}
        disabled={isSelectingNumber || data?.numbersRevealed}
      >
        {number}
      </Button>
    ))}
  </div>
</div>


      <div className="flex gap-4 mt-4 justify-center">
        <Button
          onClick={handleRevealClick}
          disabled={isSuccess || data?.numbersRevealed}
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
