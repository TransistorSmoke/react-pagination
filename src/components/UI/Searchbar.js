import React, { useState } from 'react';

const Searchbar = (props) => {
  const [searchText, setSearchText] = useState('');

  const onSearchSubmit = (event) => {
    event.preventDefault();
    props.onSearchDigimons(searchText);
    setSearchText('');
  };

  const onSearchValueChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <div>
      <form onSubmit={onSearchSubmit} className="w-50 mx-auto py-3 ">
        <input
          type="search"
          placeholder="Search Digimon"
          className={`${props.className} form-control me-2`}
          onChange={onSearchValueChange}
          value={searchText}
        />
        <button type="submit" className={`w-100 p-2 mt-3 btn btn-primary`}>
          Search
        </button>
        <button
          className={`w-100 p-2 mt-2 btn btn-warning`}
          onClick={props.resetSearchList}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
