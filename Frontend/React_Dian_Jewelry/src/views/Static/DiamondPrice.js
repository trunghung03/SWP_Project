import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Static/DiamondPrice.scss';
import diamondPriceMidImage1 from '../../assets/img/holdDiamond.jpeg';
import diamondPriceMidImage2 from '../../assets/img/gia.webp';
import diamondPriceMidImage3 from '../../assets/img/gia2.jpg';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { getDiamondPrice, getShellMaterials, getShellMaterialById, getAllDiamonds } from '../../services/PricingService';
import { getProductList } from '../../services/ProductService.js';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';

const imageStyle = {
  width: '220px',
  height: '220px',
  objectFit: 'cover',
};

function DiamondPrice() {
  const [transitionKey, setTransitionKey] = useState(Date.now());
  const [cut, setCut] = useState('');
  const [color, setColor] = useState('');
  const [carat, setCarat] = useState('');
  const [clarity, setClarity] = useState('');
  const [price, setPrice] = useState('');
  const [showPrice, setShowPrice] = useState(false);
  const [loading, setLoading] = useState(false);

  const [shellMaterials, setShellMaterials] = useState([]);
  const [selectedShell, setSelectedShell] = useState('');
  const [shellPrice, setShellPrice] = useState('');
  const [shellLoading, setShellLoading] = useState(false);

  const [diamonds, setDiamonds] = useState([]);
  const [filteredDiamonds, setFilteredDiamonds] = useState([]);
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedCut, setSelectedCut] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedClarity, setSelectedClarity] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [resetKey, setResetKey] = useState(Date.now());

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector('.diamond_price_main_image').classList.add('visible');
    }, 10);
    return () => clearTimeout(timeout);
  }, [transitionKey]);

  useEffect(() => {
    getShellMaterials()
      .then(response => {
        setShellMaterials(response.data);
      })
      .catch(error => {
      });

    getAllDiamonds()
      .then(response => {
        setDiamonds(response.data);
        setFilteredDiamonds(response.data);
      })
      .catch(error => {
      });

    getProductList()
      .then(response => {
        const filtered = response.data.filter(product => product.categoryID === 10);
        setProducts(filtered);
        setFilteredProducts(filtered);
      })
      .catch(error => console.log(error));
  }, []);

  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Diamond Price', link: '/diamond-price' }
  ];

  const calculatePrice = () => {
    if (!cut || !color || !carat || !clarity) {
      setPrice('Please fill in all fields for the most accurate price');
      setShowPrice(true);
      return;
    }

    setLoading(true);
    getDiamondPrice(cut, carat, clarity, color)
      .then(response => {
        const data = response.data;
        if (data.detail) {
          setPrice('Diamond not found');
        } else {
          setPrice(`${Math.round(data.price)}$`);
        }
        setShowPrice(true);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching price:', error);
        setPrice('Diamond not found');
        setShowPrice(true);
        setLoading(false);
      });
  };

  const checkShellPrice = () => {
    if (!selectedShell) {
      setShellPrice('Please select a shell material');
      return;
    }

    setShellLoading(true);
    getShellMaterialById(selectedShell)
      .then(response => {
        const data = response.data;
        setShellPrice(`Price: ${data.price}$`);
        setShellLoading(false);
      })
      .catch(error => {
        setShellPrice('Shell material not found');
        setShellLoading(false);
      });
  };

  const handleShapeFilterChange = (e) => {
    setSelectedShape(e.target.value);
    applyFilters(e.target.value, selectedCut, selectedColor, selectedClarity);
  };

  const handleCutFilterChange = (e) => {
    setSelectedCut(e.target.value);
    applyFilters(selectedShape, e.target.value, selectedColor, selectedClarity);
  };

  const handleColorFilterChange = (e) => {
    setSelectedColor(e.target.value);
    applyFilters(selectedShape, selectedCut, e.target.value, selectedClarity);
  };

  const handleClarityFilterChange = (e) => {
    setSelectedClarity(e.target.value);
    applyFilters(selectedShape, selectedCut, selectedColor, e.target.value);
  };

  const applyFilters = (shape, cut, color, clarity) => {
    let filtered = diamonds;
    if (shape) {
      filtered = filtered.filter(diamond => diamond.shape === shape);
    }
    if (cut) {
      filtered = filtered.filter(diamond => diamond.cut === cut);
    }
    if (color) {
      filtered = filtered.filter(diamond => diamond.color === color);
    }
    if (clarity) {
      filtered = filtered.filter(diamond => diamond.clarity === clarity);
    }
    setFilteredDiamonds(filtered);
  };

  const handleRemoveFilters = () => {
    setSelectedShape('');
    setSelectedCut('');
    setSelectedColor('');
    setSelectedClarity('');
    setFilteredDiamonds(diamonds);
  };

  const handleViewClick = (productName, productId) => {
    const formattedName = productName.replace(/\s+/g, '-').toLowerCase();
    navigate(`/diamond-detail/${formattedName}`, { state: { id: productId } });
  };

  return (
    <div className="DiamondPrice">
      <HeaderComponent />
      <SubNav items={navItems} />

      {/* Main image */}
      <div key={transitionKey} className="diamond_price_main_image">
        <div className="diamond_price_content">
          <h2>DIAMOND PRICE</h2>
          <p>
            Our comprehensive diamond pricing system will help you stay informed and make well-informed decisions. Explore to discover the true value of diamonds today.
          </p>
        </div>
      </div>

      {/* Diamond Table */}
      <div className="diamond_price_title_container">
        <h2 className="diamond_price_title">Diamond Price List</h2>
        <div className="diamond_price_filter">
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="shape-label">Shape</InputLabel>
            <Select
              labelId="shape-label"
              value={selectedShape}
              onChange={handleShapeFilterChange}
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
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="cut-label">Cut</InputLabel>
            <Select
              labelId="cut-label"
              value={selectedCut}
              onChange={handleCutFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Very Good">Very Good</MenuItem>
              <MenuItem value="Ideal">Ideal</MenuItem>
              <MenuItem value="Super Ideal">Super Ideal</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="color-label">Color</InputLabel>
            <Select
              labelId="color-label"
              value={selectedColor}
              onChange={handleColorFilterChange}
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
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel id="clarity-label">Clarity</InputLabel>
            <Select
              labelId="clarity-label"
              value={selectedClarity}
              onChange={handleClarityFilterChange}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="IF">IF</MenuItem>
              <MenuItem value="VVS1">VVS1</MenuItem>
              <MenuItem value="VVS2">VVS2</MenuItem>
              <MenuItem value="VS1">VS1</MenuItem>
              <MenuItem value="VS2">VS2</MenuItem>
              <MenuItem value="SI1">SI1</MenuItem>
              <MenuItem value="SI2">SI2</MenuItem>
            </Select>
          </FormControl>
          {(selectedShape || selectedCut || selectedColor || selectedClarity) && (
            <Button
              onClick={handleRemoveFilters}
              variant="outlined"
              color="primary"
              startIcon={<i className="fas fa-times"></i>}
              className="filter_group_remove"
            >
              Remove Filters
            </Button>
          )}
        </div>
        <div className="diamond_price_table_wrapper">
          <table className="diamond_price_table">
            <thead>
              <tr>
                <th className="diamond_price_table_header">Shape</th>
                <th className="diamond_price_table_header">Carat</th>
                <th className="diamond_price_table_header">Cut</th>
                <th className="diamond_price_table_header">Color</th>
                <th className="diamond_price_table_header">Clarity</th>
                <th className="diamond_price_table_header">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredDiamonds.map((diamond, index) => (
                <tr key={index}>
                  <td className="diamond_price_table_data">{diamond.shape}</td>
                  <td className="diamond_price_table_data">{diamond.carat}</td>
                  <td className="diamond_price_table_data">{diamond.cut}</td>
                  <td className="diamond_price_table_data">{diamond.color}</td>
                  <td className="diamond_price_table_data">{diamond.clarity}</td>
                  <td className="diamond_price_table_data">${diamond.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shell Price List */}
      <div className="shell_price_title_container">
        <h2 className="shell_price_title">Shell Material Price List</h2>
        <div className="shell_price_table_wrapper">
          <table className="shell_price_table">
            <thead>
              <tr>
                <th className="shell_price_table_header">Name</th>
                <th className="shell_price_table_header">Price</th>
              </tr>
            </thead>
            <tbody>
              {shellMaterials.map((shell, index) => (
                <tr key={index}>
                  <td className="shell_price_table_data">{shell.name}</td>
                  <td className="shell_price_table_data">${shell.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Cards Section */}
      <div className="product_cards_title_container">
        <div className="product_cards_wrapper">
          {filteredProducts.map((product, index) => (
            <div key={index} className="product_card" onClick={() => handleViewClick(product.name, product.productId)}>
              <img src={product.imageLinkList} alt={product.name} />
              <div className="product_view_icon_wrapper" data-tooltip="View detail">
                <i className="far fa-eye product_view_icon"></i>
              </div>
              <p className="product_card_detail">{product.clarity} | {product.carat} | {product.color}</p>
              <h6 className="product_card_name">{product.name}</h6>
              <p className="product_card_price">${product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <br /> <br /> <br />
      {/* Middle content */}
      <div className="diamond_price_middle_content">
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage1} alt="Diamond Image" className="diamond_price_mid_image" />
        </div>
        <p className="diamond_price_mid_content">
          Diamond price list is based on glass (mm), water color (color) and cleanliness. If you want to buy diamond jewelry but don't know the price of natural diamonds today, please quickly search for the price below. Our system can help you track current diamonds price on the market.
          Loose diamonds or natural diamonds with international inspection certificates today range in price from 5 million to hundreds of millions, especially large to super large diamonds cost up to billions of dong. According to some market research experts, they depend mainly on 4C standards, and there are also a number of other standards such as symmetry, luminescence, cleanliness, certificates...
        </p>
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage2} alt="GIA certificate" className="diamond_price_mid_image" />
        </div>
        <p className="diamond_price_mid_content">
          In addition, the price list of artificial or natural diamonds at PNJ, DOJI, Diamond World... stores also varies somewhat depending on the reputation and reputation of the brand. In general, the price list of diamonds on the market is very diverse and can fluctuate depending on the economic market situation at home and abroad. Furthermore, consumer interest and demand for artificially cultured moissanite diamonds has increased. A sharp decrease is also a core factor determining diamond prices.
        </p>
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage3} alt="GIA certificate" className="diamond_price_mid_image3" />
        </div>
        <p className="diamond_price_mid_content last_mid_content">
          Confirmation from the Gemological Institute of America GIA - Dian Jewelry is the place to sell genuine natural GIA diamonds
        </p>
      </div>

      {/* Last content  */}
      <div className="diamond_price_last_content">
        <p className="diamond_price_last_content_description">
          When customers come to the Showroom, the product consultant will quote the most detailed and competitive price for natural diamonds. In case you want to order custom samples, we can design the product shape and quality according to your requirements as soon as possible. Please contact Dian Jewelry immediately via hotline <a href='tel:0795795959'> <strong> 0795 795 959</strong> </a>to receive free advice from a team of experts.
        </p>
      </div>

      <Insta />

      <ScrollToTop />
      <FooterComponent />
    </div>
  );
}

export default DiamondPrice;