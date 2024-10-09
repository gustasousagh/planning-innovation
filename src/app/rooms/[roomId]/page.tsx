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
import { Check, Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const positions = [
  //1
  {
    top: "top-0",
    left: "left-8",
    transform: "translateY(-150%)",
    color: "bg-red-500",
  },
  //2
  {
    right: "right-0",
    top: "top-[-10px]",
    transform: "translateX(150%)",
    color: "bg-green-700",
  },
  // 3
  {
    bottom: "bottom-0",
    left: "left-8",
    transform: "translateY(150%)",
    color: "bg-pink-500",
  },
  // 4
  {
    left: "left-0",
    top: "top-[-10px]",
    transform: "translateX(-150%)",
    color: "bg-gray-500",
  },
  // 5
  {
    top: "top-0",
    left: "left-24",
    transform: "translateY(-150%)",
    color: "bg-green-500",
  },
  // 6
  {
    right: "right-0",
    bottom: "bottom-[-5px]",
    transform: "translateX(150%)",
    color: "bg-red-700",
  },
  // 7
  {
    bottom: "bottom-0",
    left: "left-24",
    transform: "translateY(150%)",
    color: "bg-teal-500",
  },
  // 8
  {
    left: "left-0",
    bottom: "bottom-[-5px]",
    transform: "translateX(-150%)",
    color: "bg-blue-700",
  },
  //9
  {
    top: "top-0",
    right: "right-24",
    transform: "translateY(-150%)",
    color: "bg-yellow-500",
  },
  // 10
  {
    bottom: "bottom-0",
    right: "right-24",
    transform: "translateY(150%)",
    color: "bg-orange-500",
  },

  {
    top: "top-0",
    right: "right-8",
    transform: "translateY(-150%)",
    color: "bg-purple-500",
  },

  {
    bottom: "bottom-0",
    right: "right-8",
    transform: "translateY(150%)",
    color: "bg-indigo-500",
  },
];

const RoomPlayersList = () => {
  const roomId = useGetRoomId();
  const { players, isLoading } = useGetOnlinePlayers({ roomId });
  usePlayerHeartbeat({ roomId });
  const [blockRevealButton, setBlockRevealButton] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const { data, isLoading: isRoomLoading } = useGetRoom({ id: roomId });

  const { mutate: selectNumber, isPending: isSelectingNumber } =
    useSelectNumber();
  const {
    mutate: revealNumbers,
    isPending: isRevealingNumbers,
    isSuccess,
  } = useRevealNumbers();
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
          setBlockRevealButton(true);
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
          setBlockRevealButton(false);
          toast.success("Visibilidade redefinida com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao redefinir visibilidade. Tente novamente.");
        },
      }
    );
  };
  const numbers = [0.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 22, 24];

  return (
    <div className="flex flex-col h-full justify-center items-center mt-20">
      <div className="relative w-80 h-44 rounded-md bg-blue-500/85 my-28 flex justify-center items-center">
        {players.map((player, index) => {
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
                className={`w-12 h-16 rounded-md ${position.color} flex items-center justify-center text-white`}
              >
                {!player.hasChosenNumber ? (
                  <Ellipsis />
                ) : player.selectedNumber !== undefined ? (
                  player.selectedNumber
                ) : (
                  <Check />
                )}
              </div>
              <Avatar className="mr-1">
        <AvatarImage className="rounded-md" src={player.user.image} />
        <AvatarFallback className="rounded-md bg-sky-500 text-white">
          A
        </AvatarFallback>
      </Avatar>
            </div>
          );
        })}
      </div>
      <div className="overflow-x-auto whitespace-nowrap p-4 max-w-full flex justify-center">
        <div className="flex gap-2">
          {numbers.map((number) => (
            <Button
              key={number}
              onClick={() => handleNumberClick(number)}
              className={`p-2 w-12 h-12 border border-gray-300 rounded ${
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
