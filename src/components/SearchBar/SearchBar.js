import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBar.css';

const SearchBar = ({ value, name, onChange, type, placeholder }) => {
  return (
    <>
      <div className="search__container mb-3">
        <SearchIcon />
        <input
          className="search__input form-control shadow-none"
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default SearchBar;
