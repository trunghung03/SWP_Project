import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
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
    const [clarity, setClarity] = useState('');
    const [carat, setCarat] = useState('');
    const [color, setColor] = useState('');
    const [sort, setSort] = useState('');
    const [resetKey, setResetKey] = useState(Date.now());

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

    }, [shape, location.state]);

    useEffect(() => {
        getProductList()
            .then(response => {
                let filteredProducts = response.data;

                if (clarity !== '') {
                    filteredProducts = filteredProducts.filter(product => product.clarity === clarity);
                }
                if (carat !== '') {
                    filteredProducts = filteredProducts.filter(product => product.carat === parseFloat(carat));
                }
                if (color !== '') {
                    filteredProducts = filteredProducts.filter(product => product.color === color);
                }

                filteredProducts = filteredProducts.filter(product => product.shape === shape);

                setProducts(filteredProducts);
                setResetKey(Date.now());
            })
            .catch(error => console.log('Error fetching products:', error));
    }, [clarity, carat, color, shape]);

    useEffect(() => {
        if (sort) {
            const sortedProducts = [...products].sort((a, b) => {
                switch (sort) {
                    case 'Newest':
                        return b.productId - a.productId;
                    case 'Oldest':
                        return a.productId - b.productId;
                    case 'Price (Low to High)':
                        return a.price - b.price;
                    case 'Price (High to Low)':
                        return b.price - a.price;
                    default:
                        return 0;
                }
            });
            setProducts(sortedProducts);
            setResetKey(Date.now());
        }
    }, [sort]);

    const handleRemoveFilters = () => {
        setClarity('');
        setCarat('');
        setColor('');
        setSort('');
        setResetKey(Date.now());
    };

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
            <div className="shape_filters_and_products">
                <div className="shape_filters_products">
                    {(clarity || carat || color || sort) && (
                        <Button
                            onClick={handleRemoveFilters}
                            variant="outlined"
                            color="primary"
                            startIcon={<i className="fas fa-times"></i>}
                            className='shape_filter_group_remove'
                        >
                            Remove Filters
                        </Button>
                    )}
                    <FormControl className="shape_filter_group_sort" size="small">
                        <InputLabel id="sortFilter-label">Sort</InputLabel>
                        <Select
                            labelId="sortFilter-label"
                            id="sortFilter"
                            value={sort}
                            label="Sort"
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <MenuItem value="Newest">Newest</MenuItem>
                            <MenuItem value="Oldest">Oldest</MenuItem>
                            <MenuItem value="Price (Low to High)">Price (Low to High)</MenuItem>
                            <MenuItem value="Price (High to Low)">Price (High to Low)</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="shape_filter_group" size="small">
                        <InputLabel id="clarityFilter-label">Clarity</InputLabel>
                        <Select
                            labelId="clarityFilter-label"
                            id="clarityFilter"
                            value={clarity}
                            label="Clarity"
                            onChange={(e) => setClarity(e.target.value)}
                        >
                            <MenuItem value="IF">IF</MenuItem>
                            <MenuItem value="VVS1">VVS1</MenuItem>
                            <MenuItem value="VVS2">VVS2</MenuItem>
                            <MenuItem value="VS1">VS1</MenuItem>
                            <MenuItem value="VS2">VS2</MenuItem>
                            <MenuItem value="SI1">SI1</MenuItem>
                            <MenuItem value="SI2">SI2</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="shape_filter_group" size="small">
                        <InputLabel id="caratFilter-label">Carat</InputLabel>
                        <Select
                            labelId="caratFilter-label"
                            id="caratFilter"
                            value={carat}
                            label="Carat"
                            onChange={(e) => setCarat(e.target.value)}
                        >
                            <MenuItem value="0.5">0.5</MenuItem>
                            <MenuItem value="1.0">1.0</MenuItem>
                            <MenuItem value="1.5">1.5</MenuItem>
                            <MenuItem value="2.0">2.0</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="shape_filter_group" size="small">
                        <InputLabel id="colorFilter-label">Color</InputLabel>
                        <Select
                            labelId="colorFilter-label"
                            id="colorFilter"
                            value={color}
                            label="Color"
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                            <MenuItem value="G">G</MenuItem>
                            <MenuItem value="H">H</MenuItem>
                            <MenuItem value="I">I</MenuItem>
                            <MenuItem value="J">J</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <ProductList key={resetKey} products={products} />
            </div>
            <Question />
            <ScrollToTop />
            <FooterComponent />
        </div>
    );
}

export default Shape;
