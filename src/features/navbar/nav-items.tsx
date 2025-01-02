import Link from "next/link"
import { navbarLinks } from "../routes"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NavItems = () => {
  const location = usePathname();
  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group flex items-center px-2 py-2 font-medium rounded-md"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}