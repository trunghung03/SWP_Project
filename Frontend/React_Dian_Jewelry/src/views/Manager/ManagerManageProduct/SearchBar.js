// SearchBar.js
import React from "react";
import PropTypes from "prop-types";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearchKeyPress }) => {
  return (
    <div className="manager_manage_product_search_section">
      <input
        type="text"
        className="manager_manage_product_search_bar"
        placeholder="Search by ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleSearchKeyPress}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  handleSearchKeyPress: PropTypes.func.isRequired,
};

export default SearchBar;
