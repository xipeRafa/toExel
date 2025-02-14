import { useState } from 'react';




const useFinder = () => {

    const [finder, setFinder] = useState(null);

    const [searchTXT, setTXT] = useState('');

    const handleSearch = (e, arr) => {
        setTXT(e.target.value);
        setFinder(arr.filter((el) => el.text.indexOf(searchTXT) > -1));
    };

    return [finder, setFinder, handleSearch, setTXT, searchTXT]

}



export default useFinder;











/*   

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    let finding = capitalizeFirstLetter(e.target.value.toLowerCase());
  
    setTXT(finding);
    
*/
