import React from 'react';

export default function FinderSearch({arr, handleSearch, searchTXT}) {
  return (
    <input
      autoComplete="off"
      placeholder="buscar"
      onChange={(e) => handleSearch(e, arr)}
      type="text"
      value={searchTXT}
    />
  );
}

