import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.scss';
import { CartProvider } from './../services/CartService';
import { UserProvider } from './../services/UserContext';
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
import VNPayResultHandler from '../services/VNPAYService';
import AdminCustomerList from './Admin/AdminCustomerList';
import AdminEmployeeList from './Admin/AdminEmployeeList';
import AdminAddEmployee from './Admin/AdminAddEmployee';
import ManagerStatistic from './Manager/ManagerStatistic';
import ManagerDiamondList from './Manager/ManagerManageDiamond/ManagerDiamondList';
import ManagerAddDiamond from './Manager/ManagerManageDiamond/ManagerAddDiamond';
import ManagerCollectionList from './Manager/ManagerManageCollection/ManagerCollectionList';
import ManagerAddCollection from './Manager/ManagerManageCollection/ManagerAddCollection';
import DSDeliveryList from './DeliveryStaff/DSDeliveryList';
import DSDeliveryDetail from './DeliveryStaff/DSDeliveryDetail';
import SSOrderList from './SalesStaff/SalesStaffManageOrder/SSOrderList';
import SSContentList from './SalesStaff/SalesStaffManageContent/SSContentList';
import SSWarrantyList from './SalesStaff/SalesStaffManageWarranty/SSWarrantyList';
import SSAddContent from './SalesStaff/SalesStaffManageContent/SSAddContent';
import SSUpdateContent from './SalesStaff/SalesStaffManageContent/SSUpdateContent';
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
import TransactionFail from './Cart/TransactionFail';
import Chatbot from 'react-chatbot-kit';
import config from '../components/ChatBot/config.js';
import MessageParser from '../components/ChatBot/MessageParser.js';
import ActionProvider from '../components/ChatBot/ActionProvider.js';
import DirectSalesStaffBtn from '../components/ChatBot/DirectSalesStaffBtn.js';
import 'react-chatbot-kit/build/main.css';
import UpdateTitle from '../services/TitleService';

