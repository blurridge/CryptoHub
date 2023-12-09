import cryptohubLogo from "@/public/cryptohub_logo.png";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex gap-2 px-4 mb-5 justify-center items-center">
      <Image src={cryptohubLogo} width={24} alt="CryptoHub Logo" priority />
      <span className="text-md font-extrabold">CryptoHub</span>
    </div>
  );
};

export const MobileHeader = () => {
  return (
    <div className="flex px-4">
      <Image src={cryptohubLogo} width={24} alt="CryptoHub Logo" priority />
      <span className="text-md font-extrabold">CryptoHub</span>
    </div>
  );
};
