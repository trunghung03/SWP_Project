import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import Question from '../../components/Question/Question.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList } from '../../services/ProductService.js';
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
import '../../styles/ProductList/Shape.scss';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';


function Shape() {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [navItems, setNavItems] = useState(['Home', 'Diamond Jewelry', 'Shapes']);
    const [shape, setShape] = useState('');

    const handleNavigate = (path, state) => {
        navigate(path, { state });
    };

    useEffect(() => {
        const { shape } = location.state || {};

        if (shape) {
            setShape(shape);
            setNavItems(['Home', 'Diamond Jewelry', 'Shapes', shape]);
        }

        getProductList()
            .then(response => {
                const filteredProducts = response.data.filter(product => product.shape === shape);
                setProducts(filteredProducts);
            })
            .catch(error => {
                console.log('Error fetching products:', error);
            });

        window.scrollTo(0, 0);
    }, [shape, location.state]);

    return (
        <div className="Shape">
            <HeaderComponent/>
            <SubNav items={navItems} />
            <br />
            {/* Diamond shape  */}
            <div className="s_diamond_shape_container">
                <div className="s_diamond_shape_grid">
                    <div className="s_diamond_shape_column">
                        <div  onClick={() => handleNavigate('/shape', { shape: 'Round' })}>
                            <img src={round} alt="Round" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Round</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Oval' })}>
                            <img src={oval} alt="Oval" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Oval</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Emerald' })}>
                            <img src={emerald} alt="Emerald" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Emerald</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Cushion' })}>
                            <img src={cushion} alt="Cushion" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Cushion</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Pear' })}>
                            <img src={pear} alt="Pear" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Pear</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Radiant' })}>
                            <img src={radiant} alt="Radiant" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Radiant</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Princess' })}>
                            <img src={princess} alt="Princess" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Princess</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Marquise' })}>
                            <img src={marquise} alt="Marquise" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Marquise</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Asscher' })}>
                            <img src={asscher} alt="Asscher" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Asscher</p>
                        </div>
                    </div>
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Heart' })}>
                            <img src={heart} alt="Heart" className="s_diamond_shape_image" />
                            <p className="s_diamond_shape_name">Heart</p>
                        </div>
                    </div>
                </div>
            </div>
            <ProductList products={products} resetKey={shape} />
            <Question />
            <ScrollToTop />
            <FooterComponent/>
        </div>
    );
}

export default Shape;
