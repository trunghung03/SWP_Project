import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import News from '../../components/News/News.js';
import Question from '../../components/Question/Question.js';
import '../../styles/ProductList/DiamondJewelry.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';

function Earings() {
    const navItems = ['Home', 'Diamond Jewelry', 'Earings'];

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:1880/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log('Error fetching products:', error));
    }, []);

    return (
        <div className="Earings">
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

export default Earings;
