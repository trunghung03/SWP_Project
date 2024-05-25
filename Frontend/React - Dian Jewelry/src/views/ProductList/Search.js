import React from 'react';
import { useLocation } from 'react-router-dom';
import SubNav from '../../components/SubNav/SubNav.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import Question from '../../components/Question/Question.js';
import '../../styles/ProductList/Search.scss';

const Search = () => {
    const location = useLocation();
    const products = location.state?.products || [];

    const navItems = ['Home', 'Search'];

    return (
        <div className="Search">
            <SubNav items={navItems} />
            <br />

            <div className="search_counter">
                <div className="results_count">
                    <p>{`(${products.length} Results)`}</p>
                </div>
            </div>

            <ProductList products={products} />
            <Question />
            <ScrollToTop />
        </div>
    );
};

export default Search;
