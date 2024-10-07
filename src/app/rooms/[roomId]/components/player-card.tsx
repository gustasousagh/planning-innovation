import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PlayCardProps {
  name?: string;
  selected?: number;
  image?: string;
}
export const PlayerCard = ({name, selected, image}: PlayCardProps) => {
  const avatarFallback = name?.charAt(0).toUpperCase();

  return (
    <div className="space-y-2 m-2 w-20">
      <div className="h-24 items-center text-black justify-center flex rounded-md bg-slate-100">
      {selected !== null
              ? (selected ? selected : "*") 
              : "não selecionado"}
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