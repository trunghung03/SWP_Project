import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CollectionSlide/CollectionSlide.scss';
import { getCollectionList } from '../../services/ProductService';

const CollectionSlide = ({ onCollectionClick }) => {
  // const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  const handleNavigate = (path, state) => {
    window.scrollTo(0, 160);
    navigate(path, { state });
  };

  useEffect(() => {
    getCollectionList("Customer").then(response => {
      setCollections(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".nav_arrow");
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const direction = btn.id === "left" ? -1 : 1;
        const firstCardWidth = carousel.querySelector(".card").offsetWidth;
        const scrollAmount = firstCardWidth;
        carousel.scrollBy({
          left: direction * scrollAmount,
          behavior: 'smooth'
        });
      });
    });

    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
    };
  }, []);

  return (
    <div className="featured_jewelry_container container">
      <div className='row'>
        <div className="col-lg-4 col-md-4 col-sm-12 left_section">
          <h1 className="featured_title">Our Collections</h1>
          <p className="featured_description">
            View our outstanding jewelry collections, where artistry meets timeless elegance.
            Each piece of jewelry is exquisitely crafted, bringing the splendor and class.
          </p>
          <button onClick={() => handleNavigate('/diamond-jewelry', { category: 'all' })} className="shop_now_btn">
            Shop now
          </button>
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 right_section wrapper">
          <i id="left" className="fa-solid fa-angle-left nav_arrow left_arrow" role="button"></i>
          <i id="right" className="fa-solid fa-angle-right nav_arrow right_arrow" role="button"></i>

          <ul className="carousel">
            {collections.map((collection, index) => {
              const collectionName = collection.name.replace(/\s+/g, '-').toLowerCase();
              return (
                <li key={index} className="home_product_card card" onClick={() => handleNavigate(`/collection/${collectionName}`, { collectionId: collection.collectionId })}>
                  <div className="home_product_icon_wrapper" data-tooltip="View collection">
                    <i className="far fa-eye home_product_icon_eye"></i>
                  </div>
                  <img src={collection.imageLink} alt={collection.name} className="home_product_image" />
                  <p className="home_product_name">{collection.name}</p>
                  <div className="home_collection_hover_effect"></div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CollectionSlide;