function AppContent() {
  const [isClosed, setIsClosed] = useState(true);  // Set the initial state to true
  const location = useLocation();
  const isLoginPath = location.pathname === '/login';

  const toggleMinimize = () => {
    setIsClosed(true);
  };

  const openChatbot = () => {
    setIsClosed(false);
  };

  return (
    <UserProvider>
      <CartProvider>
        <AutoScrollToTop />
        <UpdateTitle />
        <Routes>
          <Route path="/" element={<ProtectedRoute path="/" element={Home} />} /> {/* Default route */}
          <Route path="/home" element={<ProtectedRoute path="/home" element={Home} />} />
          <Route path="/blog" element={<ProtectedRoute path="/blog" element={Blog} />} />
          <Route path="/blog-detail/:title" element={<ProtectedRoute path="/blog-detail/:title" element={BlogDetail} />} />
          <Route path="/search" element={<ProtectedRoute path="/search" element={Search} />} />
          <Route path="/product-detail/:name" element={<ProtectedRoute path="/product-detail/:name" element={ProductDetail} />} />
          <Route path="/cart" element={<ProtectedRoute path="/cart" element={Cart} />} />
          <Route path="/FAQs" element={<ProtectedRoute path="/FAQs" element={FAQs} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<ProtectedRoute path="/register" element={Register} />} />
          <Route path="/forgot-password" element={<ProtectedRoute path="/forgot-password" element={ForgotPassword} />} />
          <Route path="/reset-password" element={<ProtectedRoute path="/reset-password" element={ResetPassword} />} />
          <Route path="/diamond-jewelry" element={<ProtectedRoute path="/diamond-jewelry" element={DiamondJewelry} />} />
          <Route path="/collection/:name" element={<ProtectedRoute path="/collection/:name" element={Collection} />} />
          <Route path="/shape" element={<ProtectedRoute path="/shape" element={Shape} />} />
          <Route path="/diamond-price" element={<ProtectedRoute path="/diamond-price" element={PriceList} />} />
          <Route path="/contact" element={<ProtectedRoute path="/contact" element={Contact} />} />
          <Route path="/introduce" element={<ProtectedRoute path="/introduce" element={Introduce} />} />

          {/* Customer */}
          <Route path="/checkout" element={<ProtectedRoute path="/checkout" element={Checkout} />} />
          <Route path="/invoice" element={<ProtectedRoute path="/invoice" element={Invoice} />} />
          <Route path="/edit-profile" element={<ProtectedRoute path="/edit-profile" element={EditProfile} />} />
          <Route path="/order-history" element={<ProtectedRoute path="/order-history" element={OrderHistory} />} />
          <Route path="/order-detail/:orderNumber" element={<ProtectedRoute path="/order-detail/:orderNumber" element={OrderDetail} />} />
          <Route path="/transaction-fail" element={<ProtectedRoute path="/transaction-fail" element={TransactionFail} />} />
          <Route path="/vnpay-result" element={<ProtectedRoute path="/vnpay-result" element={VNPayResultHandler} />} />

          {/* Admin */}
          <Route path="/admin-customer-list" element={<ProtectedRoute path="/admin-customer-list" element={AdminCustomerList} />} />
          <Route path="/admin-employee-list" element={<ProtectedRoute path="/admin-employee-list" element={AdminEmployeeList} />} />
          <Route path="/admin-add-employee" element={<ProtectedRoute path="/admin-add-employee" element={AdminAddEmployee} />} />

          {/* Manager */}
          <Route path="/manager-statistic" element={<ProtectedRoute path="/manager-statistic" element={ManagerStatistic} />} />
          <Route path="/manager-diamond-list" element={<ProtectedRoute path="/manager-diamond-list" element={ManagerDiamondList} />} />
          <Route path="/manager-add-diamond" element={<ProtectedRoute path="/manager-add-diamond" element={ManagerAddDiamond} />} />
          <Route path="/manager-product-list" element={<ProtectedRoute path="/manager-product-list" element={ManagerProductList} />} />
          <Route path="/manager-add-product" element={<ProtectedRoute path="/manager-add-product" element={ManagerAddProduct} />} />
          <Route path="/manager-shell-list" element={<ProtectedRoute path="/manager-shell-list" element={ManagerShellList} />} />
          <Route path="/manager-add-shell" element={<ProtectedRoute path="/manager-add-shell" element={ManagerAddShell} />} />
          <Route path="/manager-employee-list" element={<ProtectedRoute path="/manager-employee-list" element={ManagerEmployeeList} />} />
          <Route path="/manager-add-employee" element={<ProtectedRoute path="/manager-add-employee" element={ManagerAddEmployee} />} />
          <Route path="/manager-promotional-list" element={<ProtectedRoute path="/manager-promotional-list" element={ManagerPromotionList} />} />
          <Route path="/manager-add-promotion" element={<ProtectedRoute path="/manager-add-promotion" element={ManagerAddPromotion} />} />
          <Route path="/manager-collection-list" element={<ProtectedRoute path="/manager-collection-list" element={ManagerCollectionList} />} />
          <Route path="/manager-add-collection" element={<ProtectedRoute path="/manager-add-collection" element={ManagerAddCollection} />} />

          {/* Sales Staff */}
          <Route path="/sales-staff-order-list" element={<SSOrderList />} />
          <Route path="/sales-staff-manage-order-detail/:orderId" element={<SSOrderDetail />} />
          <Route path="/sales-staff-content-list" element={<SSContentList />} />
          <Route path="/sales-staff-add-content" element={<SSAddContent />} />
          <Route path="/sales-staff-update-content/:id" element={<SSUpdateContent />} />
          <Route path="/sales-staff-warranty-list" element={<SSWarrantyList />} />
          <Route path="/rich-text-page" element={<RichTextPage />} />

          {/* Delivery Staff */}
          <Route path="/delivery-staff-delivery-list" element={<ProtectedRoute path="/delivery-staff-delivery-list" element={DSDeliveryList} />} />
          <Route path="/delivery-staff-delivery-detail/:orderId" element={<ProtectedRoute path="/delivery-staff-delivery-detail" element={DSDeliveryDetail} />} />

          {/* <Route path="/notification" element={<Notification/>} /> */}
        </Routes>
        {!isClosed && !isLoginPath && (
          <div className="chatbot-container">
            <div className="control-buttons">
              <button className="control-button" onClick={toggleMinimize}>
                —
              </button>
            </div>
            <div className="chatbot-body">
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
              <DirectSalesStaffBtn />
            </div>
          </div>
        )}
        {isClosed && !isLoginPath && (
          <button className="control-button" onClick={openChatbot} style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
            <div className="supporter-text">Supporter</div>
          </button>
        )}
      </CartProvider>
    </UserProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
