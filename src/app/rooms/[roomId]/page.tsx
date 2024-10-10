"use client";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSelectNumber } from "@/features/players/api/Use-select-number-props";
import { useRevealNumbers } from "@/features/room/api/use-reveal-numbers";
import { useResetVisibility } from "@/features/room/api/use-reset-visibility";
import { LoadingScreen } from "@/components/loading";
import { useGetRoom } from "@/features/room/api/use-get-room";
import { useGetOnlinePlayers } from "@/features/players/api/use-get-online-players";
import { usePlayerHeartbeat } from "@/features/players/api/use-player-heartbeat";
import { AlertTriangle, Check, Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentPlayer } from "@/features/players/api/use-current.player";
import { positions } from "@/features/players/utils/positions-players";
import { useRouter } from "next/navigation";

const RoomPlayersList = () => {
  const route = useRouter();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const roomId = useGetRoomId();
  usePlayerHeartbeat({ roomId });

  const { data: onlinePlayers } = useGetOnlinePlayers({ roomId });
  const { data: room, isLoading: roomLoading } = useGetRoom({ id: roomId });
  const { data: currentPlayer, isLoading: currentPlayerLoading } =
    useCurrentPlayer({
      roomId,
    });

  const { mutate: selectNumber, isPending: isSelectingNumber } =
    useSelectNumber();
  const { mutate: revealNumbers, isPending: isRevealingNumbers } =
    useRevealNumbers();
  const { mutate: resetVisibility, isPending: isResetting } =
    useResetVisibility();

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    selectNumber(
      { roomId, number },
      {
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
          toast.success("Visibilidade redefinida com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao redefinir visibilidade. Tente novamente.");
        },
      }
    );
  };

  const numbers = [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 22, 24];
  if (roomLoading || currentPlayerLoading) {
    return <LoadingScreen />;
  }
  if (!room || !currentPlayer) {
    return (
      <div className="flex flex-col gap-y-2 h-full items-center justify-center">
        <AlertTriangle className="size-7" />
        <p className=" text-sm text-center">
          {"Você não tem permissão para ver esta sala"}
          <br />
          {"ou ela não existe."}
        </p>
        <Button onClick={() => route.push(`/join/${roomId}`)}>
          Entrar na sala
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full justify-between items-center">
      <div className="" />
      <div className="relative w-64 h-32 lg:w-80 lg:h-44 rounded-xl bg-blue-500/85 my-28 flex justify-center items-center ">
        <div className="flex gap-4 mb-4 justify-center">
          <Button
            onClick={handleRevealClick}
            disabled={room?.numbersRevealed}
            className="bg-green-500 text-white rounded"
          >
            Revelar
          </Button>
          <Button
            onClick={handleResetClick}
            disabled={isResetting}
            className="bg-red-500 text-white rounded"
          >
            Resetar
          </Button>
        </div>
        {onlinePlayers.map((player, index) => {
          console.log(player.selectedNumber);

          const position = positions[index];
          return (
            <div
              key={player._id}
              className={`absolute ${position.top || ""} ${position.bottom || ""} ${position.left || ""} ${position.right || ""}  flex items-center justify-center flex-col gap-y-2 text-white`}
              style={{
                transform: position.transform,
              }}
            >
              <div
                className={`w-12 lg:w-16 lg:h-20 h-16 rounded-md ${position.color} flex items-center justify-center text-white`}
              >
                {!player.hasChosenNumber ? (
                  <Ellipsis />
                ) : room?.numbersRevealed ? (
                  player.selectedNumber
                ) : (
                  <Check />
                )}
              </div>
              <Avatar className="mr-1">
                <AvatarImage className="rounded-md " src={player.user.image} />
                <AvatarFallback className="rounded-md bg-sky-500 text-white">
                  {player.user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          );
        })}
      </div>

      <div className="flex w-full items-center justify-center overflow-x-scroll p-4">
        <div className="inline-flex gap-2 w-max mx-5">
          {room.choices?.map((number) => (
            <Button
              key={number}
              onClick={() => handleNumberClick(number)}
              className={`p-2 w-20 h-32 border border-gray-300 rounded transform ${
                selectedNumber === number
                  ? "bg-blue-500 text-white scale-110"
                  : "bg-white text-gray-800"
              }`}
              disabled={isSelectingNumber || room?.numbersRevealed}
            >
              {number}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomPlayersList;
