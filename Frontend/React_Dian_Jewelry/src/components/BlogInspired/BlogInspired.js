import React from 'react';
import inspired1 from '../../assets/img/inspired1.png';
import inspired2 from '../../assets/img/inspired2.png';
import inspired3 from '../../assets/img/inspired3.png';
import inspired4 from '../../assets/img/inspired4.png';
import inspired5 from '../../assets/img/inspired5.png';
import inspired6 from '../../assets/img/inspired6.png';
import '../BlogInspired/BlogInspired.scss';

const BlogInspired = ({ openInstagram }) => {
  return (
    <div className="blog_inspired_container">
      <div className="row">
        {/* <div className='blog_inspired_title'>
          <h4>Get Inspired</h4>
          <p>Tag us on instagram @dianjewelry</p>
        </div> */}
        <div className="blog_inspired_grid">
          <div className="col-md-2 blog_inspired_column">
            <div className="blog_inspired_image" onClick={openInstagram}>
              <img src={inspired1} alt="Inspired 1" />
              <i className="fab fa-instagram inspired_icon"></i>
            </div>
          </div>
          <div className="col-md-2 blog_inspired_column">
            <div className="blog_inspired_image" onClick={openInstagram}>
              <img src={inspired2} alt="Inspired 2" />
              <i className="fab fa-instagram inspired_icon"></i>
            </div>
          </div>
          <div className="col-md-2 blog_inspired_column">
            <div className="blog_inspired_image" onClick={openInstagram}>
              <img src={inspired3} alt="Inspired 3" />
              <i className="fab fa-instagram inspired_icon"></i>
            </div>
          </div>
          <div className="col-md-2 blog_inspired_column">
            <div className="blog_inspired_image" onClick={openInstagram}>
              <img src={inspired4} alt="Inspired 4" />
              <i className="fab fa-instagram inspired_icon"></i>
            </div>
          </div>
          <div className="col-md-2 blog_inspired_column">
            <div className="blog_inspired_image" onClick={openInstagram}>
              <img src={inspired5} alt="Inspired 5" />
              <i className="fab fa-instagram inspired_icon"></i>
            </div>
          </div>
          <div className="col-md-2 blog_inspired_column">
            <div className="blog_inspired_image" onClick={openInstagram}>
              <img src={inspired6} alt="Inspired 6" />
              <i className="fab fa-instagram inspired_icon"></i>
            </div>
          </div>
        </div>
        <div className="instagram_circle" onClick={openInstagram}>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default BlogInspired;
