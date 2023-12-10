"use client";

import { FormType } from "@/types/schema";
import { db } from "@/firebase/config";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { UserInvestment, CoinCache } from "@/types/types";

type uploadToFirestoreProps = {
  payload: FormType;
  coinCache: CoinCache[];
  currentUserEmail: string;
};

export const uploadToFirestore = async ({
  payload,
  coinCache,
  currentUserEmail,
}: uploadToFirestoreProps) => {
  try {
    const coinData = coinCache.find((coin) => coin.coin_id === payload.coin_id);
    const coinPriceAtInvestment = coinData?.coin_historical_data.find(
      (currentDate) =>
        currentDate.date.toDate().toDateString() ===
        payload.date_invested.toDateString()
    );
    if (coinData && coinPriceAtInvestment) {
      const currentUserInvestment: UserInvestment = {
        coin_id: payload.coin_id,
        date_invested: Timestamp.fromDate(payload.date_invested),
        amount_invested: payload.amount_invested,
        value_at_investment: coinPriceAtInvestment.value_in_php,
      };
      const currentUserRef = doc(db, "admins", currentUserEmail);
      await updateDoc(currentUserRef, {
        ["investments." + payload.coin_id]: currentUserInvestment,
      });
    }
  } catch (error: any) {
    console.error("Uploading event error occurred", error.message);
  }
};
