import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface UseGetMemberProps {
  roomId: Id<"rooms">;
}

export const useGetPlayer = ({ roomId }: UseGetMemberProps) => {
  const data = useQuery(api.players.get, { roomId });
  const isLoading = data === undefined;
  return { data, isLoading };
};
