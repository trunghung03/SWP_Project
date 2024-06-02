import React, { useEffect, useState } from "react";
import { fetchAllContent } from "../../../services/SalesStaffService/SalesStaffContentService.js";
import ContentList from '../../../components/ContentCard/ContentCard.js';

function GetContentList() {
  
  const [content, setContentList] = useState([]); 

  useEffect(() => {
    fetchAllContent()
      .then((res) => {
        setContentList(res.data);
        console.log(res.data); 
      })  
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        <ContentList content={content} />
      </div>
    </>
  );
}

export default GetContentList;
