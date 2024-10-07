import { Button } from "@/components/ui/button";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRoomId } from "@/hooks/use-room-id";
import { Id } from "../../../../../convex/_generated/dataModel";
interface Props {
  id: Id<"playes">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userVariants>["variant"];
}
const userVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
export const UserItem = ({ label = "member", id, variant, image }: Props) => {
  const avatarFallback = label.charAt(0).toUpperCase();
  return (
    <Button
      variant={"outline"}
      className={cn(userVariants({ variant: variant }))}
      size={"sm"}
      asChild
    >
      <div>
        <Avatar className="size-5 rounded-md mr-1">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate text-muted-foreground">{label}</span>
      </div>
    </Button>
  );
};
