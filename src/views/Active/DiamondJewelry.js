import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SubNav from '../../components/SubNav/SubNav.js';
import '../../styles/Active/DiamondJewelry.scss';

function DiamondJewelry() {
    const navItems = ['Home', 'Diamond Jewelry'];

    return (
        <div className="DiamondJewelry">
            <SubNav items={navItems} />
            {/* Các nội dung khác của trang Diamond Jewelry */}
            <br></br><br></br><br></br><br></br><br></br>
        </div>
    );
}

export default DiamondJewelry;
