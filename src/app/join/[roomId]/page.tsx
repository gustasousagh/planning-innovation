"use client";
import { Button } from "@/components/ui/button";
import { useGetRoomInfo } from "@/features/room/api/use-get-room-info";
import { useRoomId } from "@/hooks/use-room-id";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input"
import { toast } from "sonner";
import Logo from "@/public/logo.svg";
import { useJoin } from "@/features/room/api/use-join";

const JoinPage = () => {
  const roomId = useRoomId();
  const {data, isLoading} = useGetRoomInfo({id: roomId});
  const {mutate, isPending} = useJoin()
  const router = useRouter()
  const isMember = useMemo(() => data?.isMember, [data?.isMember]);
  useEffect(()=> {
    if(isMember){
      router.push(`/rooms/${roomId}`)
    }
  }, [isMember, router, roomId])
  const handleComplete = (value: string) => {
    mutate({ roomId, joinCode: value}, {
      onSucess: (id) => {
        router.replace(`/rooms/${id}`)
        toast.success("Parabens, agora voce faz parte do time")
      },
      onError: () => {
        toast.error("Codigo invalido ou inspirado ")
      }
    })
  }
  if(isLoading){
    return <div className="h-full items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground"/>
    </div>
  }
  return (
    <div className="h-screen flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
      <Image src={Logo} width={60} height={60} alt="ftyftyfufu"/>
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-sm text-muted-foreground">Enter the workspace code to join</p>
        </div>
        <VerificationInput
        onComplete={handleComplete}
        length={6}
        classNames={{
          container: cn("flex gap-x-2", false && "opacity-50 cursor-not-allowed"),
          character: "uppercase h-auto rounded-md border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
          characterInactive: "bg-muted",
          characterSelected: "bg-white text-black",
          characterFilled: "bg-white text-black"
        }}
        autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button
        variant={"outline"}
        size={"lg"}
        asChild
        >
          <Link href="/">
          Voltar
          </Link>
        </Button>
      </div>
    </div>
  )
}
export default JoinPage;