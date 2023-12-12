"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GoogleButton from "react-google-button";

export const AdminLoginButton = () => {
  const { googleLogin, user } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      googleLogin();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      router.push("/account/home");
    }
  }, [user]);
  
  return (
    <>
      <GoogleButton
        data-te-ripple-init
        type="light"
        onClick={() => {
          handleGoogleLogin();
        }}
      />
    </>
  );
};
