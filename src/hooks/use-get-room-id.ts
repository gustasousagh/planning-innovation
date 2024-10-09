import { useParams } from "next/navigation"
import { Id } from "../../convex/_generated/dataModel";

export const useGetRoomId = () => {
  const params = useParams();
  return params.roomId as Id<"rooms">;
}