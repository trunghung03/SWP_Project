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
import Shape from './ProductList/Shape';
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
import DSEditProfile from './DeliveryStaff/DeliveryStaffEditProfile';
import SSOrderList from './SalesStaff/SalesStaffManageOrder/SSOrderList';
import SSContentList from './SalesStaff/SalesStaffManageContent/SSContentList';
import SSWarrantyList from './SalesStaff/SalesStaffManageWarranty/SSWarrantyList';
import SSAddContent from './SalesStaff/SalesStaffManageContent/SSAddContent';
import SSEditProfile from './SalesStaff/SalesStaffSetting/SSEditProfile';
import ManagerProductList from './Manager/ManagerManageProduct/ManagerProductList';
import ManagerEmployeeList from './Manager/MangerManageEmployee/ManagerListEmployee';
import ManagerShellList from './Manager/ManagerManageShell/ManagerShellList';
import ManagerAddShell from './Manager/ManagerManageShell/ManagerAddShell';
import ManagerAddEmployee from './Manager/MangerManageEmployee/ManagerAddEmployee';
import ManagerAddProduct from './Manager/ManagerManageProduct/ManagerAddProduct';
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
      <UserProvider>
        <CartProvider>
          <AutoScrollToTop />
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} /> {/* Default route */}
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/education" element={<Layout><Education /></Layout>} />
            <Route path="/search" element={<Layout><Search /></Layout>} />
            <Route path="/productDetail" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/FAQs" element={<Layout><FAQs /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/diamondJewelry" element={<Layout><DiamondJewelry /></Layout>} />
            <Route path="/collection" element={<Layout><Collection /></Layout>} />
            <Route path="/shape" element={<Layout><Shape /></Layout>} />
            <Route path="/priceList" element={<Layout><PriceList /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            
            {/* Customer */}
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="/invoice" element={<Layout><Invoice /></Layout>} />
            <Route path="/introduce" element={<Layout><Introduce /></Layout>} />
            <Route path="/editProfile" element={<Layout><EditProfile /></Layout>} />
            <Route path="/orderHistory" element={<Layout><OrderHistory /></Layout>} />
            <Route path="/orderDetail" element={<Layout><OrderDetail /></Layout>} />

            {/* Admin */}
            <Route path="/adminCustomerList" element={<AdminCustomerList />} />
            <Route path="/adminTest" element={<AdminTest />} />

            {/* Manager */}
            <Route path="/managerStatitic" element={<ManagerStatitic />} />
            <Route path="/managerDiamondList" element={<ManagerDiamondList />} />
            <Route path="/managerAddDiamond" element={<ManagerAddDiamond />} />
            <Route path="/managerProductList" element={<ManagerProductList />} />
            <Route path="/managerEmployeeList" element={<ManagerEmployeeList />} />
            <Route path="/managerShellList" element={<ManagerShellList />} />
            <Route path="/managerAddEmployee" element={<ManagerAddEmployee />} />
            <Route path="/managerAddShell" element={<ManagerAddShell />} />
            <Route path="/managerAddProduct" element={<ManagerAddProduct/>} />
            {/* Sales Staff */}
            <Route path="/salesStaffOrderList" element={<SSOrderList />} />
            <Route path="/salesStaffContentList" element={<SSContentList />} />
            <Route path="/salesStaffAddContent" element={<SSAddContent />} />

            {/* Delivery Staff */}
            <Route path="/deliveryStaffDeliveryList" element={<DSDeliveryList />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
