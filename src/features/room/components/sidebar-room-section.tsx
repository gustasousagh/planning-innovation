import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";

interface Props {
  children: React.ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
}
export const SideBarRoomSection = ({ children, label, hint, onNew }: Props) => {
  const [on, toggle] = useToggle(true);
  return (
    <div className="flex flex-col mt-3 px-2">
      <div className="flex items-center gap-x-4 group mb-4">
        <Button
          variant={"default"}
          size="icon"
          onClick={toggle}
          className=" px-3 text-sm shrink-0"
        >
          <FaCaretDown
            className={cn("size-4 transition-transform", on && "-rotate-90")}
          />
        </Button>
        <Button
          variant={"default"}
          className="group px-3 text-sm justify-start overflow-hidden items-center"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant={"default"}
              className="px-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-sm shrink-0"
            >
              <PlusIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};
