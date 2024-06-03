import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import { CartProvider } from './../services/CartService';
import { UserProvider } from './../services/UserContext';
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
import Search from './ProductList/Search';
import Collection from './ProductList/Collection';
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
import ManagerDiamondList from './Manager/ManagerManageDiamond/ManagerDiamondList';
import ManagerAddDiamond from './Manager/ManagerManageDiamond/ManagerAddDiamond';
import DSDeliveryList from './DeliveryStaff/DSDeliveryList';
import SSOrderList from './SalesStaff/SalesStaffManageOrder/SSOrderList';
import SSContentList from './SalesStaff/SalesStaffManageContent/SSContentList';
import SSAddContent from './SalesStaff/SalesStaffManageContent/SSAddContent';
import ManagerProductList from './Manager/ManagerManageProduct/ManagerProductList';

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
        <UserProvider>
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
            <Route path="/collection" element={<Layout><Collection /></Layout>} />
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
            <Route path="/managerDiamondList" element={<ManagerDiamondList />} />
            <Route path="/managerAddDiamond" element={<ManagerAddDiamond />} />
            <Route path="/managerProductList" element={<ManagerProductList />} />
            {/* Sales Staff  */}
            <Route path="/salesStaffOrderList" element={<SSOrderList />} />
            <Route path="/salesStaffContentList" element={<SSContentList />} />
            <Route path="/salesStaffAddContent" element={<SSAddContent />} />

            {/* Delivery Staff  */}
            <Route path="/deliveryStaffDeliveryList" element={<DSDeliveryList />} />
          </Routes>
        </UserProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
