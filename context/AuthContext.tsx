"use client";

import { db, auth } from "@/firebase/config";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, onSnapshot, query, setDoc, doc } from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Admin, AuthContextProps } from "@/types/types";

const AuthContext = createContext<AuthContextProps>({
  googleLogin: () => {},
  logOut: () => {},
  user: null,
  checkIfUserIsAdmin: (user: User) => false,
  loading: true,
  adminList: [],
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const addUserToFirebase = async () => {
      if (user) {
        await setDoc(doc(collection(db, "admins"), user.email as string), {
          email: user.email,
        });
      }
    };
    if (adminList.length !== 0) {
      if (user !== null && !checkIfUserIsAdmin(user)) {
        addUserToFirebase();
      }
    }
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "admins"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setLoading(true);
      const data: Admin[] = snap.docs.map((doc) => ({
        email: doc.data().email,
        coins: doc.data().investments || undefined,
      }));
      setAdminList(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const checkIfUserIsAdmin = (user: User) => {
    return (
      adminList.length !== 0 &&
      adminList.some((person) => person.email === user.email)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        googleLogin,
        logOut,
        user,
        checkIfUserIsAdmin,
        loading,
        adminList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
