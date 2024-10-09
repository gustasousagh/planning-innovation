import { Loader } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader className="size-6 text-indigo-600 animate-spin text-muted-foreground" />
    </div>
  );
};
