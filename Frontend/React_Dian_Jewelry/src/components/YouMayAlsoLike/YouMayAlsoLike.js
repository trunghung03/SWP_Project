import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './YouMayAlsoLike.scss';
import { getProductsByIds } from '../../services/ProductService';

function YouMayAlsoLike() {
    const navigate = useNavigate();
    const [alsoLikeProducts, setAlsoLikeProducts] = useState([]);

    useEffect(() => {
        const alsoLikeProductIds = [1, 2, 3, 4, 5, 6, 7, 8];
        getProductsByIds(alsoLikeProductIds)
            .then(response => {
                setAlsoLikeProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const navigateToProductDetail = (productId) => {
        window.scrollTo(0, 0);
        navigate('/productDetail', { state: { id: productId } });
    };

    useEffect(() => {
        const initCarousel = () => {
            const carousel = document.querySelector(".also_like_wrapper");
            if (!carousel) return;
            const firstCardWidth = carousel.querySelector(".also_like_card")?.offsetWidth || 0;
            const arrowBtns = document.querySelectorAll(".nav_arrow");
            let isDragging = false, startX, startScrollLeft;

            arrowBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const direction = btn.classList.contains("left_arrow") ? -1 : 1;
                    const scrollAmount = firstCardWidth * direction;
                    carousel.scrollBy({
                        left: scrollAmount,
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
                const currentX = e.pageX;
                carousel.scrollLeft = startScrollLeft - (currentX - startX);
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
        };

        initCarousel();
    }, [alsoLikeProducts]);

    return (
        <div>
            <div className="just_for_you_container">
                <div className="just_for_you_text">
                    <h3>Made Just For You</h3>
                    <p>At our San Francisco design studio, our team designs every ring to delight you, from the first time you see it and every day after. We carefully consider the entire piece—obsessing over comfort, quality, and durability so you can cherish it for a lifetime.</p>
                </div>
                <div className="just_for_you_features">
                    <div className="feature">
                        <i className="fas fa-recycle"></i>
                        <p><strong>Recycle Gold and Silver</strong><br />We say no to 'dirty gold'</p>
                    </div>
                    <hr className="jfy_line1" />
                    <div className="feature with-lines">
                        <i className="fas fa-gift"></i>
                        <p><strong>Responsibly Packaged</strong><br />Made with less energy, less water, and fewer emissions</p>
                    </div>
                    <hr className="jfy_line2" />
                    <div className="feature">
                        <i className="fas fa-leaf"></i>
                        <p><strong>Progress to Carbon Neutrality</strong><br />We are committed to protecting the planet</p>
                    </div>
                </div>
            </div>
            <div className="also_like_container">
                <h2 className="also_like_title">YOU MAY ALSO LIKE</h2>
                <div className="nav_arrow left_arrow">
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div className="also_like_wrapper">
                    {alsoLikeProducts.map((product, index) => (
                        <div key={index} className="also_like_card" onClick={() => navigateToProductDetail(product.productId)}>
                            <img src={product.imageLinkList} alt={product.name} className="also_like_image" />
                            <p className="also_like_name">{product.name}</p>
                            <p className="also_like_price">${product.price}</p>
                        </div>
                    ))}
                </div>
                <div className="nav_arrow right_arrow">
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        </div>
    );
}

export default YouMayAlsoLike;
