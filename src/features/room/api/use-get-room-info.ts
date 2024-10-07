import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
interface Props {
  id: Id<"rooms">;
}

export const useGetRoomInfo = ({id}: Props) => {
  const data = useQuery(api.rooms.getInfoById, {id});
  const isLoading = data === undefined;
  return {data, isLoading};
} 