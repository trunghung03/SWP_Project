function Sidebar(){
    return(
        <>
        <aside id="sidebar">
            <div className="d-flex">
                <button className="toggle-btn" type="button">
                    <i className="lni lni-grid-alt"></i>
                </button>
                <div className="sidebar-logo">
                    <p id="fullName">Michael Dang</p>
                </div>
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <a href="Statistic.html" className="sidebar-link">
                        <i className="fa-solid fa-chart-column"></i>
                        <span>Statistic</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="Show_Staff.html" className="sidebar-link">
                        <i className="fa-solid fa-user-tie"></i>
                        <span>Staff Account</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="Show_Product.html" className="sidebar-link">
                        <i className="fa-regular fa-gem"></i>
                        <span>Products</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="Show_Inventory.html" className="sidebar-link ">
                        <i className="fa-solid fa-warehouse"></i>
                        <span>Manage Inventory</span>
                    </a>
                </li>
            </ul>
            <div className="sidebar-footer">
                <a href="#" className="sidebar-link">
                    <i className="lni lni-exit"></i>
                    <span>Logout</span>
                </a>
            </div>
        </aside>
      
        </>
          
    );
}
export default Sidebar;