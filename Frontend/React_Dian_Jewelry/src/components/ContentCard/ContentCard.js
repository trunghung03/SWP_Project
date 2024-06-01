import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'flowbite';

const ContentCard = ({ contentID, title, image, createdBy, date }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate("/contentDetail", { state: { contentID } });
  }
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" onClick ={handleCardClick}>
      <a href="javascript:void(0)">
        <img className="rounded-t-lg" src={image} alt="Content Image" />
      </a>
      <div className="p-5">
        <a href="javascript:void(0)">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Created by {createdBy} on {date}</p>
        <a href="javascript:void(0)" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </a>
      </div>
      <p>testtt</p>
    </div>
  );
};

const ContentList = ({ contents }) => {
  return (
    <div className="content_list">
      {contents.map((content, index) => (
        <ContentCard
          key={index}
          contentID={content.contentID} // Pass the contentID
          title={content.title}
          image={content.image}
          createdBy={content.createdBy}
          date={content.date}
        />
      ))}
      content card
    </div>
  );
};

export default ContentList;