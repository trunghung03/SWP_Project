import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.scss';

const ProductCard = ({ id, image, name, price, color, carat, clarity }) => {
    const navigate = useNavigate();

    const handleViewClick = (e) => {
        e.stopPropagation();
        navigate('/product-detail', { state: { id } });
    };

    return (
        <div className="product_card">
            <img src={image} alt={name} />
            <button className="product_view_button" onClick={handleViewClick}>View Detail</button>
            <p className='product_card_detail'>{clarity} | {carat} | {color}</p>
            <h6 className='product_card_name'>{name}</h6>
            <p className='product_card_price'>{price}$</p>
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
                <ProductCard 
                key={index} 
                id={product.productId} 
                image={product.imageLinkList} 
                name={product.name} 
                price={product.price}  
                color={product.color}
                carat={product.carat}
                clarity={product.clarity}
                />
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
