import cryptohubLogo from "@/public/cryptohub_logo.png";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex px-4">
      <Image src={cryptohubLogo} width={100} alt="CryptoHub Logo" priority />
    </div>
  );
};
