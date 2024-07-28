import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import { useSearchParams } from "react-router-dom";
import logo from "../../../assets/img/logoN.png";
import ManagerSidebar from "../../../components/ManagerSidebar/ManagerSidebar.js";
import "../../../styles/Manager/ManagerList.scss";
import DiamondTypeSwitcher from "./DiamondTypeSwitcher.js";

const ManagerDiamondList = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
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
              placeholder="Search by ID or Shape..."
              onChange={(e) => {
                searchParams.set("search", e.target.value);
                setSearchParams(
                  searchParams.toString().length === 0
                    ? ""
                    : "?" + searchParams.toString()
                );
              }}
              // onKeyUp={handleSearchKeyPress}
            />
          </div>
        </div>
        <hr className="manager_header_line"></hr>
        <DiamondTypeSwitcher />
      </div>
    </div>
  );
};

export default ManagerDiamondList;
