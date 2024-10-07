import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Check, EyeIcon, LoaderCircle } from "lucide-react";

interface PlayCardProps {
  name?: string;
  selected?: number | null;  // Deixe explícito que `selected` pode ser null ou undefined
  image?: string;
  hasChosenNumber?: boolean; // Adicione o campo para verificar se o jogador já escolheu um número

}
export const PlayerCard = ({name, selected, image, hasChosenNumber}: PlayCardProps) => {
  const avatarFallback = name?.charAt(0).toUpperCase();
  return (
    <div className="space-y-2 m-2 w-20">
      <div className="h-24 items-center text-black justify-center flex rounded-md bg-slate-100">
      {!hasChosenNumber
          ? <LoaderCircle className="animate-spin"/> // Exibe "Esperando" se o jogador não escolheu ainda
          : selected !== undefined
          ? selected // Exibe o número se ele já foi escolhido
          : <Check/> // Exibe o ícone enquanto não for revelado
        }
      </div>
      <Avatar className="h-20 w-20 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground truncate text-sm">{name}</p>
    </div>
  )
}