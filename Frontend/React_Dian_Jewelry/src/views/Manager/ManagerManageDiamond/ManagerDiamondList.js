import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import logo from "../../../assets/img/logoN.png";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import DiamondTypeSwitcher from "./DiamondTypeSwitcher.js";

const ManagerDiamondList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearchTermChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="manager_manage_diamond_all_container">
      <div className="manager_manage_diamond_sidebar">
        <ManagerSidebar currentPage="manager_manage_diamond" />
      </div>
      <div className="manager_manage_diamond_content">
        <div className="manager_manage_diamond_header">
          <img className="manager_manage_diamond_logo" src={logo} alt="Logo" />
          <div className="manager_manage_diamond_search_section">
            <input
              type="text"
              className="manager_manage_diamond_search_bar"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <DiamondTypeSwitcher searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default ManagerDiamondList;
