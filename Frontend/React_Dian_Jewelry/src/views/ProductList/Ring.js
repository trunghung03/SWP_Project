import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import News from '../../components/News/News.js';
import Question from '../../components/Question/Question.js';
import '../../styles/ProductList/DiamondJewelry.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList } from '../../services/ProductService.js';

function Ring() {
    const navItems = ['Home', 'Diamond Jewelry', 'Ring'];
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductList()
            .then(response => {
                const filteredProducts = response.data.filter(product => [1, 5, 9].includes(product.categoryID));
                setProducts(filteredProducts);
            })
            .catch(error => console.log('Error fetching products:', error));
    }, []);

    return (
        <div className="Ring">
            <SubNav items={navItems} />

            {/* Main image */}
            <News />
            <br />

            {/* Product card  */}
            <ProductList products={products} />

            {/* Bottom */}
            <Question />

            <ScrollToTop />
        </div>
    );
}

export default Ring;
