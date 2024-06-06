import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import Question from '../../components/Question/Question.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList } from '../../services/ProductService.js';
import '../../styles/ProductList/Shape.scss';
import round from '../../assets/img/round.png';
import oval from '../../assets/img/oval.png';
import emerald from '../../assets/img/emerald.png';
import cushion from '../../assets/img/cushion.png';
import pear from '../../assets/img/pear.png';
import radiant from '../../assets/img/radiant.png';
import princess from '../../assets/img/princess.png';
import marquise from '../../assets/img/marquise.png';
import asscher from '../../assets/img/asscher.png';
import heart from '../../assets/img/heart.png';

function Shape() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [navItems, setNavItems] = useState(['Home', 'Diamond Jewelry', 'Shapes', 'Shape Name']);

    const navigate = useNavigate();
    const handleNavigate = (path, state) => {
        navigate(path, { state });
        window.scrollTo(0, 0);
    };

    const diamondShapes = [
        { img: round, name: 'Round' },
        { img: oval, name: 'Oval' },
        { img: emerald, name: 'Emerald' },
        { img: cushion, name: 'Cushion' },
        { img: pear, name: 'Pear' },
        { img: radiant, name: 'Radiant' },
        { img: princess, name: 'Princess' },
        { img: marquise, name: 'Marquise' },
        { img: asscher, name: 'Asscher' },
        { img: heart, name: 'Heart' },
    ];

    useEffect(() => {
        const { shape } = location.state || {};
        if (shape) {
            setNavItems(['Home', 'Diamond Jewelry', 'Shapes', shape]);

            getProductList()
                .then(response => {
                    const filteredProducts = response.data.filter(product => product.shape === shape);
                    setProducts(filteredProducts);
                })
                .catch(error => console.log('Error fetching products:', error));
        } else {
            setNavItems(['Home', 'Diamond Jewelry', 'Shapes']);
            getProductList()
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => console.log('Error fetching products:', error));
        }

        window.scrollTo(0, 0);
    }, [location.state]);

    return (
        <div className="Shape">
            <SubNav items={navItems} />
            <div className="s_diamond_shape_container">
                <div className="s_diamond_shape_grid">
                    {diamondShapes.map((shape, index) => (
                        <div key={index} className="s_diamond_shape_column" onClick={() => handleNavigate('/shape', { shape: shape.name })}>
                            <a href="#">
                                <img src={shape.img} alt={shape.name} className="s_diamond_shape_image" />
                                <p className="s_diamond_shape_name">{shape.name}</p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <br></br>
            <ProductList products={products} />
            <Question />
            <ScrollToTop />
        </div>
    );
}

export default Shape;
