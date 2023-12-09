"use client";

import { useCoins } from "@/context/CoinContext";
import { LineGraph } from "@/components/portfolio/LineGraph";
import type { ChartData, ChartOptions } from "chart.js";

export const GraphList = () => {
  const { coinCache } = useCoins();
  return coinCache.map((coin) => {
    const maxPhpValue = Math.max(
      ...coin.coin_historical_data.map(
        (currentCoin) => currentCoin.value_in_php
      )
    );
    const data: ChartData<"line"> = {
      labels: coin.coin_historical_data.map((currentCoin) => {
        const date = new Date(currentCoin.date.seconds * 1000);
        const day = ("0" + date.getDate()).slice(-2); // Get the day with leading zero
        const month = ("0" + (date.getMonth() + 1)).slice(-2); // Get the month with leading zero
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
      }),
      datasets: [
        {
          label: coin.coin_id,
          data: coin.coin_historical_data.map(
            (currentCoin) => currentCoin.value_in_php
          ),
          backgroundColor: "aqua",
          borderColor: "black",
          pointBorderColor: "aqua",
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
