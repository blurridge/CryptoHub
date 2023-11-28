import { User } from "firebase/auth";

export type Admin = {
  email: string;
};

export type AuthContextProps = {
  googleLogin: () => void;
  logOut: () => void;
  user: User | null;
  checkIfUserIsAdmin: (user: User) => boolean;
  loading: boolean;
};
