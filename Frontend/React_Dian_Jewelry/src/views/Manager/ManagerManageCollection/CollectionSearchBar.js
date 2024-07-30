import React from "react";

const CollectionSearchBar = ({ searchQuery, setSearchQuery, handleSearchKeyPress }) => {
  return (
    <div className="manager_manage_diamond_search_section">
      <input
        type="text"
        className="manager_manage_diamond_search_bar"
        placeholder="Search by ID..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleSearchKeyPress}
      />
    </div>
  );
};

export default CollectionSearchBar;
