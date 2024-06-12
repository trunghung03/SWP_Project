import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.scss';

const ProductCard = ({ id, image, name, price }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/product-detail', { state: { id } });
    };

    return (
        <div className="product_card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <img src={image} alt={name} />
            <h6>{name}</h6>
            <p>{price}$</p>
        </div>
    );
};

const SpecialCard = () => {
    const navigate = useNavigate();

    const handleShopNowClick = () => {
        navigate('/diamond-jewelry');
    };

    return (
        <div className="special_card">
            <h5>Don't see what you are looking for?</h5>
            <hr className="special_line" />
            <p>Browse our full catalog for more jewelry</p>
            <button className="all_shop_now_btn" onClick={handleShopNowClick}>Shop now</button>
        </div>
    );
};

const ProductList = ({ products, resetKey }) => {
    const [visibleProducts, setVisibleProducts] = useState(12);

    useEffect(() => {
        setVisibleProducts(12);
    }, [resetKey]);

    const handleSeeMore = () => {
        setVisibleProducts(visibleProducts + 12);
    };

    const displayedProducts = products.slice(0, visibleProducts);

    return (
        <div className="product_list col-lg-12">
            {displayedProducts.map((product, index) => (
                <ProductCard key={index} id={product.productId} image={product.imageLinkList} name={product.name} price={product.price} />
            ))}
            {visibleProducts < products.length ? (
                <div className="product_see_more_container">
                    <button className="product_see_more_button" onClick={handleSeeMore}>View More</button>
                </div>
            ) : (
                <SpecialCard />
            )}
        </div>
    );
};

export default ProductList;
