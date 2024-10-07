import { useParams } from "next/navigation"
import { Id } from "../../convex/_generated/dataModel";

export const useRoomId = () => {
  const params = useParams();
  return params.roomId as Id<"rooms">;
}