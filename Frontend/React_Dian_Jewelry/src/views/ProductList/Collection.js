import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import SubNav from '../../components/SubNav/SubNav.js';
import Question from '../../components/Question/Question.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import ProductList from '../../components/ProductCard/ProductCard.js';
import { getProductList, getCollectionDetail } from '../../services/ProductService.js';
import '../../styles/ProductList/Collection.scss';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';

function Collection() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [collectionInfo, setCollectionInfo] = useState({});
    const [navItems, setNavItems] = useState([]);
    const [collection, setCollection] = useState('');
    const [clarity, setClarity] = useState('');
    const [carat, setCarat] = useState('');
    const [color, setColor] = useState('');
    const [sort, setSort] = useState('');
    const [shape, setShape] = useState('');
    const [resetKey, setResetKey] = useState(Date.now());

    const collectionMap = {
        luxuriousLustre: 1,
        radiantReflections: 2,
        majesticMementos: 3,
        blissfulBaubles: 4,
        timelessTreasures: 5,
        divineDiamonds: 6,
        majesticMystique: 7,
        vintageVirtue: 8
    };

    useEffect(() => {
        const { collection } = location.state || {};
        if (collection) {
            const collectionId = collectionMap[collection];
            setCollection(collection);
            setNavItems([
                { name: 'Home', link: '/home' },
                { name: 'Diamond Jewelry', link: '' },
                { name: collection.charAt(0).toUpperCase() + collection.slice(1).replace(/([A-Z])/g, ' $1').trim(), link: '' }
            ]);

            getCollectionDetail(collectionId)
                .then(response => {
                    setCollectionInfo(response.data);
                })
                .catch(error => console.log('Error fetching collection details:', error));

            getProductList()
                .then(response => {
                    let filteredProducts = response.data.filter(product => product.collectionId === collectionId);

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

    return (
        <div className="Collection">
            <HeaderComponent />
            <SubNav items={navItems} />
            <div className="collection_list_main_image">
                <div className="collection_list_content">
                    <h2 className="collection_list_title">{collectionInfo.name}</h2>
                    <p>{collectionInfo.description}</p>
                </div>
            </div>
            <div className="collection_filters_and_products">
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
                    <FormControl className="collection_filter_group" size="small">
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
                </div>
                <ProductList products={products} resetKey={resetKey} />
            </div>
            <Question />
            <ScrollToTop />
            <FooterComponent />
        </div>
    );
}

export default Collection;
