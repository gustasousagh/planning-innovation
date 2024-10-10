import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface Props {
  roomId: Id<"rooms">;
}

export const useGetOnlinePlayers = ({ roomId }: Props) => {
  const data = useQuery(api.players.getOnlinePlayers, { roomId });
  const isLoading = data === undefined;

  return { data: data ?? [], isLoading };
};
