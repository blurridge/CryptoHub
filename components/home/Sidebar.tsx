import { MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const WithMobileSidebar = ({
  children,
  sidebarContent: SidebarContent,
  mobileDashboardHeader: MobileDashboardHeader,
}: {
  children: React.ReactNode;
  sidebarContent: () => JSX.Element;
  mobileDashboardHeader?: () => JSX.Element;
}) => {
  return (
    <>
      <div className="flex flex-col w-screen">
        <Sheet>
          <div className="my-5 flex md:hidden">
            <div className="flex flex-1 justify-between mr-5">
              {MobileDashboardHeader && <MobileDashboardHeader />}
              <SheetTrigger>
                <MenuIcon size={24} />
              </SheetTrigger>
            </div>
          </div>
          <SheetContent className="w-fit" side="left">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        {children}
      </div>
    </>
  );
};

const WithDesktopSidebar = ({
  children,
  sidebarContent: SidebarContent,
}: {
  children: React.ReactNode;
  sidebarContent: () => JSX.Element;
}) => {
  return (
    <div className="flex">
      <aside className="fixed top-0 z-30 -ml-2 hidden h-screen w-fit shrink-0 border-r md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8">
          <SidebarContent />
        </div>
      </aside>
      {children}
    </div>
  );
};

export const Sidebar = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  sidebarContent: () => JSX.Element;
  mobileDashboardHeader?: () => JSX.Element;
}) => {
  return (
    <WithDesktopSidebar {...props}>
      <WithMobileSidebar {...props}>{children}</WithMobileSidebar>
    </WithDesktopSidebar>
  );
};
