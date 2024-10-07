"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
const guestRoutes = [
  
  {
    icon: Layout,
    label: "Template Free",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Garotas Free",
    href: "/girls",
  },
  {
    icon: Compass,
    label: "Videos Free",
    href: "/videos",
  },
  {
    icon: Compass,
    label: "Shorts Free",
    href: "/shorts",
  },

];



export const SidebarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}