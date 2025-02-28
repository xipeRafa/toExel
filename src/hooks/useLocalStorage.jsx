import { useState, useEffect } from 'react';


const useLocalStorage = () => {
  
    let arrInitial = JSON.parse(localStorage.getItem('array'))

    if (!arrInitial) {
        arrInitial = [];
    }

    const [arr, setArr] = useState(arrInitial);



    useEffect(() => {
        arrInitial
            ? localStorage.setItem('array', JSON.stringify(arr))
            : localStorage.setItem('array', JSON.stringify([]));
    }, [arr])

    //console.log('arrLocalStorage:', arr)

    return [arr, setArr]

}


export default useLocalStorage;
