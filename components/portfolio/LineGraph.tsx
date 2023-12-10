"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { GraphProps } from "@/types/types";
import { useCoins } from "@/context/CoinContext";
import Image from "next/image";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export const LineGraph = ({ data, options }: GraphProps) => {
  const { coinList } = useCoins();
  const currentCoin = coinList.find(
    (coin) => coin.coin_id === data.datasets[0].label
  );
  if (currentCoin) {
    return (
      <>
        <div className="w-[75vw] my-5 bg-gray-50 p-5 rounded-3xl">
          <div className="flex gap-5 justify-center items-center">
            <Image
              src={currentCoin.image_link}
              alt={`${currentCoin.coin_id} logo`}
              width={30}
              height={24}
              priority
            />
            <h1 className="text-center font-extrabold text-xl uppercase">
              {currentCoin.name} {"("}
              {currentCoin.symbol.toUpperCase()}
              {")"}
            </h1>
          </div>
          <Line data={data} options={options}></Line>
        </div>
      </>
    );
  }
};
