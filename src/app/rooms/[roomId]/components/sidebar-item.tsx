import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

const sideBarVariants = cva(
  "flex my-1 items-center gap-1.5 justify-start font-normal h-10 px-2  text-sm overflow-hidden", {
  variants: {
    variant: {
      active: "bg-sky-500/15 text-sky-500 border-sky-300 border-2 hover:bg-sky-500/20 transiction-none",
      default: "text-secondary-foreground bg-secondary hover:bg-secondary/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props {
  label: string;
  id: string;
  icon: LucideIcon | IconType;
  variant?: VariantProps<typeof sideBarVariants>["variant"];
}

export const SidebarItem = ({ label, id, icon: Icon, variant }: Props) => {
  return (
    <Button
      size="lg"
      className={cn(sideBarVariants({ variant }))}
      asChild
    >
      <Link href={`/rooms/${id}`}>
        <Icon className="size-3.5 mr-1 shrink-0"/>
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};
