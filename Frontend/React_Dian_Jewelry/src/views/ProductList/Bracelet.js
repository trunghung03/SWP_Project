import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import News from '../../components/News/News.js';
import Question from '../../components/Question/Question.js';
import '../../styles/ProductList/DiamondJewelry.scss';
import productImg from '../../assets/img/feature6.webp';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';

const products = [
    { image: productImg, name: 'Radiance Ring1', price: 168.7 },
    { image: productImg, name: 'Radiance Ring2', price: 168.7 },
    { image: productImg, name: 'Radiance Ring3', price: 168.7 },
    { image: productImg, name: 'Radiance Ring4', price: 168.7 },
    { image: productImg, name: 'Radiance Ring5', price: 168.7 },
    { image: productImg, name: 'Radiance Ring6', price: 168.7 },
    { image: productImg, name: 'Radiance Ring7', price: 168.7 }
];

function Bracelet() {
    const navItems = ['Home', 'Diamond Jewelry', 'Bracelet'];

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:1880/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log('Error fetching products:', error));
    }, []);

    return (
        <div className="Bracelet">
            <SubNav items={navItems} />

            {/* Main image */}
            <News />
            <br />

            {/* Product card  */}
            <ProductList products={products} />

            {/* Bottom */}
            <Question></Question>

            <ScrollToTop />
        </div>
    );
}

export default Bracelet;
