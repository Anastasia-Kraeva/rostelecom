import React from 'react';

const Search = ({handleChangeInput}) => {

  return (
    <div className={'filterBox'}>
      <input onInput={handleChangeInput}/>
    </div>
  );
};

export default Search;