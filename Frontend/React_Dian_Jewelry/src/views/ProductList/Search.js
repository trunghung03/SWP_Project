import React from 'react';
import { useLocation } from 'react-router-dom';
import SubNav from '../../components/SubNav/SubNav.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import Question from '../../components/Question/Question.js';
import '../../styles/ProductList/Search.scss';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';



const Search = () => {
    const location = useLocation();
    const products = location.state?.products || [];
    const searchQuery = location.state?.searchQuery || '';
    const resetKey = searchQuery + products.length;

    const navItems = [
        { name: 'Home', link: '/home' },
        { name: 'Search' }
    ];

    return (
        <div className="Search">
            <HeaderComponent />
            <SubNav items={navItems} />
            <br />

            <div className="search_counter">
                <div className="results_count">
                    <p>{`(${products.length} Results)`}</p>
                </div>
            </div>

            <ProductList products={products} resetKey={resetKey} />
            <Question />
            <ScrollToTop />
            <Insta />
            <FooterComponent />
        </div>
    );
};

export default Search;
