import { useState } from 'react';




const useFinder = () => {

    const [finderState, setFinder] = useState(null)


    const [searchTXT, setSearchTXT] = useState('')


    const handleSearch = (e, arr) => {

        setSearchTXT(e.target.value)

        if(searchTXT.length>3){
            setFinder(arr.filter((el) => el.nombreDelSocio.indexOf(searchTXT) > -1))
        }
       
    }

    return [finderState, setFinder, handleSearch, searchTXT, setSearchTXT]

}



export default useFinder;











/*   

    function capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    let finding = capitalizeFirstLetter(e.target.value.toLowerCase());
  
    setTXT(finding);
    
*/
