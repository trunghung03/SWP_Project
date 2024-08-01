import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="manager_manage_product_search_section">
      <input
        type="text"
        className="manager_manage_product_search_bar"
        placeholder="Search by ID..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
