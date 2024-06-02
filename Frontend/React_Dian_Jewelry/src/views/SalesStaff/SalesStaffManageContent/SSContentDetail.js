import React, { useState, useEffect } from 'react';

const SSContentDetail = ({ contentID }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContentDetail(contentID)
      .then(contentDetail => {
        setContent(contentDetail);
      })
      .catch(error => {
        console.error('There was an error fetching the content detail:', error);
      });
  }, [contentID]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
    </div>
  );
};

export default SSContentDetail;