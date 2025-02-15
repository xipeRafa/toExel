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
  setSearchTXT
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

     

        if (editMode) {
            setArr(arr.map((el) => (el.id === state.id ? state : el)));
            setEdit(null);
            setMsg('Ediatado Exitosamente');
        } else {

            if(arr.find((el) => (el.nombreDelSocio === nombreDelSocio )) === undefined){

                state.id = Date.now();
                state.toggle = false;
                setArr([...arr, state]);
                setMsg('Wuuu !!!');
                console.log('tue')
            }else{
              setMsg('Socio Con Nombre Repetido')
            }
        }

        setFinder(null);
        setError(false) 
        // setState({ text: '', text2:'' });
        setSearchTXT('')
        setFinderMsg(null);
    }


    const handleClose = () => {
        setError(false);
        setMsg(null);
    }




  return (


      <form onSubmit={onSubmit} className='formStyle0'>
        <div className='formStyle1'>
          <input
              type="text"
              autoComplete="off"
              placeholder="Numero Registro Del Club"
              name="numeroRegistroDelClub"
              onChange={handleState}
              value={numeroRegistroDelClub}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Domicilio Del Club"
              name="domicilioDelClub"
              onChange={handleState}
              value={domicilioDelClub}
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Nombre Del Socio"
              name="nombreDelSocio"
              onChange={handleState}
              value={nombreDelSocio}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="CURP"
              name="curp"
              onChange={handleState}
              value={curp}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Numero Del Socio"
              name="numeroDelSocio"
              onChange={handleState}
              value={numeroDelSocio}
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Domicilio Del Socio"
              name="domicilioDelSocio"
              onChange={handleState}
              value={domicilioDelSocio}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Clase"
              name="clase"
              onChange={handleState}
              value={clase}
          />


</div>

<div className='formStyle2'>
          <input
              type="text"
              autoComplete="off"
              placeholder="Calibre"
              name="calibre"
              value={calibre}
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Marca"
              name="marca"
              onChange={handleState}
              value={marca}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Modelo"
              name="modelo"
              onChange={handleState}
              value={modelo}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Matricula"
              name="matricula"
              onChange={handleState}
              value={matricula}
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Folio"
              name="folio"
              onChange={handleState}
              value={folio}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Armas Cortas"
              name="armasCortas"
              onChange={handleState}
              value={armasCortas}
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Armas Largas"
              name="armasLargas"
              onChange={handleState}
              value={armasLargas}
          />
 </div>

<br />
          <button type="submit"> {editMode ? 'Editar' : 'Guardar'} </button>
 <br />   
 <br />

          {error ?
              <p className="msgError"> TYPE FIRSTLY
                <button className="buttonClose" onClick={handleClose}>x</button>
              </p> 
          : ''}


          {msg ?
              <p className="msg"> {msg}
                  <button className="buttonClose" onClick={handleClose}>✘</button>
              </p>
          : '' }


    </form>


  );
}
