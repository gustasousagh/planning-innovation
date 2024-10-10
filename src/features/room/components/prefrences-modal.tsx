import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateRoom } from "../api/use-update-room";
import { useRemoveRoom } from "../api/use-remove-room";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

export const PreferenceModel = ({ open, setOpen, initialValue }: Props) => {
  const roomId = useGetRoomId()
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false)
  const {mutate: updateWorkspace, isPending: PedingUpdate} = useUpdateRoom();
  const {mutate: removeWorkspace, isPending: PedingRemove} = useRemoveRoom();
  const handlerEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateWorkspace({
      id: roomId,
      name: value
    }, {
      onSucess: () => {
        setEditOpen(false)
        toast.success("workspace Atualizado")
      },
      onError: () => {
        toast.error("failed")
      }
    })
  }
  const handlerRemove = async () => {
    
    removeWorkspace({
      id: roomId,
    }, {
      onSuccess: () => {
        router.replace("/")
        toast.success("workspace Remove")
      },
      onError: () => {
        toast.error("failed")
      }
    })
  }
  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
    <DialogTrigger asChild>
      <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-s font-semibold">Workspace</p>
              <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
            </div>
            <p className="text-sm">{value}</p>
          </div>
    </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                renomear
              </DialogTitle>
              <form className="space-y-4" onSubmit={handlerEdit}>
                <Input
                value={value}
                disabled={PedingUpdate}
                onChange={(e) => setValue(e.target.value)}
                required
                autoFocus
                minLength={3}
                maxLength={80}
                placeholder="WorkSpace name"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button type="submit">
                    Salvar
                  </Button>
                </DialogFooter>
              </form>
            </DialogHeader>
          </DialogContent>
          </Dialog>
          <button
          disabled={false}
          onClick={handlerRemove}
          className="flex items-center gap-y-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <Trash className="size-4"/>
            <p className="text-sm font-semibold">Deletar</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};
