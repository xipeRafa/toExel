import { useEffect, useState } from 'react'

export default function Item({
  i,
  el,
  setEdit,
  setState,
  // arr,
  // setArr,
  setFinder,
  setMsg,
  deleteByIdDB,
  setGetDB,
  getDB,
  updateByIdDB,
  items,
  setBtnDisplayState
}) {













   const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        //timeStyle: "short",
    })

    const milisegundosComoFecha = (milisegundos=0) => {  // '8 de agosto de 2024, 12:08 a.m.'

        return formateador.format(new Date(milisegundos))

    }


 const [isActiveModal, setIsActiveModal] = useState(true)

 const [isActiveModalNewArma, setIsActiveModalNewArma] = useState(true)

 const [isActiveModalEditArma, setIsActiveModalEditArma] = useState(true)

  const deleteItem = (EL) => {

      if (window.confirm("Quieres Borrar a este Socio")) {

          setIsActiveModal(!isActiveModal)
          //setArr(arr.filter((el) => el.id !== EL.id))
          deleteByIdDB(EL.idDB)
          setFinder(null);
          setMsg('Eliminado: ' + EL.nombreDelSocio);

          setTimeout(()=>{
              setGetDB(!getDB)
          },700)

      }   
      
  }

  const deleteArma = (ARMA) => {

      if (window.confirm("Quieres Borrar esta Arma Clase: " + ARMA.clase)) {

          setIsActiveModal(!isActiveModal)
          //setIsActiveModalNewArma(!isActiveModalNewArma)
          //setArr(arr.filter((el) => el.id !== EL.id))
          setFinder(null);

          let newArrOneWaponLess = el.armasArr.filter(el=>el.matricula !== ARMA.matricula)

          el.armasArr = newArrOneWaponLess

          updateByIdDB(el.idDB, el)

          setMsg('Arma Eliminada de: ' + el.nombreDelSocio);
      }   
      
  }























   const [stateEditArma, setStateEditArma] = useState({
      clase: '',
      calibre:'',
      marca: '',

      modelo: '',
      matricula:'',
      folio: '',

      armasCortas: '',
      armasLargas:''
  })


  const editItemArma =(ELE, i)=>{
        localStorage.armaToEditIndex = JSON.stringify(i)
        setIsActiveModalEditArma(false)
        setStateEditArma(ELE)
        window.scrollTo(0,0);
  }


  const handleStateEditArma = (e) => {
      const {name, value}=e.target
      setStateEditArma({ ...stateEditArma, [name]:value }) 
  }



const EditarArmaSubmit=(EL)=>{

   EL.armasArr.splice(Number(localStorage.armaToEditIndex),1,stateEditArma)

   updateByIdDB(EL.idDB, EL)

   setIsActiveModalEditArma(true)
}




















  const toggleItem = (EL) => {

    if (window.confirm("Quieres Cambiar Status")) {

      let ttArr = []

      items.map((el) => {
          if(el.idDB === EL.idDB){
              el.toggle = !el.toggle
              ttArr.push(el)
          }
      })

      //setArr(arr.map( (el) => (el.id === EL.id ? ttArr[0] : el) ))

      items.find((el) => el.idDB === EL.idDB).toggle
            ? setMsg(`Marcado como Activo: ${ EL.nombreDelSocio}`)
            : setMsg(`Marcado como Inactivo: ${ EL.nombreDelSocio}`)


      updateByIdDB(EL.idDB, ttArr[0])

      setTimeout(()=>{
          setGetDB(!getDB)
      },700)

    }  

  }


  const editItem = (item) => {
      setIsActiveModal(!isActiveModal)
      window.scrollTo(0,0);
      setMsg('Listo para Editar')

      setState(item);
      setEdit(item);
  }

  const anadirArma =(item)=>{
      setIsActiveModalNewArma(!isActiveModalNewArma)
      window.scrollTo(0,0);
  }



  const [stateNewArma, setStateNewArma] = useState({
      clase: '',
      calibre:'',
      marca: '',

      modelo: '',
      matricula:'',
      folio: '',

      armasCortas: '',
      armasLargas:''
  })


  const {
      clase,
      calibre,
      marca,

      modelo,
      matricula,
      folio,

      armasCortas,
      armasLargas 
  } = stateNewArma


  const handleStateNewArma = (e) => {
      const {name, value}=e.target
      setStateNewArma({ ...stateNewArma, [name]:value })
      
  }



  const AgregarArmaSubmit = (EL) => {

      let armArr = []

      items.map((obj) => {

          if(obj.id === EL.id){
              //stateNewArma.AID=Date.now()
              obj.armasArr.push(stateNewArma)
              armArr.push(obj) 
          }

      }) 
       

      //setArr(arr.map( (el) => (el.id === EL.id ? armArr[0] : el) ))


      setStateNewArma({
          clase: '',
          calibre:'',
          marca: '',

          modelo: '',
          matricula:'',
          folio: '',

          armasCortas: '',
          armasLargas:''
      })

      setIsActiveModalNewArma(!isActiveModalNewArma)


      updateByIdDB(EL.idDB, armArr[0])

      setTimeout(()=>{
            setGetDB(!getDB)
      },700)

  }

  const modalName=()=>{
      window.scrollTo(0,0);
      setIsActiveModal(!isActiveModal)
  }





















