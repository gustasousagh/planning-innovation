"use client";
import { MobileSidebar } from "./components/mobile-sidebar";
import { Sidebar } from "./components/sidebar";
import { Toolbar } from "./components/toolbar";
interface Props {
  children: React.ReactNode;
}
const RoomLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 lg:pl-80 fixed inset-y-0 w-full ">
        <Toolbar />
      </div>
      <div className="hidden md:flex h-full z-50 md:w-80 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className=" md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default RoomLayout;
