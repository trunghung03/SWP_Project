import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import '../../styles/ProductList/DiamondJewelry.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import News from '../../components/News/News.js';
import Question from '../../components/Question/Question.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList } from '../../services/ProductService.js';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';


function DiamondJewelry() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [navItems, setNavItems] = useState([]);
    const [category, setCategory] = useState('');
    const [clarity, setClarity] = useState('');
    const [carat, setCarat] = useState('');
    const [color, setColor] = useState('');
    const [sort, setSort] = useState('');
    const [shape, setShape] = useState('');
    const [resetKey, setResetKey] = useState(Date.now());

    const categoryMap = {
        all: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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

    useEffect(() => {
        const { category } = location.state || {};
        setCategory(category || '');

        if (category) {
            let navItems = [
                { name: 'Home', link: '/home' },
                { name: 'Diamond Jewelry', link: '' }
            ];

            if (category === 'weddingEarrings' || category === 'weddingBracelet' || category === 'weddingNecklace' || category === 'engagementRing' || category === 'weddingRing') {
                navItems.push({ name: 'Wedding Jewelry', link: '' });
                navItems.push({ name: category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim(), link: '' });
            } else if (category === 'weddingJewelry') {
                navItems.push({ name: 'Wedding Jewelry', link: '' });
            } else if (category === 'all') {
                navItems = [
                    { name: 'Home', link: '/home' },
                    { name: 'Diamond Jewelry', link: '' }
                ];
            } else {
                navItems.push({ name: category.charAt(0).toUpperCase() + category.slice(1), link: '' });
            }
            setNavItems(navItems);
            
            setClarity('');
            setCarat('');
            setColor('');
            setSort('');
            setShape('');
            setResetKey(Date.now());

            getProductList()
                .then(response => {
                    let filteredProducts = response.data;

                    filteredProducts = filteredProducts.filter(product => categoryMap[category].includes(product.categoryID));

                    setProducts(filteredProducts);
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
    }, [location.state]);

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
                if (shape !== '') {
                    filteredProducts = filteredProducts.filter(product => product.shape === shape);
                }

                filteredProducts = filteredProducts.filter(product => categoryMap[category]?.includes(product.categoryID));

                setProducts(filteredProducts);
                setResetKey(Date.now());
            })
            .catch(error => console.log('Error fetching products:', error));
    }, [clarity, carat, color, shape, category]);


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

    return (
        <div className="DiamondJewelry">
            <HeaderComponent />
            <SubNav items={navItems} />
            <News />
            <div className="filters_and_products">
                <div className="filters_products">
                    {(clarity || carat || color || sort) && (
                        <Button
                            onClick={handleRemoveFilters}
                            variant="outlined"
                            color="primary"
                            startIcon={<i className="fas fa-times"></i>}
                            className='filter_group_remove'
                        >
                            Remove Filters
                        </Button>
                    )}
                    <FormControl className="filter_group_sort" size="small">
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
                    <FormControl className="filter_group" size="small">
                        <InputLabel id="clarityFilter-label">Clarity</InputLabel>
                        <Select
                            labelId="clarityFilter-label"
                            id="clarityFilter"
                            value={clarity}
                            label="Clarity"
                            onChange={(e) => setClarity(e.target.value)}
                        >
                            <MenuItem value="FL">FL</MenuItem>
                            <MenuItem value="IF">IF</MenuItem>
                            <MenuItem value="VVS1">VVS1</MenuItem>
                            <MenuItem value="VVS2">VVS2</MenuItem>
                            <MenuItem value="VS1">VS1</MenuItem>
                            <MenuItem value="VS2">VS2</MenuItem>
                            <MenuItem value="SI1">SI1</MenuItem>
                            <MenuItem value="SI2">SI2</MenuItem>
                            <MenuItem value="I1">I1 </MenuItem>
                            <MenuItem value="I2">I2</MenuItem>
                            <MenuItem value="I3">I3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="filter_group" size="small">
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
                            <MenuItem value="K">K</MenuItem>
                            <MenuItem value="L">L</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="N">N</MenuItem>
                            <MenuItem value="O">O</MenuItem>
                            <MenuItem value="P">P</MenuItem>
                            <MenuItem value="Q">Q</MenuItem>
                            <MenuItem value="R">R</MenuItem>
                            <MenuItem value="S">S</MenuItem>
                            <MenuItem value="T">T</MenuItem>
                            <MenuItem value="U">U</MenuItem>
                            <MenuItem value="V">V</MenuItem>
                            <MenuItem value="W">W</MenuItem>
                            <MenuItem value="X">X</MenuItem>
                            <MenuItem value="Y">Y</MenuItem>
                            <MenuItem value="Z">Z</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="filter_group" size="small">
                        <InputLabel id="caratFilter-label">Carat</InputLabel>
                        <Select
                            labelId="caratFilter-label"
                            id="caratFilter"
                            value={carat}
                            label="Carat"
                            onChange={(e) => setCarat(e.target.value)}
                        >
                            <MenuItem value="0.02">0.02 ct</MenuItem>
                            <MenuItem value="0.03">0.03 ct</MenuItem>
                            <MenuItem value="0.04">0.04 ct</MenuItem>
                            <MenuItem value="0.05">0.05 ct</MenuItem>
                            <MenuItem value="0.10">0.10 ct</MenuItem>
                            <MenuItem value="0.20">0.20 ct</MenuItem>
                            <MenuItem value="0.30">0.30 ct</MenuItem>
                            <MenuItem value="0.40">0.40 ct</MenuItem>
                            <MenuItem value="0.50">0.50 ct</MenuItem>
                            <MenuItem value="0.60">0.60 ct</MenuItem>
                            <MenuItem value="0.70">0.70 ct</MenuItem>
                            <MenuItem value="0.80">0.80 ct</MenuItem>
                            <MenuItem value="0.90">0.90 ct</MenuItem>
                            <MenuItem value="1">1 ct</MenuItem>
                            <MenuItem value="1.5">1.5 ct</MenuItem>
                            <MenuItem value="2">2 ct</MenuItem>
                            <MenuItem value="2.5">2.5 ct</MenuItem>
                            <MenuItem value="3">3 ct</MenuItem>
                            <MenuItem value="3.5">3.5 ct</MenuItem>
                            <MenuItem value="4">4 ct</MenuItem>
                            <MenuItem value="4.5">4.5 ct</MenuItem>
                            <MenuItem value="5">5 ct</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="filter_group" size="small">
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
                </div>
                <ProductList products={products} resetKey={resetKey} />
            </div>
            <Question />
            <ScrollToTop />
            <Insta />
            <FooterComponent />
        </div>
    );
}

export default DiamondJewelry;
