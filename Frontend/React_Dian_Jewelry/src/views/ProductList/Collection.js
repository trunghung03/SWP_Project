import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
    const [navItems, setNavItems] = useState(['Home', 'Diamond Jewelry', 'Collection Name']);
    const [collection, setCollection] = useState('');

    useEffect(() => {
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

        const { collection } = location.state || {};
        if (collection) {
            const collectionId = collectionMap[collection];
            setCollection(collection);
            setNavItems(['Home', 'Diamond Jewelry', 'Collections', collection.charAt(0).toUpperCase() + collection.slice(1).replace(/([A-Z])/g, ' $1').trim()]);

            getCollectionDetail(collectionId)
                .then(response => {
                    setCollectionInfo(response.data);
                })
                .catch(error => console.log('Error fetching collection details:', error));

            getProductList()
                .then(response => {
                    const filteredProducts = response.data.filter(product => product.collectionId === collectionId);
                    setProducts(filteredProducts);
                })
                .catch(error => console.log('Error fetching products:', error));
        } else {
            setNavItems(['Home', 'Diamond Jewelry', 'Collections']);
            getProductList()
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => console.log('Error fetching products:', error));
        }

        window.scrollTo(0, 0);
    }, [location.state]);

    return (
        <div className="Collection">
            <HeaderComponent/>
            <SubNav items={navItems} />
            <div className="collection_list_main_image">
                <div className="collection_list_content">
                    <h2 className="collection_list_title">{collectionInfo.name}</h2>
                    <p>
                        {collectionInfo.description}
                    </p>
                </div>
            </div>
            <br></br>
            <ProductList products={products} resetKey={collection} />
            <Question />
            <ScrollToTop />
            <FooterComponent/>
        </div>
    );
}

export default Collection;
