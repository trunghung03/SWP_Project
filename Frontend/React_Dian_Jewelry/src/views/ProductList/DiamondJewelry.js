import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import News from '../../components/News/News.js';
import Question from '../../components/Question/Question.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList } from '../../services/ProductService.js';

function DiamondJewelry() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [navItems, setNavItems] = useState(['Home', 'Diamond Jewelry']);
    const [category, setCategory] = useState('');

    useEffect(() => {
        const categoryMap = {
            ring: [1, 5, 9],
            earrings: [2, 6],
            bracelet: [3, 7],
            necklace: [4, 8],
            weddingJewelry: [5, 6, 7, 8, 9],
            weddingRing: [5],
            weddingEarrings: [6],
            weddingBracelet: [7],
            weddingNecklace: [8],
            engagementRing: [9]
        };

        const { category } = location.state || {};
        setCategory(category || '');
        if (category) {
            if (category === 'all') {
                setNavItems(['Home', 'Diamond Jewelry']);
                getProductList()
                    .then(response => {
                        setProducts(response.data);
                    })
                    .catch(error => console.log('Error fetching products:', error));
            } else {
                if (category === 'weddingEarrings' || category === 'weddingBracelet' || category === 'weddingNecklace' || category === 'engagementRing' || category === 'weddingRing') {
                    setNavItems(['Home', 'Diamond Jewelry', 'Wedding Jewelry', category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim()]);
                }
                else if (category === 'weddingJewelry') {
                    setNavItems(['Home', 'Diamond Jewelry', 'Wedding Jewelry']);
                }
                else {
                    setNavItems(['Home', 'Diamond Jewelry', category.charAt(0).toUpperCase() + category.slice(1)]);
                }

                getProductList()
                    .then(response => {
                        const filteredProducts = response.data.filter(product => categoryMap[category].includes(product.categoryID));
                        setProducts(filteredProducts);
                    })
                    .catch(error => console.log('Error fetching products:', error));
            }
        } else {
            setNavItems(['Home', 'Diamond Jewelry']);
            getProductList()
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => console.log('Error fetching products:', error));
        }

        window.scrollTo(0, 0);
    }, [location.state]);

    return (
        <div className="DiamondJewelry">
            <SubNav items={navItems} />
            <News /> <br />
            <ProductList products={products} resetKey={category} />
            <Question />
            <ScrollToTop />
        </div>
    );
}

export default DiamondJewelry;
