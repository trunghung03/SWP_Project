import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.scss';

const ProductCard = ({ id, image, name, price }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate('/productDetail', { state: { id } });
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
        navigate('/diamondJewelry');
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

const ProductList = ({ products }) => {
    const location = useLocation();

    const isDiamondJewelryPage = location.pathname === '/diamondJewelry';

    return (
        <div className="product_list">
            {products.map((product, index) => (
                <ProductCard key={index} id={product.productId} image={product.imageLinkList} name={product.name} price={product.price} />
            ))}
            <SpecialCard />
        </div>
    );
};

export default ProductList;
