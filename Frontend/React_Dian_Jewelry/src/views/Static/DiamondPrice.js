import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Static/DiamondPrice.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import diamondPriceMidImage1 from '../../assets/img/holdDiamond.jpeg';
import diamondPriceMidImage2 from '../../assets/img/gia.webp';
import diamondPriceMidImage3 from '../../assets/img/gia2.jpg';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';
import Insta from '../../components/BlogInspired/BlogInspired.js';
import { Select, MenuItem, InputLabel, FormControl, Button, TextField, CircularProgress } from '@mui/material';
import { getDiamondPrice } from '../../services/PricingService';

function DiamondPrice() {
  const [transitionKey, setTransitionKey] = useState(Date.now());
  const [cut, setCut] = useState('');
  const [color, setColor] = useState('');
  const [carat, setCarat] = useState('');
  const [clarity, setClarity] = useState('');
  const [price, setPrice] = useState('');
  const [showPrice, setShowPrice] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector('.diamond_price_main_image').classList.add('visible');
    }, 10);
    return () => clearTimeout(timeout);
  }, [transitionKey]);

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

  return (
    <div className="DiamondPrice">
      <HeaderComponent />
      <SubNav items={navItems} />

      {/* Main image */}
      <div key={transitionKey} className="diamond_price_main_image">
        <div className="diamond_price_content">
          <h2>DIAMOND PRICE</h2>
          <p>
            Whether you are a buyer, seller, or simply an enthusiast, our comprehensive diamond pricing calculator system will help you stay informed and make well-informed decisions. Explore our collection to discover the true value of diamonds today.
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="diamond_price_title_container">
        <h2 className="diamond_price_title">Diamond Price Calculator</h2>
      </div>

      {/* Price form */}
      <div className="diamond_price_form_wrapper">
        <form className="diamond_price_form">
          <div className="form_row">
            <FormControl fullWidth margin="normal">
              <InputLabel id="cut-label">Cut</InputLabel>
              <Select
                labelId="cut-label"
                value={cut}
                onChange={(e) => setCut(e.target.value)}
              >
                <MenuItem value="Premium">Premium</MenuItem>
                <MenuItem value="Very Good">Very Good</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Fair">Fair</MenuItem>
                <MenuItem value="Ideal">Ideal</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="clarity-label">Clarity</InputLabel>
              <Select
                labelId="clarity-label"
                value={clarity}
                onChange={(e) => setClarity(e.target.value)}
              >
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
          </div>
          <div className="form_row">
            <FormControl fullWidth margin="normal">
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                value={color}
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
            <TextField
              fullWidth
              margin="normal"
              label="Carat"
              type="number"
              value={carat}
              onChange={(e) => setCarat(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            onClick={calculatePrice}
            className="calculate_btn"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Calculate'}
          </Button>
        </form>
        {showPrice && (
          <div className="diamond_price_result">
            <p>{price !== 'Diamond not found' && price !== 'Please fill in all fields for the most accurate price' ? `Price: ${price}` : price}</p>
          </div>
        )}
      </div>

      {/* Middle content */}
      <div className="diamond_price_middle_content">
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage1} alt="Diamond Image 1" className="diamond_price_mid_image" />
        </div>
        <p className="diamond_price_mid_content">
          Diamond price list is based on glass (mm), water color (color) and cleanliness. If you want to buy diamond jewelry but don't know the price of natural diamonds today, please quickly search for the price below. Our system can help you track current diamonds price on the market.
          Loose diamonds or natural diamonds with international inspection certificates today range in price from 5 million to hundreds of millions, especially large to super large diamonds cost up to billions of dong. According to some market research experts, they depend mainly on 4C standards, and there are also a number of other standards such as symmetry, luminescence, cleanliness, certificates...
        </p>
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage2} alt="Diamond Image 2" className="diamond_price_mid_image" />
        </div>
        <p className="diamond_price_mid_content">
          In addition, the price list of artificial or natural diamonds at PNJ, DOJI, Diamond World... stores also varies somewhat depending on the reputation and reputation of the brand. In general, the price list of diamonds on the market is very diverse and can fluctuate depending on the economic market situation at home and abroad. Furthermore, consumer interest and demand for artificially cultured moissanite diamonds has increased. A sharp decrease is also a core factor determining diamond prices.
        </p>
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage3} alt="Diamond Image 3" className="diamond_price_mid_image3" />
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
