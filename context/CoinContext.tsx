"use client";

import { db } from "@/firebase/config";
import {
  Timestamp,
  collection,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Coins,
  CoinCache,
  CoinContextProps,
  CoinValuePerDay,
} from "@/types/types";
import axios from "axios";
import { convertDate } from "@/utils/convertDate";

const CoinContext = createContext<CoinContextProps>({
  coinList: [],
  coinCache: [],
  coinsLoading: true,
});

export const CoinContextProvider = ({ children }: { children: ReactNode }) => {
  const [coinList, setCoinList] = useState<Coins[]>([]);
  const [coinCache, setCoinCache] = useState<CoinCache[]>([]);
  const [coinsLoading, setCoinsLoading] = useState<boolean>(true);
  const today = new Date();
  const formattedTodayDate = today
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  useEffect(() => {
    const q = query(collection(db, "coin_list"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setCoinsLoading(true);
      const data: Coins[] = snap.docs.map((doc) => ({
        coin_id: doc.data().coin_id,
        symbol: doc.data().symbol,
        name: doc.data().name,
        image_link: doc.data().image_link,
      }));
      setCoinList(data);
      setCoinsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "coin_cache"));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data: CoinCache[] = snap.docs.map((doc) => ({
        coin_id: doc.data().coin_id,
        coin_historical_data: doc.data().coin_historical_data,
        last_updated: doc.data().last_updated,
      }));
      setCoinCache(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateCoinCache = async () => {
      const toTimestamp = new Date();
      const fromTimestamp = new Date(toTimestamp);
      fromTimestamp.setDate(toTimestamp.getDate() - 91);

      // Setting the time to 00:00:00 for both timestamps
      fromTimestamp.setHours(0, 0, 0, 0);
      toTimestamp.setHours(0, 0, 0, 0);

      const updatedCache = await Promise.all(
        coinList.map(async (coin) => {
          const currentCoinUpdated = coinCache.some((currentCoin) => {
            currentCoin.coin_id === coin.coin_id &&
              convertDate(currentCoin.last_updated.seconds) !==
                formattedTodayDate;
          });
          if (currentCoinUpdated) {
            const updatedCoin = coinCache.find((upCoin) => {
              coin.coin_id === upCoin.coin_id;
            });
            return updatedCoin;
          } else {
            try {
              const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${
                  coin.coin_id
                }/market_chart/range?vs_currency=php&from=${Math.floor(
                  fromTimestamp.getTime() / 1000
                )}&to=${Math.floor(toTimestamp.getTime() / 1000)}`,
                {
                  headers: {
                    "x-cg-demo-api-key":
                      process.env.NEXT_PUBLIC_COINGECKO_API_KEY,
                    "Content-Type": "application/json",
                  },
                }
              );

              const historicalData: CoinValuePerDay[] =
                response.data.prices.map((priceData: [number, number]) => {
                  const [date, value_in_php] = priceData;
                  const formattedResponseDate = new Date(date);
                  formattedResponseDate.setHours(0, 0, 0, 0);
                  return {
                    date: Timestamp.fromDate(formattedResponseDate),
                    value_in_php,
                  };
                });
              return {
                coin_id: coin.coin_id,
                coin_historical_data: historicalData,
                last_updated: Timestamp.fromDate(toTimestamp),
              };
            } catch (error) {
              console.error(`Error fetching data for ${coin.coin_id}:`, error);
              return null; // Return null or handle the error accordingly
            }
          }
        })
      );
      const filteredCache = updatedCache.filter(
        (entry) => entry !== null
      ) as CoinCache[];
      filteredCache.forEach(async (coin) => {
        if (coin) {
          await setDoc(doc(collection(db, "coin_cache"), coin.coin_id), {
            coin_id: coin.coin_id,
            coin_historical_data: coin.coin_historical_data,
            last_updated: coin.last_updated,
          });
        }
      });
    };
    const foundOldCache = coinCache.some(
      (coin) => convertDate(coin.last_updated.seconds) !== formattedTodayDate
    );
    if (coinCache.length !== coinList.length || foundOldCache) {
      updateCoinCache();
    }
  }, [coinCache]);

  return (
    <CoinContext.Provider value={{ coinCache, coinList, coinsLoading }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => {
  return useContext(CoinContext);
};
