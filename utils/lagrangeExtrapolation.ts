type LagrangeExtrapolationPoints = {
    [key: string]: number;
  };

type lagrangeExtrapolationProps = {
  degree: string;
  dataPoints: number[];
};

const LAGRANGE_EXTRAPOLATION_POINTS: LagrangeExtrapolationPoints = {
  linear: 2,
  quadratic: 3,
  cubic: 4,
  quartic: 5,
  quintic: 6,
  sextic: 7,
};

export const lagrangeExtrapolation = ({
  degree,
  dataPoints,
}: lagrangeExtrapolationProps) => {
  const numberOfDataPoints = LAGRANGE_EXTRAPOLATION_POINTS[degree as keyof typeof LAGRANGE_EXTRAPOLATION_POINTS];
  
};
