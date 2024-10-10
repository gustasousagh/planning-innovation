import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { CheckCheck, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateRoom } from "../api/use-update-room";
import { useRemoveRoom } from "../api/use-remove-room";
import { useGetRoom } from "../api/use-get-room";
import { useAddChoices } from "../api/use-add-choices";
import { useDeleteOptions } from "../api/use-remove-choices";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PreferenceModel = ({ open, setOpen }: Props) => {
  const roomId = useGetRoomId();
  const { data: room, isLoading: roomLoading } = useGetRoom({
    id: roomId,
  });
  const router = useRouter();
  const [name, setName] = useState(room?.name || "");
  const { mutate: updateWorkspace, isPending: pendingUpdate } = useUpdateRoom();
  const { mutate: removeWorkspace, isPending: pendingRemove } = useRemoveRoom();
  const { mutate: addChoices } = useAddChoices();
  const { mutate: deleteOption } = useDeleteOptions();
  const [inputValue, setInputValue] = useState<number | "">("");
  const [options, setOptions] = useState<number[]>(room?.choices || []);
  console.log(...options);
  const addOption = () => {
    if (inputValue !== "" && !isNaN(inputValue)) {
      const newOptions = [...options, inputValue];
      setInputValue("");
      addChoices(
        { roomId, newChoices: newOptions },
        {
          onSucess: () => toast.success("Opção adicionada"),
          onError: () => toast.error("Erro ao adicionar opção"),
        }
      );
    }
  };
  const handleDeleteOption = (optionToDelete: number) => {
    const newOptions = options.filter((option) => option !== optionToDelete);
    setOptions(newOptions);

    deleteOption(
      { roomId, choicesToRemove: [optionToDelete] },
      {
        onSucess: () => toast.success("Opção removida"),
        onError: () => toast.error("Erro ao remover opção"),
      }
    );
  };
  const handlerEdit = () => {
    updateWorkspace(
      {
        id: roomId,
        name,
      },
      {
        onSucess: () => {
          toast.success(" Atualizado");
        },
        onError: () => {
          toast.error("failed");
        },
      }
    );
  };
  const handlerRemove = async () => {
    removeWorkspace(
      {
        id: roomId,
      },
      {
        onSuccess: () => {
          router.replace("/rooms");
          toast.success("Sala removida");
        },
        onError: () => {
          toast.error("Error ao deletar Sala");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{room?.name}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 rounded-lg border cursor-pointer">
            <div className="flex items-center justify-between">
              <p className="text-md font-semibold">Renomear sala</p>
              <CheckCheck
                onClick={handlerEdit}
                className="text-[#1264a3] cursor-pointer"
              />
            </div>
            <form className="mt-3" onSubmit={handlerEdit}>
              <Input
                value={name}
                disabled={pendingUpdate}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
                minLength={3}
                maxLength={80}
                placeholder={room?.name}
              />
            </form>
          </div>
          <div className="px-5 py-4 rounded-lg border cursor-pointer">
  <p>Adicionar opções</p>
  <div className="flex flex-row gap-x-2 items-center mt-3">
    <Input
      type="number"
      value={inputValue}
      onChange={(e) => setInputValue(Number(e.target.value))}
      placeholder="Valor"
    />
    <Button onClick={addOption} className="px-2 py-1">
      Adicionar
    </Button>
  </div>

  {/* Container das opções */}
  <div className="flex flex-wrap gap-2 mt-4">
    {room?.choices?.map((value, index) => (
      <div key={index} className="relative">
        {/* Cada opção */}
        <div className="h-10 w-10 bg-secondary rounded-md flex items-center justify-center">
          {value}
        </div>
        {/* Ícone de deletar */}
        <Trash
          className="absolute size-4 right-[-5px] top-[-5px] text-red-600 cursor-pointer"
          onClick={() => handleDeleteOption(value)}
        />
      </div>
    ))}
  </div>
</div>

          <button
            disabled={pendingRemove}
            onClick={handlerRemove}
            className="flex items-center gap-y-2 px-5 py-4 rounded-lg border cursor-pointer hover:bg-secondary text-rose-600"
          >
            <Trash className="size-4" />
            <p className="text-sm ml-2 font-semibold">Deletar</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
