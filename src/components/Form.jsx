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
            setMsg('Editado Exitosamente');
        } else {

            if(arr.find((el) => (el.nombreDelSocio === nombreDelSocio )) === undefined){

                state.id = Date.now();
                state.toggle = true;
                setArr([...arr, state]);
                setMsg('Nuevo Socio Añadido');
            }else{
              setMsg('Socio Con Nombre Repetido')
            }
        }

        setFinder(null);
        setError(false) 
        // setState({ text: '', text2:'' });
        setState({
      numeroRegistroDelClub: '',
      domicilioDelClub:'',
      nombreDelSocio: '',

      curp: '',
      numeroDelSocio:'',
      domicilioDelSocio: '',

      clase: '',
      calibre:'',
      marca: '',

      modelo: '',
      matricula:'',
      folio: '',

      armasCortas: '',
      armasLargas:''
  });
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
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Domicilio Del Club"
              name="domicilioDelClub"
              onChange={handleState}
              value={domicilioDelClub}
              required
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Nombre Del Socio"
              name="nombreDelSocio"
              onChange={handleState}
              value={nombreDelSocio}
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="CURP"
              name="curp"
              onChange={handleState}
              value={curp}
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Numero Del Socio"
              name="numeroDelSocio"
              onChange={handleState}
              value={numeroDelSocio}
              required
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Domicilio Del Socio"
              name="domicilioDelSocio"
              onChange={handleState}
              value={domicilioDelSocio}
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Clase"
              name="clase"
              onChange={handleState}
              value={clase}
              required
          />


</div>

<div className='formStyle2'>
          <input
              type="text"
              autoComplete="off"
              placeholder="Calibre"
              name="calibre"
              onChange={handleState}
              value={calibre}
              required
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Marca"
              name="marca"
              onChange={handleState}
              value={marca}
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Modelo"
              name="modelo"
              onChange={handleState}
              value={modelo}
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Matricula"
              name="matricula"
              onChange={handleState}
              value={matricula}
              required
          />

           <input
              type="text"
              autoComplete="off"
              placeholder="Folio"
              name="folio"
              onChange={handleState}
              value={folio}
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Armas Cortas"
              name="armasCortas"
              onChange={handleState}
              value={armasCortas}
              required
          />

          <input
              type="text"
              autoComplete="off"
              placeholder="Armas Largas"
              name="armasLargas"
              onChange={handleState}
              value={armasLargas}
              required
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
            <div className='divSombra'>
              <p className="msg" onClick={handleClose}> {msg}
                  {/*<div className="buttonClose" onClick={handleClose}>✘</button>*/}
              </p>

              </div>
          : '' }


    </form>


  );
}
