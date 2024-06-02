import React, { useState, useEffect } from 'react';

const SSContentUpdate = ({ contentID }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    updateContent(contentID)
      .then(updatedContent => {
        setContent(updatedContent);
      })
      .catch(error => {
        console.error('There was an error updating the content:', error);
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

export default SSContentUpdate;