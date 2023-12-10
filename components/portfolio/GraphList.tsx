"use client";

import { useCoins } from "@/context/CoinContext";
import { LineGraph } from "@/components/portfolio/LineGraph";
import type { ChartData, ChartOptions } from "chart.js";
import { useAuth } from "@/context/AuthContext";
import { convertDate } from "@/utils/convertDate";
import { useExtrapolation } from "@/context/ExtrapolationContext";
import { useState, useEffect } from "react";
import { CoinCache } from "@/types/types";
import { lagrangeExtrapolation } from "@/utils/lagrangeExtrapolation";
import { checkIfDateIsGreater } from "@/utils/checkIfDateIsGreater";

export const GraphList = () => {
  const { coinCache } = useCoins();
  const { user, adminList } = useAuth();
  const { currentDegree, currentDay } = useExtrapolation();
  const [extrapolatedData, setExtrapolatedData] = useState<CoinCache[]>([]);

  useEffect(() => {
    setExtrapolatedData(coinCache);
  }, [coinCache]);

  useEffect(() => {
    if (currentDegree !== "none") {
      const updatePromises = coinCache.map((coinData) => {
        return new Promise((resolve) => {
          setExtrapolatedData((prevExtrapolatedData) => {
            const [newDate, newPrice] = lagrangeExtrapolation({
              currentDegree,
              coinData,
              daysInTheFuture: currentDay,
            });

            const updatedCoinData = {
              ...coinData,
              coin_historical_data: [
                ...coinData.coin_historical_data,
                { date: newDate, value_in_php: newPrice },
              ],
            };

            const updatedExtrapolatedData = prevExtrapolatedData.map(
              (prevData) =>
                prevData.coin_id === coinData.coin_id
                  ? updatedCoinData
                  : prevData
            );

            return updatedExtrapolatedData;
          });

          resolve(); // Resolve the promise once the state update is done
        });
      });

      Promise.all(updatePromises).then(() => {
        // All state updates finished here
        console.log("All updates finished:", extrapolatedData);
      });
    } else {
      setExtrapolatedData(coinCache);
    }
  }, [currentDegree, currentDay]);

  const getCurrentUser = adminList.find(
    (currentUser) => currentUser.email === user?.email
  );
  const currentUserInvestments = getCurrentUser?.coins;

  return extrapolatedData.map((coin) => {
    let dateInvested: string = "";
    const currentCoinData = coin.coin_historical_data.map(
      (currentCoin) => currentCoin.value_in_php
    );

    const currentLabels = coin.coin_historical_data.map((currentCoin) => {
      return convertDate(currentCoin.date.seconds);
    });

    if (currentUserInvestments) {
      // Checks if user has current investments.
      const keys = Object.keys(currentUserInvestments);
      const userInvestedInCurrentCoin = keys.find(
        // Checks if user is invested in current coin so it could be added to the dataset.
        (key) => key === coin.coin_id
      );
      if (userInvestedInCurrentCoin) {
        const currentInvestmentData =
          currentUserInvestments[userInvestedInCurrentCoin];
        dateInvested = convertDate(currentInvestmentData.date_invested.seconds);
      }
    }

    const maxPhpValue = Math.max(
      ...coin.coin_historical_data.map(
        (currentCoin) => currentCoin.value_in_php
      )
    );

    const data: ChartData<"line"> = {
      labels: currentLabels,
      datasets: [
        {
          label: coin.coin_id,
          data: currentCoinData,
          pointRadius: 4,
          pointHoverRadius: 5,
          borderColor: "black",
          pointBorderColor: "black",
          backgroundColor: (ctx) => {
            if (dateInvested !== "" && ctx.chart.data.labels) {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              if (checkIfDateIsGreater(label)) {
                return "yellow";
              }
              return label === dateInvested ? "red" : "aqua"; // Colors the point red when label is equal to user's investment date.
            } else {
              return "aqua"; // If no investment is done, all is colored aqua.
            }
          },
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      plugins: {
        legend: {
          display: true,
          position: "top" as const, // Adjust position if needed
          labels: {
            color: "black",
            font: {
              size: 12,
            },
          },
        },
      },
      scales: {
        y: {
          min: 0,
          max: Math.round(maxPhpValue * 1.2),
        },
      },
    };

    return <LineGraph key={coin.coin_id} data={data} options={options} />;
  });
};
