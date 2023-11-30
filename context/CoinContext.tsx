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

const CoinContext = createContext<CoinContextProps>({
  coinList: [],
  coinCache: [],
  coinsLoading: true,
});

export const CoinContextProvider = ({ children }: { children: ReactNode }) => {
  const [coinList, setCoinList] = useState<Coins[]>([]);
  const [coinCache, setCoinCache] = useState<CoinCache[]>([]);
  const [coinsLoading, setCoinsLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, "coin_list"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setCoinsLoading(true);
      const data: Coins[] = snap.docs.map((doc) => ({
        coin_id: doc.data().coin_id,
        symbol: doc.data().symbol,
        name: doc.data().name,
      }));
      setCoinList(data);
      setCoinsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getCoinCache = async () => {
      const querySnapshot = await getDocs(collection(db, "coin_cache"));
      const data: CoinCache[] = querySnapshot.docs.map((doc) => ({
        coin_id: doc.data().coin_id,
        coin_historical_data: doc.data().coin_historical_data,
        last_updated: doc.data().last_updated,
      }));
      setCoinCache(data);
    };
    if (coinList.length !== 0) {
      getCoinCache();
    }
  }, [coinList]);

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

            setTimeout(() => {}, 500);

            const historicalData: CoinValuePerDay[] = response.data.prices.map(
              (priceData: [number, number]) => {
                const [date, value_in_php] = priceData;
                return {
                  date: Timestamp.fromDate(new Date(date)),
                  value_in_php,
                };
              }
            );
            return {
              coin_id: coin.coin_id,
              coin_historical_data: historicalData,
              last_updated: Timestamp.fromDate(toTimestamp),
            };
          } catch (error) {
            console.error(`Error fetching data for ${coin.coin_id}:`, error);
            return null; // Return null or handle the error accordingly
          }
        })
      );
      const filteredCache = updatedCache.filter(
        (entry) => entry !== null
      ) as CoinCache[];
      setCoinCache(filteredCache);
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

    if (coinCache.length !== coinList.length) {
      updateCoinCache();
    } else if (
      coinCache[0] &&
      coinCache[0]?.last_updated.toDate().toDateString() !==
        new Date().toDateString()
    ) {
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
