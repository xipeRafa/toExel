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
            setArr(arr.map( (el) => (el.id === state.id ? state : el) ))
            setEdit(null);
            setMsg('Editado Exitosamente');
        } else {

            if(arr.find((el) => (el.nombreDelSocio === nombreDelSocio )) === undefined){

                state.id = Date.now();
                state.toggle = true;
                setArr([...arr, state]);
                setMsg('Nuevo Socio Añadido')

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
        setMsg('BASE DE DATOS SOCIOS');
    }




  return (


      <form onSubmit={onSubmit} className='formStyle0'>
        <div className='formStyle1'>

          <label className={!editMode ? 'dn' : ''}>Numero Registro Del Club</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Numero Registro Del Club"
              name="numeroRegistroDelClub"
              onChange={handleState}
              value={numeroRegistroDelClub}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Domicilio Del Club</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Domicilio Del Club"
              name="domicilioDelClub"
              onChange={handleState}
              value={domicilioDelClub}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Nombre Del Socio</label>
           <input
              type="text"
              autoComplete="off"
              placeholder="Nombre Del Socio"
              name="nombreDelSocio"
              onChange={handleState}
              value={nombreDelSocio.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())}
              required
          />
         

          <label className={!editMode ? 'dn' : ''}>CURP</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="CURP"
              name="curp"
              onChange={handleState}
              value={curp}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Numero Del Socio</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Numero Del Socio"
              name="numeroDelSocio"
              onChange={handleState}
              value={numeroDelSocio}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Domicilio Del Socio</label>
           <input
              type="text"
              autoComplete="off"
              placeholder="Domicilio Del Socio"
              name="domicilioDelSocio"
              onChange={handleState}
              value={domicilioDelSocio}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Clase</label>
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

          <label className={!editMode ? 'dn' : ''}>Calibre</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Calibre"
              name="calibre"
              onChange={handleState}
              value={calibre}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Marca</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Marca"
              name="marca"
              onChange={handleState}
              value={marca}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Modelo</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Modelo"
              name="modelo"
              onChange={handleState}
              value={modelo}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Matricula</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Matricula"
              name="matricula"
              onChange={handleState}
              value={matricula}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Folio</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Folio"
              name="folio"
              onChange={handleState}
              value={folio}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Armas Cortas</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Armas Cortas"
              name="armasCortas"
              onChange={handleState}
              value={armasCortas}
              required
          />

          <label className={!editMode ? 'dn' : ''}>Armas Largas</label>
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
            <div className='divSombra'>
                <p className="msgError"> {error}
                    <button className="buttonClose" onClick={handleClose}>✘</button>
                </p> 
            </div>
          : ''}


          {msg ?
            <div className='divSombra'>
                <p className="msg" onClick={handleClose}> {msg}
                    {/*<div className="buttonClose" onClick={handleClose}></button>*/}
                </p>
            </div>
          : '' }


    </form>


  );
}
