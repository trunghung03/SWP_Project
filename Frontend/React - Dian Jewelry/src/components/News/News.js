import React from 'react';
import { useNavigate } from 'react-router-dom';
import './News.scss';
import ringNews from '../../assets/img/ringNews.png';

function News() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/ring');
    };

    return (
        <div className="main_image">
            <div className="content">
                <h6>TODAY WE HAVE 5 NEW TYPE OF</h6>
                <h2>DIAMOND RINGS</h2>
                <p>
                    Simple and sophisticated, diamond rings showcase sleek, modern lines.
                    We have a unique way of using emerald-cut diamond side stones to elevate
                    the look of the center diamond. Shop this collection at Dian Jewelry to
                    find a ring that will never go out of style.
                </p>
                <button className="news_shop_now_btn" onClick={handleNavigate}>Shop now</button>
            </div>
            <div className="image_wrapper">
                <img src={ringNews} alt="Diamond Ring" />
            </div>
        </div>
    );
}

export default News;
