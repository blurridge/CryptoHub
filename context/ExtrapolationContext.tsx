import { ExtrapolationContextProps } from "@/types/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ExtrapolationContext = createContext<ExtrapolationContextProps>({
  currentDegree: "none",
  setCurrentDegree: () => {},
});

export const ExtrapolationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentDegree, setCurrentDegree] = useState<string>("none");

  return (
    <ExtrapolationContext.Provider value={{ currentDegree, setCurrentDegree }}>
      {children}
    </ExtrapolationContext.Provider>
  );
};

export const useExtrapolation = () => {
  return useContext(ExtrapolationContext);
};
