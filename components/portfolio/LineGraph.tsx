import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { GraphProps } from "@/types/types";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

export const LineGraph = ({ data, options }: GraphProps) => {
  return (
    <>
      <div className="w-[75vw] my-5">
        <h1 className="text-center font-extrabold text-xl uppercase">{data.datasets[0].label}</h1>
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
};
