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
import Blog from './Active/Blog';
import BlogDetail from './Active/BlogDetail';
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
import SSOrderDetail from './SalesStaff/SalesStaffManageOrder/SSOrderDetail';
import ManagerProductList from './Manager/ManagerManageProduct/ManagerProductList';
import ManagerEmployeeList from './Manager/MangerManageEmployee/ManagerListEmployee';
import ManagerShellList from './Manager/ManagerManageShell/ManagerShellList';
import ManagerPromotionList from './Manager/ManagerManagePromotional/ManagerPromotionList';
import ManagerAddShell from './Manager/ManagerManageShell/ManagerAddShell';
import ManagerAddEmployee from './Manager/MangerManageEmployee/ManagerAddEmployee';
import ManagerAddProduct from './Manager/ManagerManageProduct/ManagerAddProduct';
import ManagerAddPromotion from './Manager/ManagerManagePromotional/ManagerAddPromotion';
import RichTextPage from './SalesStaff/SalesStaffManageContent/SSRichTextPage';
import ProtectedRoute from '../services/ProtectedRoute';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';

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
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog-detail" element={<Layout><BlogDetail /></Layout>} />
            <Route path="/search" element={<Layout><Search /></Layout>} />
            <Route path="/product-detail" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/FAQs" element={<Layout><FAQs /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />
            <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
            <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
            <Route path="/diamond-jewelry" element={<Layout><DiamondJewelry /></Layout>} />
            <Route path="/collection" element={<Layout><Collection /></Layout>} />
            <Route path="/shape" element={<Layout><Shape /></Layout>} />
            <Route path="/price-list" element={<Layout><PriceList /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/introduce" element={<Layout><Introduce /></Layout>} />
            
            {/* Customer */}
            <Route path="/checkout" element={<ProtectedRoute requiredRole="Customer" path="/checkout" element={Checkout} />} />
            <Route path="/invoice" element={<ProtectedRoute requiredRole="Customer" path="/invoice" element={Invoice} />} />
            <Route path="/edit-profile" element={<ProtectedRoute requiredRole="Customer" path="/edit-profile" element={EditProfile} />} />
            <Route path="/order-history" element={<ProtectedRoute requiredRole="Customer" path="/order-history" element={OrderHistory} />} />
            <Route path="/order-detail" element={<ProtectedRoute requiredRole="Customer" path="/order-detail" element={OrderDetail} />} />

            {/* Admin */}
            <Route path="/admin-customer-list" element={<ProtectedRoute requiredRole="Admin" path="/admin-customer-list" element={AdminCustomerList} />} />
            <Route path="/admin-employee-list" element={<ProtectedRoute requiredRole="Admin" path="/admin-employee-list" element={AdminEmployeeList} />} />
            <Route path="/admin-add-employee" element={<ProtectedRoute requiredRole="Admin" path="/admin-add-employee" element={AdminAddEmployee} />} />

            {/* Manager */}
            <Route path="/manager-statistic" element={<ProtectedRoute requiredRole="Manager" path="/manager-statistic" element={ManagerStatistic} />} />
            <Route path="/manager-diamond-list" element={<ProtectedRoute requiredRole="Manager" path="/manager-diamond-list" element={ManagerDiamondList} />} />
            <Route path="/manager-add-diamond" element={<ProtectedRoute requiredRole="Manager" path="/manager-add-diamond" element={ManagerAddDiamond} />} />
            <Route path="/manager-product-list" element={<ProtectedRoute requiredRole="Manager" path="/manager-product-list" element={ManagerProductList} />} />
            <Route path="/manager-add-product" element={<ProtectedRoute requiredRole="Manager" path="/manager-add-product" element={ManagerAddProduct} />} />
            <Route path="/manager-shell-list" element={<ProtectedRoute requiredRole="Manager" path="/manager-shell-list" element={ManagerShellList} />} />
            <Route path="/manager-add-shell" element={<ProtectedRoute requiredRole="Manager" path="/manager-add-shell" element={ManagerAddShell} />} />
            <Route path="/manager-employee-list" element={<ProtectedRoute requiredRole="Manager" path="/manager-employee-list" element={ManagerEmployeeList} />} />
            <Route path="/manager-add-employee" element={<ProtectedRoute requiredRole="Manager" path="/manager-add-employee" element={ManagerAddEmployee} />} />
            <Route path="/manager-promotional-list" element={<ProtectedRoute requiredRole="Manager" path="/manager-promotional-list" element={ManagerPromotionList} />} />
            <Route path="/manager-add-promotion" element={<ProtectedRoute requiredRole="Manager" path="/manager-add-promotion" element={ManagerAddPromotion} />} />

            {/* Sales Staff */}
            <Route path="/sales-staff-order-list" element={<SSOrderList />} />
            <Route path="/sales-staff-manage-order-detail" element={<SSOrderDetail/>} />
            <Route path="/sales-staff-content-list" element={<SSContentList />} />
            <Route path="/sales-staff-add-content" element={<SSAddContent />} />
            <Route path="/sales-staff-warranty-list" element={<SSWarrantyList/>}/>
            <Route path="/rich-text-page" element={<RichTextPage/>} />
            {/* Delivery Staff */}
            <Route path="/delivery-staff-delivery-list" element={<ProtectedRoute requiredRole="DeliveryStaff" path="/delivery-staff-delivery-list" element={DSDeliveryList} />} />
            <Route path="/delivery-staff-delivery-detail" element={<ProtectedRoute requiredRole="DeliveryStaff" path="/delivery-staff-delivery-detail" element={DSDeliveryDetail} />} />
            
          </Routes>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
