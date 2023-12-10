import { CoinCache } from "@/types/types";
import { convertDate } from "./convertDate";
import { Timestamp } from "firebase/firestore";

type LagrangeExtrapolationPoints = {
  [key: string]: number;
};

type lagrangeExtrapolationProps = {
  currentDegree: string;
  coinData: CoinCache;
  daysInTheFuture: number;
};

type ExtrapolationResult = [Timestamp, number];

const LAGRANGE_EXTRAPOLATION_POINTS: LagrangeExtrapolationPoints = {
  linear: 1,
  quadratic: 2,
  cubic: 3,
  quartic: 4,
  quintic: 5,
  sextic: 6,
};

export const lagrangeExtrapolation = ({
  currentDegree,
  coinData,
  daysInTheFuture,
}: lagrangeExtrapolationProps): ExtrapolationResult => {
  const numberOfDataPoints =
    LAGRANGE_EXTRAPOLATION_POINTS[
      currentDegree as keyof typeof LAGRANGE_EXTRAPOLATION_POINTS
    ];
  const currentData = coinData.coin_historical_data;
  const dataPointsToUse = currentData.slice(
    currentData.length - numberOfDataPoints - 1
  );

  const dates: string[] = dataPointsToUse.map((data) =>
    convertDate(data.date.seconds)
  );
  const values: number[] = dataPointsToUse.map((data) => data.value_in_php);
  const timestamps: number[] = dates.map((date) => new Date(date).getTime());
  const nextDateTimestamp =
    timestamps[timestamps.length - 1] + 86400000 * daysInTheFuture;
  const extrapolatedValue = extrapolate(
    timestamps,
    values,
    numberOfDataPoints,
    nextDateTimestamp
  );
  const nextDateTimestampAsFBTimestamp =
    Timestamp.fromMillis(nextDateTimestamp);
  return [nextDateTimestampAsFBTimestamp, extrapolatedValue];
};

const lagrangeCoefficients = (
  x: number[],
  y: number[],
  degree: number
): number[] => {
  const n = x.length;
  const coefficients: number[] = [];

  for (let j = 0; j <= degree; j++) {
    let sum = 0;
    for (let k = 0; k <= degree; k++) {
      if (k !== j) {
        let product = 1;
        for (let m = 0; m <= degree; m++) {
          if (m !== j && m !== k) {
            product *= (x[j] - x[m]) / (x[k] - x[m]);
          }
        }
        sum += product;
      }
    }
    coefficients.push(sum * y[j]);
  }

  return coefficients;
};

const extrapolate = (
  x: number[],
  y: number[],
  degree: number,
  extrapolationX: number
): number => {
  const coefficients = lagrangeCoefficients(x, y, degree);
  let result = 0;

  for (let i = 0; i <= degree; i++) {
    let term = coefficients[i];
    for (let j = 0; j <= degree; j++) {
      if (j !== i) {
        term *= (extrapolationX - x[j]) / (x[i] - x[j]);
      }
    }
    result += term;
  }

  return result;
};
