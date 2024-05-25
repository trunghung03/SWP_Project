import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './YouMayAlsoLike.scss';
import rightImage from '../../assets/img/feature6.webp';

function YouMayAlsoLike() {
    const navigate = useNavigate();

    const navigateToProductDetail = (product) => {
        navigate('/productDetail', {
            replace: true,
            state: { image: product.image, name: product.name, price: product.price }
        });
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const carousel = document.querySelector(".also_like_wrapper");
        const firstCardWidth = carousel.querySelector(".also_like_card").offsetWidth;
        const arrowBtns = document.querySelectorAll(".nav_arrow");
        let isDragging = false, startX, startScrollLeft;
        

        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const direction = btn.classList.contains("left_arrow") ? -1 : 1;
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

    }, []);

    return (
        <div>
            <div className="just_for_you_container">
                <div className="just_for_you_text">
                    <h3>Make Just For You</h3>
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
                    {[
                        { image: rightImage, name: "Product 1", price: 620.73 },
                        { image: rightImage, name: "Product 2", price: 620.73 },
                        { image: rightImage, name: "Product 3", price: 620.73 },
                        { image: rightImage, name: "Product 4", price: 620.73 },
                        { image: rightImage, name: "Product 5", price: 620.73 },
                        { image: rightImage, name: "Product 6", price: 620.73 },
                        { image: rightImage, name: "Product 7", price: 620.73 },
                        { image: rightImage, name: "Product 8", price: 620.73 }
                    ].map((product, index) => (
                        <div key={index} className="also_like_card" onClick={() => navigateToProductDetail(product)}>
                            <img src={product.image} alt={product.name} className="also_like_image" />
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
