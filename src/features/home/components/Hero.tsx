/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";

import { Button } from "@/components/ui/button";
import HeroImage from "@/public/hero.png";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Loader } from "lucide-react";
import { useAuthModal } from "@/features/auth/store/use-auth-modal";
import { useRouter } from "next/navigation";

export function Hero() {
  const [_open, setOpen] = useAuthModal();
  const router = useRouter()
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
            <Button onClick={() => router.push(`/rooms`)} variant="default">Jogar</Button>
            <Button onClick={() => router.push(`/rooms`)} variant="secondary">Criar uma turma</Button>
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

      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full py-12 lg:py-20">
          <div className="text-center">
            <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
              Marque pontos facilmente e agilize suas estimativas.
            </span>

            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none">
              Estime seus pontos{" "}
              <span className="block text-primary">em minutos!</span>
            </h1>

            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tighter">
              Estimativas de pontos Scrum de forma simples e divertida, ajudando
              sua equipe a alinhar expectativas de maneira mais eficaz.
            </p>
            <div className="flex items-center gap-x-5 w-full justify-center mt-5 ">
              <AuthLoading>
                <div className="flex items-center">
                  <Loader className="size-7 animate-spin shrink-0" />
                </div>
              </AuthLoading>
              <Authenticated>
                <Button onClick={() => router.push(`/rooms`)} variant="default">Jogar</Button>
                <Button onClick={() => router.push(`/rooms`)} variant="secondary">Criar uma turma</Button>
              </Authenticated>
              <Unauthenticated>
                <Button onClick={() => setOpen(true)} variant="default">
                  Criar uma conta
                </Button>{" "}
                <Button onClick={() => setOpen(true)} variant="secondary">
                  Entrar
                </Button>
              </Unauthenticated>
            </div>
          </div>

          <div className="relative items-center w-full py-12 mx-auto mt-12">
            <svg
              className="absolute -mt-24 blur-3xl"
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#03FFE0"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#7C87F8"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#4C65E4"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#043AFF"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="720.666"
                  id="filter0_f_10_20"
                  width="720.666"
                  x="-160.333"
                  y="-160.333"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_10_20"
                    stdDeviation="80.1666"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>

            <Image
              src={HeroImage}
              alt="Hero image"
              priority
              className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}
