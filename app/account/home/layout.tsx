"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/account/login");
    }
  }, [user]);
  return (
    <>
      <div className="h-screen flex flex-col">{children}</div>
    </>
  );
};

export default Layout;
