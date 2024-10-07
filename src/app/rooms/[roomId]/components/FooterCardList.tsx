"use client"
import { useGetOnlinePlayers } from "@/features/players/api/use-get-online-players";
import { usePlayerHeartbeat } from "@/features/players/api/use-player-heartbeat";
import { useRoomId } from "@/hooks/use-room-id";
import { useState } from "react";

const RoomPlayersList = () => {
  const roomId = useRoomId();
  const { players, isLoading } = useGetOnlinePlayers({ roomId });
  usePlayerHeartbeat({ roomId });
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  const numbers = [0.3, 1, 2, 4, 8, 12, 14, 16, 18, 20, 22, 24];

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    console.log("Número selecionado:", number);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-grow overflow-y-auto p-4">
        {players.map((player) => (
          <li key={player.userId} className="p-2 border-b border-gray-300">
            {player.userId || "Jogador"} (Online)
          </li>
        ))}
      </ul>
      <div className="overflow-x-auto whitespace-nowrap p-4">
        <div className="flex gap-2">
          {numbers.map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              className={`p-2 border border-gray-300 rounded ${
                selectedNumber === number ? "bg-blue-500 text-white" : "bg-white text-gray-800"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomPlayersList;
