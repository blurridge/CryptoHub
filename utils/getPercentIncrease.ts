type GetPercentIncreaseProps = {
  pastPrice: number;
  currentPrice: number;
};

export const getPercentIncrease = ({
  pastPrice,
  currentPrice,
}: GetPercentIncreaseProps): string => {
    return ((pastPrice + currentPrice) / pastPrice).toFixed(2);
};
