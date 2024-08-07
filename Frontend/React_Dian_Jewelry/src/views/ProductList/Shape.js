import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Select, MenuItem, InputLabel, FormControl, Button, TextField } from '@mui/material';
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
import Insta from '../../components/BlogInspired/BlogInspired.js';
import CollectionSlide from '../../components/CollectionSlide/CollectionSlide';

function Shape() {
    const navigate = useNavigate();
    const location = useLocation();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [shape, setShape] = useState('');
    const [clarity, setClarity] = useState('');
    const [carat, setCarat] = useState('');
    const [color, setColor] = useState('');
    const [sort, setSort] = useState('');
    const [resetKey, setResetKey] = useState(Date.now());

    const handleNavigate = (path, state) => {
        navigate(path, { state });
        setTimeout(() => {
            const element = document.getElementById('productShapeScrollto');
            const offset = element.offsetTop - 50;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }, 0);
    };

    useEffect(() => {
        const { shape } = location.state || {};
        setShape(shape || '');

        if (shape) {
            setNavItems([
                { name: 'Home', link: '/home' },
                { name: 'Diamond Jewelry', link: '' },
                { name: shape, link: '' }
            ]);
        }

        const fetchProducts = async () => {
            try {
                const response = await getProductList();
                setAllProducts(response.data);
                filterProducts(response.data, shape);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    }, [location.state]);

    useEffect(() => {
        filterProducts(allProducts, shape);
    }, [clarity, carat, color, shape, sort, allProducts]);

    const filterProducts = (products, shape) => {
        let filtered = products;

        if (shape) {
            filtered = filtered.filter(product => product.shape === shape);
        }
        if (clarity) {
            filtered = filtered.filter(product => product.clarity === clarity);
        }
        if (carat) {
            filtered = filtered.filter(product => product.carat === parseFloat(carat));
        }
        if (color) {
            filtered = filtered.filter(product => product.color === color);
        }

        if (sort) {
            filtered.sort((a, b) => {
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
        }

        setFilteredProducts(filtered);
        setResetKey(Date.now());
    };

    const handleRemoveFilters = () => {
        setClarity('');
        setCarat('');
        setColor('');
        setSort('');
        setResetKey(Date.now());
    };

    useEffect(() => {
        const element = document.getElementById('productShapeScrollto');
        const offset = element.offsetTop - 50;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="Shape">
            <HeaderComponent />
            <SubNav items={navItems} />
            <br />
            {/* Diamond shape  */}
            <div className="s_diamond_shape_container">
                <div className="s_diamond_shape_grid">
                    <div className="s_diamond_shape_column">
                        <div onClick={() => handleNavigate('/shape', { shape: 'Round' })}>
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
            <div className="shape_filters_and_products" id="productShapeScrollto">
                <div className='product_list_note_wrapper'>
                    <p className='product_list_note'>Note: Jewelry prices displayed are for reference only and will vary based on market prices</p>
                </div>
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
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="IF">IF</MenuItem>
                            <MenuItem value="VVS1">VVS1</MenuItem>
                            <MenuItem value="VVS2">VVS2</MenuItem>
                            <MenuItem value="VS1">VS1</MenuItem>
                            <MenuItem value="VS2">VS2</MenuItem>
                            <MenuItem value="SI1">SI1</MenuItem>
                            <MenuItem value="SI2">SI2</MenuItem>
                            <MenuItem value="I1">I1 </MenuItem>
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
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                            <MenuItem value="E">E</MenuItem>
                            <MenuItem value="F">F</MenuItem>
                            <MenuItem value="G">G</MenuItem>
                            <MenuItem value="H">H</MenuItem>
                            <MenuItem value="I">I</MenuItem>
                            <MenuItem value="J">J</MenuItem>
                        </Select>
                    </FormControl>
{/* 
                    <TextField
                        className="shape_filter_group"
                        size="small"
                        id="caratFilter"
                        label="Carat"
                        type="number"
                        value={carat}
                        onChange={(e) => setCarat(e.target.value)}
                    /> */}
                </div>
                <ProductList products={filteredProducts} key={resetKey} />
            </div>

            <br></br><br></br>
            <CollectionSlide />
            <br></br><br></br>

            <Question />
            <ScrollToTop />
            <Insta />
            <FooterComponent />
        </div>
    );
}

export default Shape;
