
import SideNav from "@/app/ui/dashboard/sidenav";
import { Avatar } from "@/components/ui/avatar";
import { PopoverTrigger } from "@/components/ui/popover";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      {/* <div className="w-full flex-none md:w-64">
        <SideNav />
      </div> */}
      <nav>
        <div></div>
        <div>

          <PopoverTrigger>
            <Avatar />
          </PopoverTrigger>
        </div>
      </nav>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

