import React from 'react';
import { Image } from 'antd';

const ImagePreview = ({ collectionImage }) => {
  if (!collectionImage) return <span>No images</span>;

  const images = collectionImage.split(';');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {images.map((link, index) => (
        <Image
          key={index}
          width={50}
          src={link}
          alt={`Collection Image ${index + 1}`}
          style={{ marginRight: '5px' }}
          placeholder={
            <Image
              preview={false}
              src={`${link}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
              width={50}
            />
          }
        />
      ))}
    </div>
  );
};

export default ImagePreview;
