import React from "react";
import capitalizeFirstLetter from "../../utils/capitilizeFirstLetter";
import { NewsGridProps } from "../../types/newsGridProps";
import { Link } from "react-router-dom";
import CustomButton from "../atoms/CustomButton";

const NewsGrid: React.FC<NewsGridProps> = ({
  serverData,
  page,
  totalPage,
  loadMore,
}) => {
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {serverData?.map((data) => (
          <div className="col" key={data._id}>
            <Link className="link-underline-light" to={`/news/${data._id}`}>
              <div className="card h-100 shadow btn btn-outline-light">
                {data.image_url === null ? (
                  <img
                    src="src/assets/emtyImage.png"
                    className="card-img-top"
                    alt="..."
                  />
                ) : (
                  <img
                    src={data.image_url}
                    className="card-img-top"
                    alt="..."
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title text-primary">
                    {capitalizeFirstLetter(data.source_id)}
                  </h5>
                  <p className="card-text">{data.title}</p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated{" "}
                    <span className="text-primary text-opacity-75">
                      {data.pubDate}
                    </span>
                  </small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="my-3 ">
        {page < totalPage && (
          <div className="d-flex justify-content-center">
            <CustomButton title="Load more..." onClick={loadMore} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsGrid;
