import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeaderComponent from '../components/Header/HeaderComponent.js';
import FooterComponent from '../components/Footer/FooterComponent.js'
import AutoScrollToTop from '../components/AutoScrollToTop/AutoScrollToTop';
import Home from './Active/Home.js';
import Education from './Active/Education.js';
import PriceList from './Static/DiamondPrice.js';
import Contact from './Static/Contact.js';
import Introduce from './Static/Introduce.js';
import FAQs from './Static/FAQs.js';
import Login from './Authentication/Login.js';
import Register from './Authentication/Register.js';
import ForgotPassword from './Authentication/ForgotPassword.js';
import ResetPassword from './Authentication/ResetPassword.js';
import DiamondJewelry from './ProductList/DiamondJewelry.js';
import WeddingJewelry from './ProductList/WeddingJewelry.js';
import Ring from './ProductList/Ring.js';
import Earings from './ProductList/Earings.js';
import Bracelet from './ProductList/Bracelet.js';
import WeddingRing from './ProductList/WeddingRing.js';
import WeddingEarings from './ProductList/WeddingEarings.js';
import WeddingBracelet from './ProductList/WeddingBracelet.js';
import EngagementRing from './ProductList/EngagementRing.js';
import Search from './ProductList/Search.js';
import ProductDetail from './Cart/ProductDetail.js';
import Cart from './Cart/Cart.js';
import Checkout from './Cart/Checkout.js';
import Invoice from './Cart/Invoice.js';
import EditProfile from './Setting/EditProfile.js'
import OrderHistory from './Setting/OrderHistory.js'
import OrderDetail from './Setting/OrderDetail.js'
import AdminCustomerList from './Admin/AdminCustomerList.js'; 
import AdminTest from './Admin/AdminTest.js'; 
import ManagerStatitic from './Manager/ManagerStatitic.js';  
import SalesStaffOrderList from './SalesStaff/SalesStaffOrderList.js';  
import DeliStaffDeliveryList from './DeliveryStaff/DeliStaffDeliveryList.js';  
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

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
        <Route path="/weddingRing" element={<Layout><WeddingRing /></Layout>} />
        <Route path="/weddingEarings" element={<Layout><WeddingEarings /></Layout>} />
        <Route path="/weddingBracelet" element={<Layout><WeddingBracelet /></Layout>} />
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

        {/* Sales Staff  */}
        <Route path="/salesStaffOrderList" element={<SalesStaffOrderList />} />

        {/* Delivery Staff  */}
        <Route path="/deliStaffDeliveryList" element={<DeliStaffDeliveryList />} />
      </Routes>
    </Router>
  );
}

export default App;
