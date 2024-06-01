import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContentCard.scss";

const ContentCart = ({ contentID, title, image, createdBy, date, tag }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/contentDetail", { state: { contentID } });
  };

  return (
    <div
      className="content_card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={title} />
      <h6>{title}</h6>
      <p>{createdBy}</p>
      <p>{date}</p>
      <p>{tag}</p>
    </div>
  );
};

const ContentList = ({ contents }) => {
  const location = useLocation();

  return (
    <div className="content_list">
      {contents.map((content, index) => (
        <ContentCart
          key={index}
          contentID={content.contentID}
          title={content.title}
          image={content.image}
          createdBy={content.createdBy}
          date={content.date}
          tag={content.tag}
        />
      ))}
    </div>
  );
};
export default ContentList;