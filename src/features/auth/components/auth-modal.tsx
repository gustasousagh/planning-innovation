"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthModal } from "../store/use-auth-modal";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";

export const AuthModal = () => {
  const [open, setOpen] = useAuthModal();
  const { signIn } = useAuthActions();
  const [pending, setPending] = useState(false);

  const router = useRouter();
  const handlerClose = () => {
    setOpen(false);
  };
  const handlerProvidedAuth = (value: "github" | "google") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false);
      router.push("/");
    });
  };
  return (
    <Dialog open={open} onOpenChange={handlerClose}>
      <DialogContent className="space-y-3 p-10">
        <DialogHeader>
          <DialogTitle>Login com GitHub</DialogTitle>
          <DialogDescription>
            Faça login para acessar seu espaço de trabalho.
          </DialogDescription>
        </DialogHeader>
        <DialogTrigger>
          <Button
            disabled={pending}
            onClick={() => {
              handlerProvidedAuth("github");
            }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Entrar com Github
          </Button>
        </DialogTrigger>
        <DialogFooter className="text-sm text-muted-foreground">
          <span>
            Ao criar uma conta, você concorda com nossos{" "}
            <a href="/termos-de-servico" className="text-primary underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a
              href="/politica-de-privacidade"
              className="text-primary underline"
            >
              Política de Privacidade
            </a>
            .
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
