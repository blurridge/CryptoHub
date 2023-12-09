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
  Legend,
  Tooltip
);

export const LineGraph = ({ data, options }: GraphProps) => {
  return (
    <>
      <div className="w-5/12 md:w-10/12">
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
};
