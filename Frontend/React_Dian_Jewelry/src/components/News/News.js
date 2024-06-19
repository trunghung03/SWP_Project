import React from 'react';
import './News.scss';
import ringBanner from '../../assets/img/ringBanner.png';

function News() {
    return (
        <div className="news_banner_main_wrapper">
            <div className="news_banner_image">
                <img src={ringBanner}></img>
            </div>
            <div className="news_banner_content">
                {/* <h6>Category</h6> */}
                <h2>RINGS</h2>
            </div>
        </div>
    );
}

export default News;
