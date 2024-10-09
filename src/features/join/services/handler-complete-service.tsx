import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { useJoin } from "../api/use-join";

export const useJoinRoom = () => {
  const router = useRouter();
  const { mutate, isPending } = useJoin();

  const handleComplete = (roomId: Id<"rooms">, value: string) => {
    mutate(
      { roomId, joinCode: value },
      {
        onSuccess: (id) => {
          router.replace(`/rooms/${id}`);
          toast.success("Parabéns, agora você faz parte do time!");
        },
        onError: () => {
          toast.error("Código inválido ou expirado.");
        },
      }
    );
  };

  return { handleComplete, isPending };
};
