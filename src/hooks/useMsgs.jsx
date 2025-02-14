import { useState } from 'react';

const useMsgs = () => {

    const [finderMsg, setFinderMsg] = useState(null);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState(null);
  
    return [msg, setMsg, setFinderMsg, finderMsg, error, setError];

};

export default useMsgs;
