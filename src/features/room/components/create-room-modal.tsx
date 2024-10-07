"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useCreateRoomModal } from "../store/use-create-room-modal";
import { useRouter } from "next/navigation";
import { useCreateRoom } from "../api/use-create-room";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export const CreateRoomModal = () => {
  const [open, setOpen] = useCreateRoomModal();
  const {mutate, isPending} = useCreateRoom();
  const [name, setName] = useState("");
  const router = useRouter();
  const handlerClose = () => {
    setOpen(false)
  }
  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({name}, {
        onSucess(data) {
          toast.success("workspace created")
          router.push(`/rooms/${data}`)
          handlerClose();
        },
    })
  }
  return (
    <Dialog open={open} onOpenChange={handlerClose}>
        <DialogContent>
          <DialogHeader>
            Adicionar um novo espaco de trabalho
          </DialogHeader>
          <form onSubmit={handlerSubmit} className="space-y-6">
            <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace nome"
            />
            <div className="flex justify-end">
              <Button disabled={isPending}>
                Criar
              </Button>
            </div>
          </form>
        </DialogContent>
    </Dialog>
  );
};
