import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
// import '../../styles/Static/DiamondPrice.scss';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop.js';


function DiamondPrice() {
  const navItems = ['Home', 'Diamond Price'];

  return (
    <div className="DiamondPrice">
      <SubNav items={navItems} />

      <p>hello price</p>

      <ScrollToTop />
    </div>
  );
}

export default DiamondPrice;