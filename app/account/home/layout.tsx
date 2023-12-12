"use client";

import { ReactNode } from "react";
import { NewsContextProvider } from "@/context/NewsContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NewsContextProvider>{children}</NewsContextProvider>
    </>
  );
};

export default Layout;
