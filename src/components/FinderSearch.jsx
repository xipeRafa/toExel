



export default function FinderSearch({items, handleSearch, searchTXT}) {


  return (

      <input
          className='finder'
          autoComplete="off"
          placeholder="BUSCAR SOCIO POR APELLIDO PATERNO..."
          onChange={(e) => handleSearch(e, items)}
          type="search"
          value={searchTXT.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())}
      />

  );

}

