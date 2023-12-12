import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import type { ChartData, ChartOptions } from "chart.js";
import { Dispatch, SetStateAction } from "react";

export type UserInvestment = {
  coin_id: string;
  date_invested: Timestamp;
  amount_invested: number;
  value_at_investment: number;
};

export type Coins = {
  coin_id: string;
  symbol: string;
  name: string;
  image_link: string;
};

export type CoinCache = {
  coin_id: string;
  coin_historical_data: CoinValuePerDay[];
  last_updated: Timestamp;
};

export type CoinValuePerDay = {
  date: Timestamp;
  value_in_php: number;
};

export type Admin = {
  email: string;
  coins?: UserInvestment[];
};

export type AuthContextProps = {
  googleLogin: () => void;
  logOut: () => void;
  user: User | null;
  checkIfUserIsAdmin: (user: User) => boolean;
  loading: boolean;
  adminList: Admin[];
};

export type CoinContextProps = {
  coinList: Coins[];
  coinCache: CoinCache[];
  coinsLoading: boolean;
};

export type ExtrapolationContextProps = {
  currentDegree: string;
  setCurrentDegree: Dispatch<SetStateAction<string>>;
  currentDay: number;
  setCurrentDay: Dispatch<SetStateAction<number>>;
};

export type GraphProps = {
  options: ChartOptions<"line">;
  data: ChartData<"line">;
};

export type InvestmentFormProps = {
  handleDialogClose?: () => void;
};

export type UserInvestmentObject = {
  [key: string]: UserInvestment;
};

export type CurrentInvestment = {
  name: string;
  image_link: string;
  symbol: string;
  coin_id: string;
  amount_invested: number;
  value_at_investment: number;
  value_now: number;
  coin_value_now: number;
};

export type NewsContextProps = {
  news: Article[];
  loading: boolean;
};

export type Article = {
  title: string;
  url: string;
  description: string;
  published_at: Date;
  source: string;
};
