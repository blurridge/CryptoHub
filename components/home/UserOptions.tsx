"use client";

import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDropdown } from "@/components/home/UserDropdown";

export const UserOptions = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="flex gap-4">
        <Avatar>
          {user ? (
            <AvatarImage
              src={user.photoURL || undefined}
              alt="Current user's profile picture"
            />
          ) : (
            <AvatarFallback>CH</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold">{user?.displayName}</span>
          <span>{user?.email}</span>
        </div>
        <UserDropdown />
      </div>
    </>
  );
};
