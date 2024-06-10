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
import AdminEmployeeList from './Admin/AdminEmployeeList';
import AdminAddEmployee from './Admin/AdminAddEmployee';
import ManagerStatistic from './Manager/ManagerStatistic';
import ManagerDiamondList from './Manager/ManagerManageDiamond/ManagerDiamondList';
import ManagerAddDiamond from './Manager/ManagerManageDiamond/ManagerAddDiamond';
import DSDeliveryList from './DeliveryStaff/DSDeliveryList';
import DSDeliveryDetail from './DeliveryStaff/DSDeliveryDetail';
import SSOrderList from './SalesStaff/SalesStaffManageOrder/SSOrderList';
import SSContentList from './SalesStaff/SalesStaffManageContent/SSContentList';
import SSWarrantyList from './SalesStaff/SalesStaffManageWarranty/SSWarrantyList';
import SSAddContent from './SalesStaff/SalesStaffManageContent/SSAddContent';
import ManagerProductList from './Manager/ManagerManageProduct/ManagerProductList';
import ManagerEmployeeList from './Manager/MangerManageEmployee/ManagerListEmployee';
import ManagerShellList from './Manager/ManagerManageShell/ManagerShellList';
import ManagerPromotionalList from './Manager/ManagerManagePromotional/ManagerPromotionalList';
import ManagerAddShell from './Manager/ManagerManageShell/ManagerAddShell';
import ManagerAddEmployee from './Manager/MangerManageEmployee/ManagerAddEmployee';
import ManagerAddProduct from './Manager/ManagerManageProduct/ManagerAddProduct';
import ManagerAddPromotional from './Manager/ManagerManagePromotional/ManagerAddPromotional';

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
            <Route path="/product-detail" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/FAQs" element={<Layout><FAQs /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/diamond-jewelry" element={<Layout><DiamondJewelry /></Layout>} />
            <Route path="/collection" element={<Layout><Collection /></Layout>} />
            <Route path="/shape" element={<Layout><Shape /></Layout>} />
            <Route path="/price-list" element={<Layout><PriceList /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            
            {/* Customer */}
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="/invoice" element={<Layout><Invoice /></Layout>} />
            <Route path="/introduce" element={<Layout><Introduce /></Layout>} />
            <Route path="/edit-profile" element={<Layout><EditProfile /></Layout>} />
            <Route path="/order-history" element={<Layout><OrderHistory /></Layout>} />
            <Route path="/order-detail" element={<Layout><OrderDetail /></Layout>} />

            {/* Admin */}
            <Route path="/admin-customer-list" element={<AdminCustomerList />} />
            <Route path="/admin-employee-list" element={<AdminEmployeeList />} />
            <Route path="/admin-add-employee" element={<AdminAddEmployee />} />

            {/* Manager */}
            <Route path="/manager-statistic" element={<ManagerStatistic />} />
            <Route path="/manager-diamond-list" element={<ManagerDiamondList />} />
            <Route path="/manager-add-diamond" element={<ManagerAddDiamond />} />
            <Route path="/manager-product-list" element={<ManagerProductList />} />
            <Route path="/manager-add-product" element={<ManagerAddProduct/>} />
            <Route path="/manager-shell-list" element={<ManagerShellList />} />
            <Route path="/manager-add-shell" element={<ManagerAddShell />} />
            <Route path="/manager-employee-list" element={<ManagerEmployeeList />} />
            <Route path="/manager-add-employee" element={<ManagerAddEmployee />} />
            <Route path="/manager-promotional-list" element={<ManagerPromotionalList />} />
            <Route path="/manager-add-promotional" element={<ManagerAddPromotional />} />

            {/* Sales Staff */}
            <Route path="/sales-staff-order-list" element={<SSOrderList />} />
            <Route path="/sales-staff-content-list" element={<SSContentList />} />
            <Route path="/sales-staff-add-content" element={<SSAddContent />} />
            <Route path="/sales-staff-warranty-list" element={<SSWarrantyList/>}/>

            {/* Delivery Staff */}
            <Route path="/delivery-staff-delivery-list" element={<DSDeliveryList />} />
            <Route path="/delivery-staff-delivery-detail" element={<DSDeliveryDetail />} />
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
