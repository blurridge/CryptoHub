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
      <Sheet>
        <div className="mt-5 flex md:hidden">
          <div className="flex flex-1">
            {MobileDashboardHeader && <MobileDashboardHeader />}
          </div>
          <SheetTrigger>
            <MenuIcon size={24} />
          </SheetTrigger>
        </div>
        <SheetContent side="left">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      {children}
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
      <aside className="fixed top-14 z-30 -ml-2 hidden h-screen w-fit shrink-0 border-r md:sticky md:block">
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
