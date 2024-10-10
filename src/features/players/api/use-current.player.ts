import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel";

interface UseCurrentPlayerProps {
  roomId: Id<"rooms">;
}

export const useCurrentPlayer = ({roomId}: UseCurrentPlayerProps) => {
  const data = useQuery(api.players.current, {roomId});
  const isLoading = data === undefined;
  return {data, isLoading}
}