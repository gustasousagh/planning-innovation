import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetRooms = () => {
  const data = useQuery(api.rooms.get);
  const isLoading = data === undefined;
  return {data, isLoading};
} 