"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Sidebar } from "@/components/home/Sidebar";
import { SidebarContent } from "@/components/home/SidebarContent";
import { MobileHeader } from "@/components/home/Header";
import { GreenLoader } from "@/components/loaders/Loader";
import { ExtrapolationContextProvider } from "@/context/ExtrapolationContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null && !loading) {
      router.push("/login");
    }
  }, [user, loading]);

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <GreenLoader />
        </div>
      ) : (
        <ExtrapolationContextProvider>
          <div className="flex flex-col h-fit">
            <Sidebar
              sidebarContent={SidebarContent}
              mobileDashboardHeader={MobileHeader}
            >
              {children}
            </Sidebar>
          </div>
        </ExtrapolationContextProvider>
      )}
    </>
  );
};

export default Layout;
