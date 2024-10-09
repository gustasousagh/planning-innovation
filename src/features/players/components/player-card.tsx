import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Ellipsis } from "lucide-react";

interface PlayCardProps {
  name?: string;
  selected?: number | null;
  image?: string;
  hasChosenNumber?: boolean;
}
export const PlayerCard = ({
  name,
  selected,
  image,
  hasChosenNumber,
}: PlayCardProps) => {
  const avatarFallback = name?.charAt(0).toUpperCase();
  return (
    <div className="space-y-2 m-2 w-20">
      <div className="h-24 items-center text-black justify-center flex rounded-md bg-slate-100">
        {!hasChosenNumber ? (
          <Ellipsis />
        ) : selected !== undefined ? (
          selected
        ) : (
          <Check />
        )}
      </div>
      <Avatar className="h-20 w-20 rounded-md mr-1">
        <AvatarImage className="rounded-md" src={image} />
        <AvatarFallback className="rounded-md bg-sky-500 text-white">
          {avatarFallback}
        </AvatarFallback>
      </Avatar>
      <p className="text-muted-foreground truncate text-sm">{name}</p>
    </div>
  );
};
