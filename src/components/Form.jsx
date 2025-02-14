import React from 'react';
// import '../style.css';

export default function Form({
  editMode,
  msg,
  error,
  setArr,
  arr,
  setMsg,
  setFinder,
  setError,
  setFinderMsg,
  setState,
  state,
  setEdit,
  setTXT
}) {
  
  const handleState = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  
  const { text, text2 } = state;



  const onSubmit = (e) => {

    e.preventDefault();
    if (text.trim() === '') {
      setError(true);
      return;
    }

    setArr([...arr, state]);

    if (editMode) {
      setArr(arr.map((el) => (el.id === state.id ? state : el)));
      setEdit(null);
      setMsg('Ediatado Exitosamente');
    } else {
      state.id = Date.now();
      state.toggle = false;
      setMsg('Wuuu !!!');
    }

    setFinder(null);
    setError(false) 
    setState({ text: '', text2:'' });
    setTXT('')
    setFinderMsg(null);
  };


  const handleClose = () => {
    setError(false);
    setMsg(null);
  };

  return (


    <form onSubmit={onSubmit}>

      <input
        autoComplete="off"
        placeholder="type here..."
        name="text"
        onChange={handleState}
        type="text"
        value={text}
      />

      <input
        autoComplete="off"
        placeholder="type here..."
        name="text2"
        onChange={handleState}
        type="text"
        value={text2}
      />

      <button type="submit"> {editMode ? 'save edit' : 'send'} </button>
    
      {error ?
        <p className="msgError">
          TYPE FIRSTLY
          <button className="buttonClose" onClick={handleClose}>x</button>
        </p> : ''
      }


      {msg ?
        <p className="msg">
          {msg}
          <button className="buttonClose" onClick={handleClose}>x</button>
        </p> : ''
      }


    </form>
  );
}
