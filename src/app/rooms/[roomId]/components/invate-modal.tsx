import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRoomId } from "@/hooks/use-room-id";
// import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
// import { useConfirm } from "@/hooks/use-confirm";
import { CopyIcon, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

interface Props {
  opem: boolean;
  setopen: (open: boolean) => void;
  name: string;
  joinCode: string;
}

export const InvateModal = ({ opem, setopen, name, joinCode }: Props) => {
  const roomId = useRoomId();
  // const [ConfirmDialog, confirm] = useConfirm(
  //   "tem certeza",
  //   "deu errrufgyuu"
  // )
  // const { mutate, isPending } = useNewJoinCode();
  // const handleNewCode = async () => {
  //   const ok = await confirm();
  //   if(!ok) return;
  //   mutate({roomId}, {
  //     onSucess: ()=> {
  //       toast.success("gugiu")
  //     },
  //     onError: () => {
  //       toast.error("gyyu")
  //     }
  //   })
  // }
  const handleCopy = () => {
    const invateLink = `${window.location.origin}/join/${roomId}`;
    navigator.clipboard
    .writeText(invateLink)
    .then(() => {toast.success("Invate link copiado")})
  }
  return (
    <> 
    {/* <ConfirmDialog/> */}
    <Dialog open={opem} onOpenChange={setopen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite {name}</DialogTitle>
          <DialogDescription>use the code {name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 items-center justify-center py-10">
          <p className="text-4xl font-bold tracking-widest uppercase">{joinCode}</p>
          <Button
          onClick={handleCopy}
          variant={"ghost"}
          size={"sm"}
          >
            Copiar
            <CopyIcon className="size-4 ml-2"/>
          </Button>
        </div>
        <div className="flex items-center justify-between w-full">
          <Button variant="outline">
            New code
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
