import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const ContentCard = ({ contentId, title, image, createdBy, date, tag}) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/contentDetail", { state: { contentId } });
  }
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex" onClick={handleCardClick}>
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url(${image})`}} title={title}>
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/>
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{createdBy}</p>
            <p className="text-gray-600">{date}</p>
            <p className="text-gray-600">{tag}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentList = ({ contents }) => {
  return (
    <div className="content_list">
      {contents && contents.map((content, index) => (
        <ContentCard
          key={index}
          contentID={content.contentId}
          title={content.title}
          image={content.image}
          createdBy={content.createdBy}
          date={content.date}
          tags={content.tag}
        />
      ))}
      hellocontent
    </div>
  );
};

export default ContentList;