console.log(el)


  return (

      <div key={i} className="item">


          <div className={i%2 === 0 ? 'bg1' : 'bg2'}  onClick={modalName}>
               <span className={!el.toggle ? 'active c-pointer' : 'c-pointer'}> {el.apellidoPaterno} { el.apellidoMaterno} {el.nombreDelSocio}</span>
          </div>







          <modal className={!isActiveModal ? 'inModal' : 'outModal'}>

              <button className='btnCerrarModal' onClick={() => setIsActiveModal(!isActiveModal)}>Cerrar ✕</button>

              {/*<input className='d' type="button" id={el.id} value='ss'/>*/}
              <label className={el.toggle ? 'labelItemToggle' : 'labelItemToggleFalse' } onClick={()=> toggleItem(el)}> 
                  {!el.toggle ? 'Inactivo ✘' : ' Activo ✔' } 
              </label> {/* htmlFor={el.id}*/}


              <div className='modalContent'>



                  <div>
                      <p className='name'>{el.nombreDelSocio}</p>
                      <p className='name'> {el.apellidoPaterno} {el.apellidoMaterno} </p><br />
                      <p><span>CURP:</span> {el.curp}</p>

                      <p className='domicilio'><span>Domicilio:</span> {el.domicilioDelSocio}</p>

                      <p><span>Inscripción:</span>{milisegundosComoFecha(el.fechaDeInscripcion)}</p>
                       {/*<p><span></span> </p>*/}
                  </div> 

                  <div>
                      <p><span>Clase:</span> {el.clase}</p>
                      <p><span>Calibre:</span> {el.calibre}</p>
                      <p><span>Marca:</span> {el.marca}</p>
                      <p><span>Modelo:</span> {el.modelo}</p>
                      <p><span>Matricula:</span> {el.matricula}</p>

                      <p><span>Folio:</span> {el.folio}</p>
                      <p><span>{el.armasCortas == '1' ? 'ARMA CORTA':'ARMA LARGA'}</span></p>
                      {/*<p><span>Arma Corta:</span> {el.armasCortas}</p>
                      <p><span>Arma Larga:</span> {el.armasLargas}</p>*/}
                  </div>

                  <div className='newArmas'>{el.armasArr.map((ele, i)=>(
                      <div key={i}>
                          <p><span>Clase:</span> {ele.clase}</p>
                          <p><span>Calibre:</span> {ele.calibre}</p>
                          <p><span>Marca:</span> {ele.marca}</p>
                          <p><span>Modelo:</span> {ele.modelo}</p>
                          <p><span>Matricula:</span> {ele.matricula}</p>

                          <p><span>Folio:</span> {ele.folio}</p>

                          <p><span>{ele.armasCortas == '1' ? 'ARMA CORTA':'ARMA LARGA'}</span></p>


                          <div className='editarArmaButtonsContainer'>

                              <button onClick={() => deleteArma(ele)}>🗑︎</button>

                              <button style={{lineHeight:'30px', color:'rgb(121,135,160)',fontSize: '27px',
                                              padding: '2px 12px',marginLeft:'15px'}} 
                                  onClick={() => editItemArma(ele, i)}>
                                    ✎
                              </button>

                          </div>

                      </div>       
                  ))}
                  </div>

              </div>

<div className='editarItemButtonsContainer'>
              <button onClick={() => deleteItem(el)}>Borrar</button>
              <button onClick={() => editItem(el)}>Editar</button>
              <button onClick={() => anadirArma(el)}>Añadir Arma</button>
</div>
        {/*      <input className='dn' type="button" id={el.id} onClick={()=> toggleItem(el.id, el.nombreDelSocio)} />
              <label className='labelItemToggle' htmlFor={el.id}> {!el.toggle ? 'Inactivo' : ' Activo' } </label>*/}


          </modal>




































          <modal className={!isActiveModalNewArma ? 'inModal' : 'outModal'}>

              <button className='btnCerrarModal' onClick={()=>setIsActiveModalNewArma(!isActiveModalNewArma)}>Cerrar ✕</button>
<br />




              <div className='modalContent'>







                  <div className='formStyle2'>

                  {/*<label >Clase</label>*/}
          <input
              type="text"
              autoComplete="off"
              placeholder="Clase"
              name="clase"
              onChange={handleStateNewArma}
              value={clase}
          />

          {/*<label>Calibre</label>*/}
          <input
              type="text"
              autoComplete="off"
              placeholder="Calibre"
              name="calibre"
              onChange={handleStateNewArma}
              value={calibre}
          />

          {/*<label>Marca</label>*/}
          <input
              type="text"
              autoComplete="off"
              placeholder="Marca"
              name="marca"
              onChange={handleStateNewArma}
              value={marca}
          />

          {/*<label>Modelo</label>*/}
          <input
              type="text"
              autoComplete="off"
              placeholder="Modelo"
              name="modelo"
              onChange={handleStateNewArma}
              value={modelo}
          />

          {/*<label>Matricula</label>*/}
          <input
              type="text"
              autoComplete="off"
              placeholder="Matricula"
              name="matricula"
              onChange={handleStateNewArma}
              value={matricula}
          />

          {/*<label>Folio</label>*/}
          <input
              type="text"
              autoComplete="off"
              placeholder="Folio"
              name="folio"
              onChange={handleStateNewArma}
              value={folio}
          />

          {/*<label>Arma Corta</label>*/}
          <input
              type="number"
              min="0" step="1" max="1"
              autoComplete="off"
              placeholder="Arma Corta"
              name="armasCortas"
              onChange={handleStateNewArma}
              value={armasCortas}
          />

          {/*<label>Arma Larga</label>*/}
          <input
              type="number"
              min="0" step="1" max="1"
              autoComplete="off"
              placeholder="Arma Larga"
              name="armasLargas"
              onChange={handleStateNewArma}
              value={armasLargas}
          />


                  </div>

              </div>


             
         <button className='guardarArma' onClick={() => AgregarArmaSubmit(el)}>Guardar Arma para {el.nombreDelSocio}</button>


          </modal>

































  <modal className={!isActiveModalEditArma ? 'inModal' : 'outModal'}>

              <button className='btnCerrarModal' onClick={()=>setIsActiveModalEditArma(!isActiveModalEditArma)}>Cerrar ✕</button>
<br />
<small>Editar Arma:</small>



              <div className='modalContent'>







                  <div className='formStyle2'>

                  <label className='labelEdit'>Clase</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Clase"
              name="clase"
              onChange={handleStateEditArma}
              value={stateEditArma.clase}
          />

          <label className='labelEdit'>Calibre</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Calibre"
              name="calibre"
              onChange={handleStateEditArma}
              value={stateEditArma.calibre}
          />

          <label className='labelEdit'>Marca</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Marca"
              name="marca"
              onChange={handleStateEditArma}
              value={stateEditArma.marca}
          />

          <label className='labelEdit'>Modelo</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Modelo"
              name="modelo"
              onChange={handleStateEditArma}
              value={stateEditArma.modelo}
          />

          <label className='labelEdit'>Matricula</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Matricula"
              name="matricula"
              onChange={handleStateEditArma}
              value={stateEditArma.matricula}
          />

          <label className='labelEdit'>Folio</label>
          <input
              type="text"
              autoComplete="off"
              placeholder="Folio"
              name="folio"
              onChange={handleStateEditArma}
              value={stateEditArma.folio}
          />

          <label className='labelEdit'>Arma Corta</label>
          <input
              type="number"
              min="0" step="1" max="1"
              autoComplete="off"
              placeholder="Arma Corta"
              name="armasCortas"
              onChange={handleStateEditArma}
              value={stateEditArma.armasCortas || 0}
          />

          <label className='labelEdit'>Arma Larga</label>
          <input
              type="number"
              min="0" step="1" max="1"
              autoComplete="off"
              placeholder="Arma Larga"
              name="armasLargas"
              onChange={handleStateEditArma}
              value={stateEditArma.armasLargas || 0}
          />


                  </div>

              </div>


             
         <button className='guardarArma' onClick={() => EditarArmaSubmit(el)}>Guardar Edicion de Arma para {el.nombreDelSocio}</button>


          </modal>






















      </div>

  );
}
