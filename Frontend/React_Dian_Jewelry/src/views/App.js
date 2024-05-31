import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import { CartProvider } from './../services/CartService';
import HeaderComponent from '../components/Header/HeaderComponent';
import FooterComponent from '../components/Footer/FooterComponent';
import AutoScrollToTop from '../components/AutoScrollToTop/AutoScrollToTop';
import Home from './Active/Home';
import Education from './Active/Education';
import PriceList from './Static/DiamondPrice';
import Contact from './Static/Contact';
import Introduce from './Static/Introduce';
import FAQs from './Static/FAQs';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import ForgotPassword from './Authentication/ForgotPassword';
import ResetPassword from './Authentication/ResetPassword';
import DiamondJewelry from './ProductList/DiamondJewelry';
import WeddingJewelry from './ProductList/WeddingJewelry';
import Ring from './ProductList/Ring';
import Earings from './ProductList/Earings';
import Bracelet from './ProductList/Bracelet';
import Necklace from './ProductList/Necklace.js';
import WeddingRing from './ProductList/WeddingRing';
import WeddingEarings from './ProductList/WeddingEarings';
import WeddingBracelet from './ProductList/WeddingBracelet';
import WeddingNecklace from './ProductList/WeddingNecklace.js';
import EngagementRing from './ProductList/EngagementRing';
import Search from './ProductList/Search';
import ProductDetail from './Cart/ProductDetail';
import Cart from './Cart/Cart';
import Checkout from './Cart/Checkout';
import Invoice from './Cart/Invoice';
import EditProfile from './Setting/EditProfile';
import OrderHistory from './Setting/OrderHistory';
import OrderDetail from './Setting/OrderDetail';
import AdminCustomerList from './Admin/AdminCustomerList';
import AdminTest from './Admin/AdminTest';
import ManagerStatitic from './Manager/ManagerStatitic';
import ManagerManageDiamond from './Manager/ManagerManageDiamond';
import ManagerAddDiamond from './Manager/ManagerAddDiamond';
import ManagerUpdateDiamond from './Manager/ManagerUpdateDiamond';
import SalesStaffOrderList from './SalesStaff/SalesStaffOrderList';
import DeliStaffDeliveryList from './DeliveryStaff/DeliStaffDeliveryList';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgotPassword' || location.pathname === '/resetPassword';

  return (
    <div className="App">
      {!isAuthPage && <HeaderComponent />}
      {children}
      {!isAuthPage && <FooterComponent />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <AutoScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} /> {/* Default route */}
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/education" element={<Layout><Education /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/productDetail" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/invoice" element={<Layout><Invoice /></Layout>} />
          <Route path="/FAQs" element={<Layout><FAQs /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/diamondJewelry" element={<Layout><DiamondJewelry /></Layout>} />
          <Route path="/weddingJewelry" element={<Layout><WeddingJewelry /></Layout>} />
          <Route path="/ring" element={<Layout><Ring /></Layout>} />
          <Route path="/earings" element={<Layout><Earings /></Layout>} />
          <Route path="/bracelet" element={<Layout><Bracelet /></Layout>} />
          <Route path="/necklace" element={<Layout><Necklace /></Layout>} />
          <Route path="/weddingRing" element={<Layout><WeddingRing /></Layout>} />
          <Route path="/weddingEarings" element={<Layout><WeddingEarings /></Layout>} />
          <Route path="/weddingBracelet" element={<Layout><WeddingBracelet /></Layout>} />
          <Route path="/weddingNecklace" element={<Layout><WeddingNecklace /></Layout>} />
          <Route path="/engagementRing" element={<Layout><EngagementRing /></Layout>} />
          <Route path="/priceList" element={<Layout><PriceList /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/introduce" element={<Layout><Introduce /></Layout>} />
          <Route path="/editProfile" element={<Layout><EditProfile /></Layout>} />
          <Route path="/orderHistory" element={<Layout><OrderHistory /></Layout>} />
          <Route path="/orderDetail" element={<Layout><OrderDetail /></Layout>} />

          {/* Admin  */}
          <Route path="/adminCustomerList" element={<AdminCustomerList />} />
          <Route path="/adminTest" element={<AdminTest />} />

          {/* Manager  */}
          <Route path="/managerStatitic" element={<ManagerStatitic />} />
          <Route path="/managerManageDiamond" element={<ManagerManageDiamond />} />
          <Route path="/managerUpdateDiamond" element={<ManagerUpdateDiamond />} />
          <Route path="/managerAddDiamond" element={<ManagerAddDiamond />} />

          {/* Sales Staff  */}
          <Route path="/salesStaffOrderList" element={<SalesStaffOrderList />} />

          {/* Delivery Staff  */}
          <Route path="/deliStaffDeliveryList" element={<DeliStaffDeliveryList />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
