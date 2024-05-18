import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SubNav.scss';

const SubNav = ({ items }) => {
    return (
        <div className="sub-nav-container">
            <div className="sub-nav">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <span className="nav-item">{item}</span>
                        {index < items.length - 1 && <span className="separator">|</span>}
                    </React.Fragment>
                ))}
            </div>
            <div className="nav-divider"></div>
        </div>
    );
}

export default SubNav;
