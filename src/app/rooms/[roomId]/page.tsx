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
const mockPlayers = [
  { _id: "player_1", user: { name: "Player 1" } },
  { _id: "player_2", user: { name: "Player 2" } },
  { _id: "player_3", user: { name: "Player 3" } },
  { _id: "player_4", user: { name: "Player 4" } },
  { _id: "player_5", user: { name: "Player 5" } },
  { _id: "player_6", user: { name: "Player 6" } },
  { _id: "player_7", user: { name: "Player 7" } },
  { _id: "player_8", user: { name: "Player 8" } },
  { _id: "player_9", user: { name: "Player 9" } },
  { _id: "player_10", user: { name: "Player 10" } },
  { _id: "player_11", user: { name: "Player 11" } },
  { _id: "player_12", user: { name: "Player 12" } },
];

const positions = [
  //1
  {
    top: "top-0",
    left: "left-0",
    transform: "translateY(-120%)",
    color: "bg-red-500",
  },
  //2
  {
    right: "right-0",
    top: "top-[-60px]",
    transform: "translateX(120%)",
    color: "bg-green-700",
  },
  // 3
  {
    bottom: "bottom-0",
    left: "left-0",
    transform: "translateY(120%)",
    color: "bg-pink-500",
  },
  // 4
  {
    left: "left-0",
    top: "top-[-60px]",
    transform: "translateX(-120%)",
    color: "bg-gray-500",
  },
  // 5
  {
    top: "top-0",
    left: "left-16 lg:left-20",
    transform: "translateY(-120%)",
    color: "bg-green-500",
  },
  // 6
  {
    right: "right-0",
    bottom: "bottom-[-60px]",
    transform: "translateX(120%)",
    color: "bg-red-700",
  },
  // 7
  {
    bottom: "bottom-0",
    left: "left-16 lg:left-20",
    transform: "translateY(120%)",
    color: "bg-teal-500",
  },
  // 8
  {
    left: "left-0",
    bottom: "bottom-[-60px]",
    transform: "translateX(-120%)",
    color: "bg-blue-700",
  },
  //9
  {
    top: "top-0",
    right: "right-16 lg:right-20",
    transform: "translateY(-120%)",
    color: "bg-yellow-500",
  },
  // 10
  {
    bottom: "bottom-0",
    right: "right-16 lg:right-20",
    transform: "translateY(120%)",
    color: "bg-orange-500",
  },

  {
    top: "top-0",
    right: "right-0",
    transform: "translateY(-120%)",
    color: "bg-purple-500",
  },

  {
    bottom: "bottom-0",
    right: "right-0",
    transform: "translateY(120%)",
    color: "bg-indigo-500",
  },
];

const RoomPlayersList = () => {
  const roomId = useGetRoomId();
  const { players, isLoading } = useGetOnlinePlayers({ roomId });
  // const players = mockPlayers;
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
    <div className="flex flex-col h-full justify-between items-center">
      <div className="" />
      <div className="relative w-64 h-32 lg:w-80 lg:h-44 rounded-xl bg-blue-500/85 my-28 flex justify-center items-center ">
        <div className="flex gap-4 mb-4 justify-center">
          <Button
            onClick={handleRevealClick}
            disabled={isSuccess || data?.numbersRevealed}
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
                className={`w-12 lg:w-16 lg:h-20 h-16 rounded-md ${position.color} flex items-center justify-center text-white`}
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
          {numbers.map((number) => (
            <Button
              key={number}
              onClick={() => handleNumberClick(number)}
              className={`p-2 w-20 h-32 border border-gray-300 rounded transform ${
                selectedNumber === number
                  ? "bg-blue-500 text-white scale-110"
                  : "bg-white text-gray-800"
              }`}
              disabled={isSelectingNumber || data?.numbersRevealed}
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
