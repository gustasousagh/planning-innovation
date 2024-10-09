import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface Props {
  opem: boolean;
  setopen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InvateModal = ({ opem, setopen, name, joinCode }: Props) => {
  const roomId = useGetRoomId();

  const handleCopy = () => {
    const invateLink = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard.writeText(invateLink).then(() => {
      toast.success("Link copiado!");
    });
  };

  return (
    <>
      <Dialog open={opem} onOpenChange={setopen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convide jogadores para a sala {name}</DialogTitle>
            <DialogDescription>
              Clique em Copiar e envie o link para o usuário. Ele precisará inserir o código abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="text-4xl font-bold tracking-widest uppercase">
              {joinCode}
            </p>
            <Button onClick={handleCopy} variant={"ghost"} size={"sm"}>
              Copiar
              <CopyIcon className="size-4 ml-2" />
            </Button>
          </div>
          <div className="flex items-center justify-between w-full">
            <Button variant="outline">
              Novo código
              <RefreshCcw className="size-4 ml-2" />
            </Button>
            <DialogClose asChild>
              <Button>Fechar</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
