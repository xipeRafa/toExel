
// import '../style.css';



export default function Form({
  editMode,
  msg,
  error,
  // setArr,
  // arr,
  setMsg,
  setFinder,
  setError,
  setFinderMsg,
  setState,
  state,
  setEdit,
  setSearchTXT,
  postSocio,
  setGetDB,
  getDB,
  updateByIdDB
}) {

     const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        //timeStyle: "short",
    })

    const milisegundosComoFecha = (milisegundos=0) => {  // '8 de agosto de 2024, 12:08 a.m.'

        return formateador.format(new Date(milisegundos))

    }


  
    const handleState = (e) => {
        const {name, value} = e.target
        setState({ ...state, [name]: value })
    }


    const handleStateDateInput = (e) => {
        const {name, value} = e.target
        let dateInMscds = Date.parse(value)+25200000 
        setState({ ...state, [name]: dateInMscds })
    }
  
    const {

      nombreDelSocio,
      apellidoPaterno,
      apellidoMaterno,

      curp,
      domicilioDelSocio,

      clase,
      calibre,
      marca,

      modelo,
      matricula,
      folio,

      armasCortas,
      armasLargas,

      fechaDeInscripcion 

    } = state;



    const onSubmit = (e) => {

        e.preventDefault();

        // if (text.trim() === '') {
        //     setError(true);
        //     return;
        // }

     

        if (editMode) {
            //setArr(arr.map( (el) => (el.id === state.id ? state : el) ))
            setEdit(null);
            setMsg('Editado: ' + state.nombreDelSocio);
            updateByIdDB(state.idDB, state)
        } else {

            // if(arr.find((el) => (el.nombreDelSocio === nombreDelSocio )) === undefined){

            //     state.id = Date.now();
            //     state.toggle = true;
            //     setArr([...arr, state]);
            //     setMsg('Nuevo Socio Añadido')

            // }else{
            //     setMsg('Socio Con Nombre Repetido')
            // }


                state.toggle = true;
                state.armasArr = []
                //setArr([...arr, state]);
                setMsg('Nuevo Socio Añadido')
                alert('Nuevo Socio Añadido')
                postSocio(state)

                // JSON.parse(localStorage.arrz).map(el=>{
                //             postSocio(el)
                // })
                        //   postSocio({toggle:true,"apellidoMaterno":"PEÑA","nombreDelSocio":"SANTIAGO","apellidoPaterno":"ACEDO","curp":"AEPS771012HSRCXN00","domicilioDelSocio":"C. MAZATAN 200 INT, COL. INSURGENTES, C.P. 83106, HERMOSILLO, SONORA","fechaDeInscripcion":0,"clase":"PISTOLA","calibre":".380","marca":"TANFOGLIO","modelo":"TINTAN ll","matricula":"EB21429","folio":"A 3672344","armasCortas":1,"armasLargas":"",
                        //     "armasArr":[{"clase":"PISTOLA","calibre":".380","marca":"COLT","modelo":"SIN","matricula":"RR11540","folio":"A 3672371","armasCortas":1,"armasLargas":""}]
                        // })

         

        }

        setFinder(null);
        setError(false) 
        // setState({ text: '', text2:'' });
        setState({
      nombreDelSocio: '',
      apellidoPaterno: '',
      apellidoMaterno: '',

      curp: '',
      domicilioDelSocio: '',

      clase: '',
      calibre:'',
      marca: '',

      modelo: '',
      matricula:'',
      folio: '',

      armasCortas: '',
      armasLargas:'',
      fechaDeInscripcion:0
        });

        setSearchTXT('')
        setFinderMsg(null)

        setTimeout(()=>{
            setGetDB(!getDB)
        },700)
    }
    ///////////////////// fin de submit()


    const handleClose = () => {
        setError(false);
        setMsg('BASE DE DATOS SOCIOS');
    }


    const handleSalir = () => {
        setError(false);
        setMsg('BASE DE DATOS SOCIOS');

        if (window.confirm("Salir de esta Pagina?")) {
            localStorage.removeItem("userSocio")
            location.reload()
        }
        
    }





  return (


      <form onSubmit={onSubmit} className='formStyle0'>
        <div className='formStyle1'>


          <label className={!editMode ? 'dn' : ''}>REG Domicilio Del Club</label>
          <input
          readOnly
              type="text"
              autoComplete="off"
              placeholder="624 - San Luis Potosi No. 158, Col. San Benito, C. P. 83190, Hermosillo, Son."
              name="domicilioDelClub"
              //onChange={handleState}
              //value={domicilioDelClub}
          />

          <label className={!editMode ? 'dn' : ''}>Nombre Del Socio</label>
           <input
              type="text"
              autoComplete="off"
              placeholder="Nombre Del Socio"
              name="nombreDelSocio"
              onChange={handleState}
              value={nombreDelSocio.toUpperCase()}
              required
          />

           <label className={!editMode ? 'dn' : ''}>Apellido Paterno</label>
           <input
              type="text"
              autoComplete="off"
              placeholder="Apellido Paterno"
              name="apellidoPaterno"
              onChange={handleState}
              value={apellidoPaterno.toUpperCase()}
              required
          />

           <label className={!editMode ? 'dn' : ''}>Apellido Materno</label>
           <input
              type="text"
              autoComplete="off"
              placeholder="Apellido Materno"
              name="apellidoMaterno"
              onChange={handleState}
              value={apellidoMaterno.toUpperCase()}
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

          <label className={!editMode ? 'dn' : ''}>Fecha de Inscripción</label>
          <input

              type="date"
              autoComplete="off"
              placeholder="Fecha de Inscripción"
              name="fechaDeInscripcion"
              onChange={(e)=>handleStateDateInput(e)}
          />


        <label className={!editMode ? 'dn' : ''}>Fecha De Inscripcion</label>
            <input
              className='fechaDeInscripcion'
              readOnly
              type="text"
              value={fechaDeInscripcion === 0 
                        ? 'Fecha de Inscripción' 
                        : `Inscripción: ${milisegundosComoFecha(fechaDeInscripcion)}`
                      }
              
          />

</div>

<div className='formStyle2'>

          <label className={!editMode ? 'dn' : ''}>Clase</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Clase"
              name="clase"
              onChange={handleState}
              value={clase}
          />

          <label className={!editMode ? 'dn' : ''}>Calibre</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Calibre"
              name="calibre"
              onChange={handleState}
              value={calibre}
          />

          <label className={!editMode ? 'dn' : ''}>Marca</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Marca"
              name="marca"
              onChange={handleState}
              value={marca}
          />

          <label className={!editMode ? 'dn' : ''}>Modelo</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Modelo"
              name="modelo"
              onChange={handleState}
              value={modelo}
          />

          <label className={!editMode ? 'dn' : ''}>Matricula</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Matricula"
              name="matricula"
              onChange={handleState}
              value={matricula}
          />

          <label className={!editMode ? 'dn' : ''}>Folio</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Folio"
              name="folio"
              onChange={handleState}
              value={folio}
          />

          <label className={!editMode ? 'dn' : ''}>Arma Corta</label>
          <input
              min="0" step="1" max="1"
              type="number"
              autoComplete="off"
              placeholder="Arma Corta"
              name="armasCortas"
              onChange={handleState}
              value={armasCortas}
          />

          <label className={!editMode ? 'dn' : ''}>Arma Larga</label>
          <input
              min="0" step="1" max="1"
              type="number"
              autoComplete="off"
              placeholder="Arma Larga"
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
            <div className='divSombra'>
                <p className="msgError"> {error}
                    <button className="buttonClose" onClick={handleClose}>✘</button>
                </p> 
            </div>
          : ''}


          {msg ?
            <div className='divSombra'>
                <p className="msg" onClick={handleSalir}> {msg}
                    {/*<div className="buttonClose" onClick={handleClose}></button>*/}
                </p>
            </div>
          : '' }


    </form>


  );
}
