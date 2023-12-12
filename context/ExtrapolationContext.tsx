import { ExtrapolationContextProps } from "@/types/types";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

const ExtrapolationContext = createContext<ExtrapolationContextProps>({
  currentDegree: "none",
  setCurrentDegree: () => {},
  currentDay: 1,
  setCurrentDay: () => {}
});

export const ExtrapolationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentDegree, setCurrentDegree] = useState<string>("none");
  const [currentDay, setCurrentDay] = useState<number>(1);

  return (
    <ExtrapolationContext.Provider value={{ currentDegree, setCurrentDegree, currentDay, setCurrentDay }}>
      {children}
    </ExtrapolationContext.Provider>
  );
};

export const useExtrapolation = () => {
  return useContext(ExtrapolationContext);
};
