import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SubNav.scss';

const SubNav = ({ items }) => {
    const navigate = useNavigate();

    const handleNavigation = (link) => {
        navigate(link);
    };

    return (
        <div className="sub-nav-container">
            <div className="sub_nav">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <span className="nav-item" onClick={() => handleNavigation(item.link)} style={{ cursor: 'pointer' }}>
                            {item.name}
                        </span>
                        {index < items.length - 1 && <span style={{ color: '#838a96' }}>  |  </span>}
                    </React.Fragment>
                ))}
            </div>
            <hr className="sub_nav_hr" />
        </div>
    );
}

export default SubNav;
