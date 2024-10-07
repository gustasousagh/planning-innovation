import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "left" | "right" | "bottom";
  align?: "start"|"end"|"center";
} 
export const Hint = ({label, children, side, align}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="bg-black text-white border border-white/5">
      <p className="font-medium text-xs">
        {label}
      </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}