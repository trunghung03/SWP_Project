import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Select, MenuItem, InputLabel, FormControl, Button, TextField } from '@mui/material';
import '../../styles/ProductList/DiamondJewelry.scss';
import SubNav from '../../components/SubNav/SubNav.js';
import Question from '../../components/Question/Question.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList } from '../../services/ProductService.js';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import CollectionSlide from '../../components/CollectionSlide/CollectionSlide';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import allBanner from '../../assets/img/allBanner.png';
import weddingBanner from '../../assets/img/weddingBanner.png';
import ringBanner from '../../assets/img/ringBanner.png';
import earringsBanner from '../../assets/img/earringsBanner.png';
import braceletBanner from '../../assets/img/braceletBanner.png';
import necklaceBanner from '../../assets/img/necklaceBanner.png';
import weddingRingBanner from '../../assets/img/weddingRingBanner.png';
import weddingEarringsBanner from '../../assets/img/weddingEarringsBanner.png';
import weddingBraceletBanner from '../../assets/img/weddingBraceletBanner.png';
import weddingNecklaceBanner from '../../assets/img/weddingNecklaceBanner.png';
import engagementRingBanner from '../../assets/img/engagementRingBanner.png';

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
    const [bannerImage, setBannerImage] = useState('');
    const [bannerText, setBannerText] = useState('');
    const [transitionKey, setTransitionKey] = useState(Date.now());

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

    const categoryBannerMap = {
        all: { image: allBanner, text: 'Jewelry' },
        ring: { image: ringBanner, text: 'Rings' },
        earrings: { image: earringsBanner, text: 'Earrings' },
        bracelet: { image: braceletBanner, text: 'Bracelets' },
        necklace: { image: necklaceBanner, text: 'Necklaces' },
        weddingJewelry: { image: weddingBanner, text: 'Wedding Jewelry' },
        weddingRing: { image: weddingRingBanner, text: 'Wedding Rings' },
        weddingEarrings: { image: weddingEarringsBanner, text: 'Wedding Earrings' },
        weddingBracelet: { image: weddingBraceletBanner, text: 'Wedding Bracelets' },
        weddingNecklace: { image: weddingNecklaceBanner, text: 'Wedding Necklaces' },
        engagementRing: { image: engagementRingBanner, text: 'Engagement Rings' },
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

            if (categoryBannerMap[category]) {
                setBannerImage(categoryBannerMap[category].image);
                setBannerText(categoryBannerMap[category].text);
            }
            setTransitionKey(Date.now());

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
            setBannerImage(categoryBannerMap.all.image);
            setBannerText(categoryBannerMap.all.text);
            setTransitionKey(Date.now());
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

                if (clarity) {
                    filteredProducts = filteredProducts.filter(product => product.clarity === clarity);
                }
                if (carat) {
                    filteredProducts = filteredProducts.filter(product => product.carat === parseFloat(carat));
                }
                if (color) {
                    filteredProducts = filteredProducts.filter(product => product.color === color);
                }
                if (shape) {
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

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.querySelector('.news_banner_main_wrapper').classList.add('visible');
        }, 10);
        return () => clearTimeout(timeout);
    }, [transitionKey]);

    return (
        <div className="DiamondJewelry">
            <HeaderComponent />
            <SubNav items={navItems} />
            <div key={transitionKey} className="news_banner_main_wrapper">
                <div className="news_banner_image">
                    <img src={bannerImage} alt={bannerText} />
                </div>
            </div>
            <div className="filters_and_products">
                <div className='product_list_note_wrapper'>
                    <p className='product_list_note'>Note: Jewelry prices displayed are for reference only and will vary based on market prices</p>
                </div>
                <div className="filters_products">
                    {(clarity || carat || color || sort || shape) && (
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
                            <MenuItem value="">None</MenuItem>
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
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="IF">IF</MenuItem>
                            <MenuItem value="VVS1">VVS1</MenuItem>
                            <MenuItem value="VVS2">VVS2</MenuItem>
                            <MenuItem value="VS1">VS1</MenuItem>
                            <MenuItem value="VS2">VS2</MenuItem>
                            <MenuItem value="SI1">SI1</MenuItem>
                            <MenuItem value="SI2">SI2</MenuItem>
                            <MenuItem value="I1">I1</MenuItem>
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

                    <FormControl className="filter_group" size="small">
                        <InputLabel id="shapeFilter-label">Shape</InputLabel>
                        <Select
                            labelId="shapeFilter-label"
                            id="shapeFilter"
                            value={shape}
                            label="Shape"
                            onChange={(e) => setShape(e.target.value)}
                        >
                            <MenuItem value="">None</MenuItem>
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
                        className="filter_group"
                        size="small"
                        id="caratFilter"
                        label="Carat"
                        type="number"
                        value={carat}
                        onChange={(e) => setCarat(e.target.value)}
                        placeholder="None"
                    />
                </div>
                <ProductList products={products} resetKey={resetKey} />
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

export default DiamondJewelry;
