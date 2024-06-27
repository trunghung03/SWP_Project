import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Select, MenuItem, InputLabel, FormControl, Button, TextField } from '@mui/material';
import SubNav from '../../components/SubNav/SubNav.js';
import Question from '../../components/Question/Question.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList, getCollectionDetail } from '../../services/ProductService.js';
import '../../styles/ProductList/Collection.scss';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import CollectionSlide from '../../components/CollectionSlide/CollectionSlide';

function Collection() {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [collectionInfo, setCollectionInfo] = useState(JSON.parse(localStorage.getItem('collectionInfo')) || {});
    const [navItems, setNavItems] = useState([]);
    const [clarity, setClarity] = useState('');
    const [carat, setCarat] = useState('');
    const [color, setColor] = useState('');
    const [sort, setSort] = useState('');
    const [shape, setShape] = useState('');
    const [resetKey, setResetKey] = useState(Date.now());
    const [transitionKey, setTransitionKey] = useState(Date.now());

    useEffect(() => {
        const { collectionId } = location.state || {};
        if (collectionId || collectionInfo.id) {
            const id = collectionId || collectionInfo.id;
            getCollectionDetail(id)
                .then(response => {
                    setCollectionInfo(response.data);
                    setNavItems([
                        { name: 'Home', link: '/home' },
                        { name: 'Diamond Jewelry', link: '' },
                        { name: response.data.name }
                    ]);
                })
                .catch(error => console.log('Error fetching collection details:', error));

            getProductList()
                .then(response => {
                    let filteredProducts = response.data.filter(product => product.collectionId === id);

                    if (clarity !== '') {
                        filteredProducts = filteredProducts.filter(product => product.clarity === clarity);
                    }
                    if (carat !== '') {
                        filteredProducts = filteredProducts.filter(product => product.carat === parseFloat(carat));
                    }
                    if (color !== '') {
                        filteredProducts = filteredProducts.filter(product => product.color === color);
                    }
                    if (shape !== '') {
                        filteredProducts = filteredProducts.filter(product => product.shape === shape);
                    }

                    setProducts(filteredProducts);
                    setResetKey(Date.now());
                })
                .catch(error => console.log('Error fetching products:', error));
        } else {
            setNavItems([
                { name: 'Home', link: '/home' },
                { name: 'Diamond Jewelry', link: '' }
            ]);
            getProductList()
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => console.log('Error fetching products:', error));
        }
    }, [location.state, clarity, carat, color, shape]);

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
        setShape('');
        setResetKey(Date.now());
    };

    const handleCollectionClick = (path, state) => {
        setTransitionKey(Date.now());
        window.scrollTo(0, 0);
        navigate(path, { state });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.querySelector('.collection_list_main_image').classList.add('visible');
        }, 10);
        return () => clearTimeout(timeout);
    }, [transitionKey]);

    return (
        <div className="Collection">
            <HeaderComponent />
            <SubNav items={navItems} />
            <div key={transitionKey} className="collection_list_main_image">
                <div className="collection_list_content">
                    <h2 className="collection_list_title">{collectionInfo.name}</h2>
                    <p>{collectionInfo.description}</p>
                </div>
            </div>
            <div className="collection_filters_and_products">
                <div className='product_list_note_wrapper'>
                    <p className='product_list_note'>Note: Jewelry prices displayed are for reference only and will vary based on market prices</p>
                </div>
                <div className="collection_filters_products">
                    {(clarity || carat || color || sort || shape) && (
                        <Button
                            onClick={handleRemoveFilters}
                            variant="outlined"
                            color="primary"
                            startIcon={<i className="fas fa-times"></i>}
                            className='collection_filter_group_remove'
                        >
                            Remove Filters
                        </Button>
                    )}
                    <FormControl className="collection_filter_group_sort" size="small">
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

                    <FormControl className="collection_filter_group" size="small">
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
                            <MenuItem value="I1">I1 </MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="collection_filter_group" size="small">
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
                    
                    <FormControl className="collection_filter_group" size="small">
                        <InputLabel id="shapeFilter-label">Shape</InputLabel>
                        <Select
                            labelId="shapeFilter-label"
                            id="shapeFilter"
                            value={shape}
                            label="Shape"
                            onChange={(e) => setShape(e.target.value)}
                        >
                            <MenuItem value="Round">Round</MenuItem>
                            <MenuItem value="Oval">Oval</MenuItem>
                            <MenuItem value="Emerald">Emerald</MenuItem>
                            <MenuItem value="Cushion">Cushion</MenuItem>
                            <MenuItem value="Pear">Pear</MenuItem>
                            <MenuItem value="Radiant">Radiant</MenuItem>
                            <MenuItem value="Princess">Princess</MenuItem>
                            <MenuItem value="Marquise">Marquise</MenuItem>
                            <MenuItem value="Asscher">Asscher</MenuItem>
                            <MenuItem value="Heart">Heart</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        className="collection_filter_group"
                        size="small"
                        id="caratFilter"
                        label="Carat"
                        type="number"
                        value={carat}
                        onChange={(e) => setCarat(e.target.value)}
                    />

                    
                </div>
                <ProductList products={products} resetKey={resetKey} />
            </div>

            <br></br><br></br>
            <CollectionSlide onCollectionClick={handleCollectionClick} />
            <br></br><br></br>

            <Question />
            <ScrollToTop />
            <Insta />
            <FooterComponent />
        </div>
    );
}

export default Collection;
