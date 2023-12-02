import { Sidebar } from "@/components/home/Sidebar";
import { SidebarContent } from "@/components/home/SidebarContent";
import { Header } from "@/components/home/Header";

const Page = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Sidebar sidebarContent={SidebarContent} mobileDashboardHeader={Header}>
          <div className="p-10">
            <p>dashboard</p>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default Page;
