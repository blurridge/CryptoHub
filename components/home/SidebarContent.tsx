"use client";

import { Header } from "@/components/home/Header";
import { UserOptions } from "@/components/home/UserOptions";

export const SidebarContent = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Header />
        {["Home", "Portfolio"].map((item, index) => (
          <a
            key={index}
            href={item.toLowerCase()}
            className="block rounded px-4 py-2.5 transition duration-200 text-black hover:bg-lightgreen hover:text-white"
          >
            {item}
          </a>
        ))}
      </div>
      <UserOptions />
    </div>
  );
};
