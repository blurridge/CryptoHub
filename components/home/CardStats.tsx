import { CurrentInvestment } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

type CardStatsProps = {
  currentInvestment: CurrentInvestment[];
};

export const CardStats = ({ currentInvestment }: CardStatsProps) => {
  const [valueOfPortfolio, setValueOfPortfolio] = useState<number>(0);
  const [topAsset, setTopAsset] = useState<string>("");
  const [topAssetImage, setTopAssetImage] = useState<string>("");
  const [topAssetPercent, setTopAssetPercent] = useState<number>(0);
  useEffect(() => {
    if (currentInvestment && currentInvestment.length > 0) {
      const value = currentInvestment.reduce((accumulator, coin) => {
        return accumulator + coin.coin_value_now;
      }, 0);
      const assetWithHighestValue = currentInvestment.reduce((max, coin) => {
        return coin.coin_value_now >
          (max ? max.coin_value_now : Number.NEGATIVE_INFINITY)
          ? coin
          : max;
      }, currentInvestment[0]);
      setValueOfPortfolio(value);
      setTopAsset(assetWithHighestValue.name);
      setTopAssetImage(assetWithHighestValue.image_link);
      setTopAssetPercent((assetWithHighestValue.coin_value_now / value) * 100);
    }
  }, [currentInvestment]);

  return (
    <>
      <div className="flex gap-2 justify-stretch w-full">
        <Card className="grow">
          <CardHeader>
            <CardTitle className="text-center">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <span className="font-medium">
              {"PHP"} {valueOfPortfolio.toFixed(2)}
            </span>
          </CardContent>
        </Card>
        <Card className="grow">
          <CardHeader>
            <CardTitle className="text-center">Top Asset</CardTitle>
          </CardHeader>
          <CardContent className="text-center flex flex-col gap-2">
            {topAsset !== "" ? (
              <>
                {" "}
                <div className="flex gap-2 justify-center items-center">
                  <Image
                    src={topAssetImage}
                    alt={`${topAsset} logo`}
                    width={30}
                    height={14}
                    priority
                  />
                  <span className="font-bold text-lg">{topAsset}</span>
                </div>
                <span className="font-medium">
                  {topAssetPercent.toFixed(2)}
                  {"% of Portfolio"}
                </span>
              </>
            ) : (
              <span>No assets found.</span>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
