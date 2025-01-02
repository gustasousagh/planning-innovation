import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";

import { Button } from "@/components/ui/button";
import HeroImage from "@/public/hero.png";
import { ThemeToggle } from "@/components/theme-toggle";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader } from "lucide-react";
import { useAuthModal } from "@/features/auth/store/use-auth-modal";
import { useRouter } from "next/navigation";

export function NavBar() {
  const [_open, setOpen] = useAuthModal();
  const router = useRouter();
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} className="size-10" alt="Logo" />
            <h4 className="text-3xl font-semibold">
              Scrum<span className="text-primary">Player</span>
            </h4>
          </Link>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4">
          <ThemeToggle />
          <AuthLoading>
            <div className="flex items-center">
              <Loader className="size-7 animate-spin shrink-0" />
            </div>
          </AuthLoading>
          <Authenticated>
            <Button onClick={() => router.push(`/rooms`)} variant="default">
              Jogar
            </Button>
            <Button onClick={() => router.push(`/rooms`)} variant="secondary">
              Criar uma turma
            </Button>
          </Authenticated>
          <Unauthenticated>
            <Button onClick={() => setOpen(true)} variant="default">
              Criar uma conta
            </Button>{" "}
            <Button onClick={() => setOpen(true)} variant="secondary">
              Entrar
            </Button>
          </Unauthenticated>
        </nav>
      </div>
    </>
  );
}
