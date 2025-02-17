import { useState } from 'react';




const useMsgs = () => {

    const [finderMsg, setFinderMsg] = useState(null)

    const [error, setError] = useState(null)

    const [msg, setMsg] = useState('BASE DE DATOS SOCIOS')

  
    return [msg, setMsg, setFinderMsg, finderMsg, error, setError]

}


export default useMsgs
