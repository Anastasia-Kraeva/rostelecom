import React from 'react';

const Search = ({handleChangeInput, handleChangeSelect, sortValue, sortingStatusOptions}) => {

  return (
    <div className={'filterBox'}>
      <input onInput={handleChangeInput}/>
      <select value={sortValue} onChange={handleChangeSelect}>
        {sortingStatusOptions.map(option => {
          return (<option key={`fo-${option.id}`} value={option.value}>{option.value}</option>)
        })}
      </select>
    </div>
  );
};

export default Search;