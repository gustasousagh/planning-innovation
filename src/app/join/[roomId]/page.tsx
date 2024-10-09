"use client";
import { Button } from "@/components/ui/button";
import { useGetRoomId } from "@/hooks/use-get-room-id";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input";
import Logo from "@/public/logo.svg";
import { LoadingScreen } from "@/components/loading";
import { useJoinRoom } from "@/features/join/services/handler-complete-service";
import { useGetRoomInfo } from "@/features/join/api/use-get-room-info";
import { useAuthModal } from "@/features/auth/store/use-auth-modal";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

const JoinPage = () => {
  const route = useRouter();
  const roomId = useGetRoomId();
  const { data, isLoading } = useGetRoomInfo({ id: roomId });
  const { handleComplete, isPending } = useJoinRoom();
  const [open, setOpen] = useAuthModal();
  const { data: user, isLoading: isUserLoading } = useCurrentUser();

  const isMember = useMemo(() => data?.isMember, [data?.isMember]);

  useEffect(() => {
    if (!isUserLoading && !user && !open) {
      setOpen(true);
    } else if (user && open) {
      setOpen(false);
    }
  }, [isUserLoading, user, open, setOpen]);

  useEffect(() => {
    if (isMember) {
      route.push(`/rooms/${roomId}`);
    }
  }, [isMember, route, roomId]);

  if (isLoading || isUserLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="h-screen flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
      <Image src={Logo} width={60} height={60} alt="ftyftyfufu" />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-sm text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          onComplete={(value: string) => handleComplete(roomId, value)}
          length={6}
          classNames={{
            container: cn(
              "flex gap-x-2",
              isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "uppercase h-auto rounded-md border-gray-300 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button variant={"outline"} size={"lg"} asChild>
          <Link href="/">Voltar</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
