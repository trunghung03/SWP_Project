import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import News from '../../components/News/News.js';
import Question from '../../components/Question/Question.js';
import '../../styles/ProductList/DiamondJewelry.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';

function DiamondJewelry() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7184/api/Product/list')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.log('Error fetching products:', error));
    }, []);

    return (
        <div className="DiamondJewelry">
            <SubNav items={['Home', 'Diamond Jewelry']} />
            <News /> <br />
            <ProductList products={products} />
            <Question />
            <ScrollToTop />
        </div>
    );
}

export default DiamondJewelry;