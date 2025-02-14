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
    }
  
    const {

      numeroRegistroDelClub,
      domicilioDelClub,
      nombreDelSocio,

      curp,
      numeroDelSocio,
      domicilioDelSocio,

      clase,
      calibre,
      marca,

      modelo,
      matricula,
      folio,

      armasCortas,
      armasLargas 

    } = state;



    const onSubmit = (e) => {

        e.preventDefault();

        // if (text.trim() === '') {
        //     setError(true);
        //     return;
        // }

        setArr([...arr, state]);

        if (editMode) {
            setArr(arr.map((el) => (el.id === state.id ? state : el)));
            setEdit(null);
            setMsg('Ediatado Exitosamente');
        } else {
            state.id = Date.now();
            // state.toggle = false;
            setMsg('Wuuu !!!');
        }

        setFinder(null);
        setError(false) 
        // setState({ text: '', text2:'' });
        setTXT('')
        setFinderMsg(null);
    }


    const handleClose = () => {
        setError(false);
        setMsg(null);
    }




  return (


      <form onSubmit={onSubmit}>

          <input
              autoComplete="off"
              placeholder="Numero Registro Del Club"
              name="numeroRegistroDelClub"
              onChange={handleState}
              value={numeroRegistroDelClub}
          />

          <input
              autoComplete="off"
              placeholder="Domicilio Del Club"
              name="domicilioDelClub"
              onChange={handleState}
              value={domicilioDelClub}
          />

           <input
              autoComplete="off"
              placeholder="Nombre Del Socio"
              name="nombreDelSocio"
              onChange={handleState}
              value={nombreDelSocio}
          />

          <input
              autoComplete="off"
              placeholder="curp"
              name="curp"
              onChange={handleState}
              value={curp}
          />

          <input
              autoComplete="off"
              placeholder="numeroDelSocio"
              name="numeroDelSocio"
              onChange={handleState}
              value={numeroDelSocio}
          />

           <input
              autoComplete="off"
              placeholder="domicilioDelSocio"
              name="domicilioDelSocio"
              onChange={handleState}
              value={domicilioDelSocio}
          />

          <input
              autoComplete="off"
              placeholder="clase"
              name="clase"
              onChange={handleState}
              value={clase}
          />

          <input
              autoComplete="off"
              placeholder="calibre"
              name="calibre"
              value={calibre}
          />

           <input
              autoComplete="off"
              placeholder="marca"
              name="marca"
              onChange={handleState}
              value={marca}
          />

          <input
              autoComplete="off"
              placeholder="modelo"
              name="modelo"
              onChange={handleState}
              value={modelo}
          />

          <input
              autoComplete="off"
              placeholder="matricula"
              name="matricula"
              onChange={handleState}
              value={matricula}
          />

           <input
              autoComplete="off"
              placeholder="folio"
              name="folio"
              onChange={handleState}
              value={folio}
          />

          <input
              autoComplete="off"
              placeholder="armasCortas"
              name="armasCortas"
              onChange={handleState}
              value={armasCortas}
          />

          <input
              autoComplete="off"
              placeholder="armasLargas"
              name="armasLargas"
              onChange={handleState}
              value={armasLargas}
          />
 


          <button type="submit"> {editMode ? 'save edit' : 'send'} </button>
    

          {error ?
              <p className="msgError"> TYPE FIRSTLY
                <button className="buttonClose" onClick={handleClose}>x</button>
              </p> 
          : ''}


          {msg ?
              <p className="msg"> {msg}
                  <button className="buttonClose" onClick={handleClose}>x</button>
              </p>
          : '' }


    </form>


  );
}
