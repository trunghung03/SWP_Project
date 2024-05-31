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

function WeddingJewelry() {
    const navItems = ['Home', 'Diamond Jewelry', 'Wedding Jewelry'];

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductList()
            .then(response => {
                const filteredProducts = response.data.filter(product => [5, 6, 7, 8, 9].includes(product.categoryID));
                setProducts(filteredProducts);
            })
            .catch(error => console.log('Error fetching products:', error));
    }, []);

    return (
        <div className="WeddingJewelry">
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

export default WeddingJewelry;
