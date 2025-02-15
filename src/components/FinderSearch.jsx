import React from 'react';



export default function FinderSearch({arr, handleSearch, searchTXT}) {


  return (

      <input
          className='finder'
          autoComplete="off"
          placeholder="BUSCAR POR NOMBRE DE SOCIO..."
          onChange={(e) => handleSearch(e, arr)}
          type="search"
          value={searchTXT}
      />

  );

}

