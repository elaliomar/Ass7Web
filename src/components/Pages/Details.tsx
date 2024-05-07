import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewsData } from "../../types/newsTypes";
import { api } from "../../utils/services/axiosInterceptore";
import capitalizeFirstLetter from "../../utils/capitilizeFirstLetter";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import emptyIMG from "../../assets/emtyImage.png";
import "../../styles/Details.css";
const Details = () => {
  const params = useParams();
  const [serverData, setServerData] = useState<NewsData[]>([]);
  const postId = params.newsId;
  const selectedNews = serverData.filter((news) => news._id === postId);

  const fetchPosts = async () => {
    await api.get(`/posts?pageSize=${110}`).then((res) => {
      setServerData(res.data.results);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, [postId]);

  return (
    <div className="container  my-4">
      {selectedNews.length > 0 ? (
        selectedNews.map((data) => (
          <div className="card mb-3 p-2" key={data._id}>
            <div className=" d-flex justify-content-center">
              <img
                src={data.image_url === null ? emptyIMG : data.image_url}
                className="card-img-top rounded img-fluid w-50"
                alt="..."
              />
            </div>

            <div className="card-body">
              <p className="card-text fw-bold fs-3">{data.title}</p>
              <div className="bg-secondary my-4 custom-divider"></div>
              {data.description != null ? (
                <p className="card-text">{data.description}</p>
              ) : (
                <p className="card-text">Empty description</p>
              )}
              <div className="card-text">
                <div className="bg-secondary my-4 custom-divider"></div>
                <div className="d-flex flex-row justify-content-center gap-1 ">
                  {data.keywords != null ? (
                    data.keywords?.map((keyword, index) => {
                      return (
                        <p key={index} className="lh-1 fw-lighter">
                          {" "}
                          #{keyword}{" "}
                        </p>
                      );
                    })
                  ) : (
                    <p className="lh-1 fw-lighter">No keywords</p>
                  )}
                </div>
                <div className="bg-secondary my-2 custom-divider"></div>
                <div className="d-flex flex-row gap-2">
                  <div className=" d-flex justify-content-center align-items-center custom-icon ">
                    <img
                      src={
                        data.source_icon === null ? emptyIMG : data.source_icon
                      }
                      className="rounded-circle custom-icon"
                      alt="..."
                    />
                  </div>
                  <div className="fs-4 fw-bold text-primary  d-flex flex-row justify-content-center align-items-center">
                    {capitalizeFirstLetter(data.source_id)}
                  </div>
                </div>
                <div className="bg-secondary my-2 custom-divider"></div>
                <div className=" d-flex flex-row  align-items-center gap-1">
                  <BsCalendar2DateFill />
                  <small className="text-body-secondary">
                    Published since{" "}
                    <span className="text-primary">{data.pubDate}</span>
                  </small>
                </div>
                <div className="bg-secondary my-2 custom-divider"></div>
                <div className=" d-flex flex-row  align-items-center gap-1">
                  <FaLocationDot />
                  <small className="text-body-secondary fw-semibold">
                    {data.country && data.country.length > 0
                      ? data.country[0]
                      : "Country not available"}
                  </small>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
