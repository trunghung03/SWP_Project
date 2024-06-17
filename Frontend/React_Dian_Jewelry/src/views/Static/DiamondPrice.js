import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Static/DiamondPrice.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';
import diamondPriceMidImage1 from '../../assets/img/holdDiamond.jpeg';
import diamondPriceMidImage2 from '../../assets/img/gia.webp';
import diamondPriceMidImage3 from '../../assets/img/gia2.jpg';
import HeaderComponent from '../../components/Header/HeaderComponent';
import FooterComponent from '../../components/Footer/FooterComponent';


function DiamondPrice() {
  const navItems = [
    { name: 'Home', link: '/home' },
    { name: 'Diamond Price', link: '/diamond-price' }
  ];

  return (
    <div className="DiamondPrice">
      <HeaderComponent/>
      <SubNav items={navItems} />

      {/* Main image  */}
      <div className="diamond_price_main_image">
        <div className="diamond_price_content">
          <h2>DIAMOND PRICE</h2>
          <p>
            Whether you are a buyer, seller, or simply an enthusiast, our comprehensive diamond pricing list will help you stay informed and make well-informed decisions. Explore our collection to discover the true value of diamonds today.
          </p>
        </div>
      </div>

      {/* Title */}
      <div className="diamond_price_title_container">
        <h2 className="diamond_price_title">Internationally Inspected Natural Diamond Price List</h2>
        <h4 className="diamond_price_subtitle"><i className="diamond_price_icon fas fa-gem"></i>ROUND BRILLIANT CUT – 03 EXCELLENT – FLUORESCENCE<i className="diamond_price_icon fas fa-gem"></i></h4>
        <p className="diamond_price_description">
          Diamond price list is based on glass (mm), water color (color) and cleanliness. If you want to buy diamond jewelry like rings, necklaces, earrings... but don't know the price of natural diamonds today, please quickly refer to the latest updated price quote below. Last update 31/05/2024.
        </p>
        <p className="diamond_price_currency">(Currency: USD)</p>
      </div>

      {/* Price table */}
      <div className="diamond_price_table_wrapper">
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>
        <h2 className="diamond_price_table_title">Super Cheap Diamond Price 3.6 mm</h2>
        <table className="diamond_price_table">
          <thead>
            <tr>
              <th>3.6 MM</th>
              <th>IF</th>
              <th>VVS1</th>
              <th>VVS2</th>
              <th>VS1</th>
              <th>VS2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D</td>
              <td>421.20</td>
              <td>382.20</td>
              <td>343.20</td>
              <td>319.80</td>
              <td>273.00</td>
            </tr>
            <tr>
              <td>E</td>
              <td>409.50</td>
              <td>359.40</td>
              <td>312.00</td>
              <td>280.80</td>
              <td>195.00</td>
            </tr>
            <tr>
              <td>F</td>
              <td>382.20</td>
              <td>354.90</td>
              <td>280.80</td>
              <td>234.00</td>
              <td>152.10</td>
            </tr>
            <tr>
              <td>J</td>
              <td>312.00</td>
              <td>304.20</td>
              <td>253.50</td>
              <td>241.80</td>
              <td>206.70</td>
            </tr>
          </tbody>
        </table>


      </div>

      {/* Middle content */}
      <div className="diamond_price_middle_content">
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage1} alt="Diamond Image 1" className="diamond_price_mid_image" />
        </div>
        <p className="diamond_price_mid_content">
          Loose diamonds or natural diamonds with international inspection certificates today range in price from 5 million to hundreds of millions, especially large to super large diamonds cost up to billions of dong. According to some market research experts, they depend mainly on 4C standards, and there are also a number of other standards such as symmetry, luminescence, cleanliness, certificates...
        </p>
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage2} alt="Diamond Image 2" className="diamond_price_mid_image" />
        </div>
        <p className="diamond_price_mid_content">
          In addition, the price list of artificial or natural diamonds at PNJ, DOJI, Diamond World... stores also varies somewhat depending on the reputation and reputation of the brand. In general, the price list of diamonds on the market is very diverse and can fluctuate depending on the economic market situation at home and abroad. Furthermore, consumer interest and demand for artificially cultured moissanite diamonds has increased. A sharp decrease is also a core factor determining diamond prices.
        </p>
        <div className="diamond_price_image_wrapper">
          <img src={diamondPriceMidImage3} alt="Diamond Image 2" className="diamond_price_mid_image3" />
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

      <ScrollToTop />
      <FooterComponent/>
    </div>
  );
}

export default DiamondPrice;
