import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type UserInvestment = {
  coin_id: string;
  date_invested: Date;
  amount_invested: number;
  value_at_investment: number;
}

export type Coins = {
  coin_id: string;
  symbol: string;
  name: string;
}

export type CoinCache = {
  coin_id: string;
  coin_historical_data: CoinValuePerDay[];
  last_updated: Timestamp;
}

export type CoinValuePerDay = {
  date: Timestamp;
  value_in_php: number;
}

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
};

export type CoinContextProps = {
  coinList: Coins[];
  coinCache: CoinCache[];
  coinsLoading: boolean;
};