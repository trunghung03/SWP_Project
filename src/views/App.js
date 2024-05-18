import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeaderComponent from '../components/Header/HeaderComponent.js';
import FooterComponent from '../components/Footer/FooterComponent.js'
import Home from './Active/Home.js';
import PriceList from './Static/PriceList.js';
import Contact from './Static/Contact.js';
import Introduce from './Static/Introduce.js';
import FAQs from './Static/FAQs.js';
import Login from './Authentication/Login.js';
import Register from './Authentication/Register.js';
import ForgotPassword from './Authentication/ForgotPassword.js';
import ResetPassword from './Authentication/ResetPassword.js';
import DiamondJewelry from './Active/DiamondJewelry.js';
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
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} /> {/* Default route */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/FAQs" element={<Layout><FAQs /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/diamondJewelry" element={<Layout><DiamondJewelry /></Layout>} />
        <Route path="/priceList" element={<Layout><PriceList /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/introduce" element={<Layout><Introduce /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
