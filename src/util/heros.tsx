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

export function Hero() {
  const [_open, setOpen] = useAuthModal();
  const router = useRouter();
  return (
    <>
       <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
  >
    {/* Pequenas estrelas piscando */}
    {[...Array(50)].map((_, i) => {
      const x = Math.random() * 400;
      const y = Math.random() * 400;
      const size = Math.random() * 1.5 + 0.5; // Tamanho entre 0.5 e 2
      const delay = Math.random() * 2; // Atraso aleatório para piscar
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={size}
          fill="white"
          className={`animate-pulse`}
          style={{
            animationDelay: `${delay}s`,
            animationDuration: "2s",
          }}
        ></circle>
      );
    })}
  </svg>

  {/* Imagem com fundo transparente */}
  <div className="relative z-10">
   
  </div>
    </>
  );
}
