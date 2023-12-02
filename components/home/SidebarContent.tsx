"use client";

import { Header } from "@/components/home/Header";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export const SidebarContent = () => {
  const { logOut } = useAuth();
  return (
    <div>
      <Header />
      <div className="mt-6">
        {["Home", "Portfolio"].map((item, index) => (
          <a
            key={index}
            href={item.toLowerCase()}
            className="block rounded px-4 py-2.5 transition duration-200 hover:bg-lightgreen"
          >
            {item}
          </a>
        ))}
      </div>
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
};
