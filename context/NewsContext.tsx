import { NewsContextProps, Article } from "@/types/types";
import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const NewsContext = createContext<NewsContextProps>({
  news: [],
  loading: true,
});

export const NewsContextProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://gnews.io/api/v4/search?q=%22crypto%20AND%20bitcoin%22&lang=en&country=us&max=3&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`
        );
        const mappedArticles: Article[] = response.data.articles.map(
          (article: any) => ({
            title: article.title,
            url: article.url,
            description: article.description,
            published_at: new Date(article.publishedAt),
            source: article.source.name,
          })
        );
        setNews(mappedArticles);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (news.length === 0 && loading) {
      updateNews();
    }
  }, [news]);

  return (
    <NewsContext.Provider value={{ news, loading }}>{children}</NewsContext.Provider>
  );
};

export const useNews = () => {
  return useContext(NewsContext);
};
