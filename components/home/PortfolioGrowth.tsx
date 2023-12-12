"use client";

import { useAuth } from "@/context/AuthContext";
import { useCoins } from "@/context/CoinContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { UserInvestment } from "@/types/types";
import { GreenLoader } from "@/components/loaders/Loader";
import Image from "next/image";
import { getPercentIncrease } from "@/utils/getPercentIncrease";
import { CurrentInvestment } from "@/types/types";
import { CardStats } from "@/components/home/CardStats";
import { NewsCards } from "@/components/home/NewsCards";
import { useNews } from "@/context/NewsContext";

export const PortfolioGrowth = () => {
  const { coinCache, coinList } = useCoins();
  const { user, adminList } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentInvestment, setCurrentInvestment] = useState<
    CurrentInvestment[]
  >([]);

  useEffect(() => {
    if (coinCache && coinList && user && adminList) {
      setLoading(true);
      const getCurrentUser = adminList.find(
        (currentUser) => currentUser.email === user?.email
      );
      const currentUserInvestments = getCurrentUser?.coins;
      if (currentUserInvestments) {
        const updatedInvestments: CurrentInvestment[] = [];
        Object.keys(currentUserInvestments).forEach((key) => {
          const foundCache = coinCache.find((coin) => coin.coin_id === key);
          const foundCoin = coinList.find((coin) => coin.coin_id === key);
          if (foundCache && foundCoin) {
            const currentKey = key as keyof typeof currentUserInvestments;
            const investmentToPush: CurrentInvestment = {
              name: foundCoin.name,
              image_link: foundCoin.image_link,
              symbol: foundCoin.symbol,
              coin_id: key,
              amount_invested: (
                currentUserInvestments[currentKey] as UserInvestment
              ).amount_invested,
              value_at_investment: (
                currentUserInvestments[currentKey] as UserInvestment
              ).value_at_investment,
              value_now:
                foundCache.coin_historical_data[
                  foundCache.coin_historical_data.length - 1
                ].value_in_php,
              coin_value_now:
                ((currentUserInvestments[currentKey] as UserInvestment)
                  .amount_invested /
                  (currentUserInvestments[currentKey] as UserInvestment)
                    .value_at_investment) *
                foundCache.coin_historical_data[
                  foundCache.coin_historical_data.length - 1
                ].value_in_php,
            };
            updatedInvestments.push(investmentToPush);
          }
        });
        setCurrentInvestment(updatedInvestments);
      }
      setLoading(false);
    }
  }, [coinCache, coinList, adminList]);

  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <GreenLoader />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 h-screen mx-2 my-1">
          <CardStats currentInvestment={currentInvestment} />
          <div className="flex gap-2 flex-grow">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Growth</CardTitle>
                <CardDescription>
                  May the odds be ever in your favor.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {currentInvestment.length === 0 ? (
                  <span>No investments found. If not now, then when?</span>
                ) : (
                  currentInvestment.map((investment) => (
                    <>
                      <div className="flex justify-between w-96 rounded-lg bg-gray-100 px-2 py-1">
                        <div className="flex gap-2">
                          <Image
                            src={investment.image_link}
                            alt={`${investment.coin_id} logo`}
                            width={44}
                            height={24}
                            priority
                          />
                          <div className="flex flex-col">
                            <span className="font-extrabold text-lg">
                              {investment.name}
                            </span>
                            <span className="text-md">
                              {"PHP"}{" "}
                              {(
                                (investment.amount_invested /
                                  investment.value_at_investment) *
                                investment.value_now
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          {Number.parseFloat(
                            getPercentIncrease({
                              pastPrice: investment.value_at_investment,
                              currentPrice: investment.value_now,
                            })
                          ) >= 0.0 ? (
                            <span className="font-extrabold text-green-500 text-lg">
                              {"+"}
                              {getPercentIncrease({
                                pastPrice: investment.value_at_investment,
                                currentPrice: investment.value_now,
                              })}
                            </span>
                          ) : (
                            <span className="font-extrabold text-red-500 text-lg">
                              {"-"}
                              {getPercentIncrease({
                                pastPrice: investment.value_at_investment,
                                currentPrice: investment.value_now,
                              })}
                            </span>
                          )}
                          <span className="text-md">
                            {investment.symbol.toUpperCase()}{" "}
                            {(
                              investment.amount_invested /
                              investment.value_at_investment
                            ).toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </>
                  ))
                )}
              </CardContent>
            </Card>
            <NewsCards />
          </div>
        </div>
      )}
    </>
  );
};
