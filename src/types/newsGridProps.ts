import { NewsData } from "./newsTypes";
export interface NewsGridProps {
    serverData: NewsData[] | null;
    page: number;
    totalPage: number;
    loadMore: () => void;
  }