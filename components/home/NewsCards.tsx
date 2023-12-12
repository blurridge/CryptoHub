"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNews } from "@/context/NewsContext";

export const NewsCards = () => {
  const { news } = useNews();
  const mappedNews = news.map((article) => (
    <Card className="grow" key={article.url}>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>
          {"by"} {article.source}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {article.description.substring(0, 250)}{"..."}
      </CardContent>
      <CardFooter>
        <a className="text-blue-500" href={article.url}>Read More</a>
      </CardFooter>
    </Card>
  ));

  return (
    <>
      <div className="flex flex-col gap-2 justify-stretch w-full">{mappedNews}</div>
    </>
  );
};
