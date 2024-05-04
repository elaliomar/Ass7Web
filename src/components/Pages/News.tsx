import { useEffect, useState } from "react";
import { NewsData } from "../../types/newsTypes";
import { api } from "../../utils/services/axiosInterceptore";
import NewsGrid from "../organisms/NewsGrid";

const Home = () => {
  const [serverData, setServerData] = useState<NewsData[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchPosts = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await api
        .get(`/posts?page=${page}`)
        .then((response) => {
          console.log("length", response.data.results.length);
          setTotalPage(response.data.pagination.totalPages);
          if (response.data.results.length > 0) {
            setServerData((prevData) => [
              ...(prevData ?? []),
              ...response.data.results,
            ]);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container my-4 ">
      {isLoading && serverData?.length === 0 ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <NewsGrid
          serverData={serverData}
          page={page}
          totalPage={totalPage}
          loadMore={loadMore}
        />
      )}
    </div>
  );
};

export default Home;
