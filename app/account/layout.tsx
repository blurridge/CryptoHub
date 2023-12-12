"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Sidebar } from "@/components/home/Sidebar";
import { SidebarContent } from "@/components/home/SidebarContent";
import { MobileHeader } from "@/components/home/Header";
import { GreenLoader } from "@/components/loaders/Loader";
import { ExtrapolationContextProvider } from "@/context/ExtrapolationContext";
import { NewsContextProvider } from "@/context/NewsContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null && !loading) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <GreenLoader />
        </div>
      ) : (
        <ExtrapolationContextProvider>
          <NewsContextProvider>
            <div className="flex flex-col h-fit">
              <Sidebar
                sidebarContent={SidebarContent}
                mobileDashboardHeader={MobileHeader}
              >
                {children}
              </Sidebar>
            </div>
          </NewsContextProvider>
        </ExtrapolationContextProvider>
      )}
    </>
  );
};

export default Layout;
