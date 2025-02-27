
import { useEffect, useState } from 'react'


export default function Item({
  i,
  el,
  setEdit,
  setState,
  arr,
  setArr,
  setFinder,
  setMsg,
}) {

   const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        //timeStyle: "short",
    })

    const milisegundosComoFecha = (milisegundos) => {  // '8 de agosto de 2024, 12:08 a.m.'

        return formateador.format(new Date(milisegundos))

    }


 const [isActiveModal, setIsActiveModal] = useState(true)

 const [isActiveModalNewArma, setIsActiveModalNewArma] = useState(true)

  const deleteItem = (EL) => {

      if (window.confirm("Quieres Borrar a este Socio")) {
          setIsActiveModal(!isActiveModal)
          setArr(arr.filter((el) => el.id !== EL.id))
          setFinder(null);
          setMsg('Eliminado: ' + EL.nombreDelSocio);
      }   
      
  }


  const toggleItem = (ID, nombre) => {
    if (window.confirm("Quieres Cambiar Status")) {

      let ttArr = []

      arr.map((el) => {
          if(el.id === ID){
              el.toggle = !el.toggle
              ttArr.push(el)
          }
      })

      setArr(arr.map( (el) => (el.id === ID ? ttArr[0] : el) ))

      arr.find((el) => el.id === ID).toggle
            ? setMsg(`Marcado como Activo: ${ nombre}`)
            : setMsg(`Marcado como Inactivo: ${ nombre}`)

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

      arr.map((obj) => {

          if(obj.id === EL.id){
              obj.armasArr.push(stateNewArma)
              armArr.push(obj) 
          }

      }) 
       

      setArr(arr.map( (el) => (el.id === EL.id ? armArr[0] : el) ))


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

  }

  const modalName=()=>{
      window.scrollTo(0,0);
      setIsActiveModal(!isActiveModal)
  }



  return (

      <div key={i} className="item">


          <div className={!el.toggle ? 'active c-pointer' : 'c-pointer'} onClick={modalName}>
              {el.nombreDelSocio} {el.apellidoPaterno} {el.apellidoMaterno}
          </div>


          <modal className={!isActiveModal ? 'inModal' : 'outModal'}>

              <button className='btnCerrarModal' onClick={() => setIsActiveModal(!isActiveModal)}>Cerrar ✕</button>

              <input className='dn' type="button" id={el.id} onClick={()=> toggleItem(el.id, el.nombreDelSocio)} />
              <label className='labelItemToggle' htmlFor={el.id}> {!el.toggle ? 'Inactivo' : ' Activo' } </label>


              <div className='modalContent'>



                  <div>
                      <p className='name'>{el.nombreDelSocio} </p>
                      <p className='name'> {el.apellidoPaterno} {el.apellidoMaterno} </p>
                      <p><span>CURP:</span> {el.curp}</p>
                      <p><span>Numero:</span> {el.numeroDelSocio}</p>

                      <p><span>Domicilio:</span> {el.domicilioDelSocio}</p>

                      <p><span>Fecha de Inscripción:</span></p>
                       <p><span></span> {milisegundosComoFecha(el.fechaDeInscripcion)}</p>
                  </div> 

                  <div>
                      <p><span>Clase:</span> {el.clase}</p>
                      <p><span>Calibre:</span> {el.calibre}</p>
                      <p><span>Marca:</span> {el.marca}</p>
                      <p><span>Modelo:</span> {el.modelo}</p>
                      <p><span>Matricula:</span> {el.matricula}</p>

                      <p><span>Folio:</span> {el.folio}</p>
                      <p><span>Arma Corta:</span> {el.armasCortas}</p>
                      <p><span>Arma Larga:</span> {el.armasLargas}</p>
                  </div>

                  <div className='newArmas'>{el.armasArr.map((ele, i)=>(
                      <div key={i}>
                          <p><span>Clase:</span> {ele.clase}</p>
                          <p><span>Calibre:</span> {ele.calibre}</p>
                          <p><span>Marca:</span> {ele.marca}</p>
                          <p><span>Modelo:</span> {ele.modelo}</p>
                          <p><span>Matricula:</span> {ele.matricula}</p>

                          <p><span>Folio:</span> {ele.folio}</p>
                          <p><span>Arma Corta:</span> {ele.armasCortas}</p>
                          <p><span>Arma Larga:</span> {ele.armasLargas}</p>
                  </div>       
                  ))}
                  </div>

              </div>


              <button onClick={() => deleteItem(el)}>Borrar</button>
              <button onClick={() => editItem(el)}>Editar</button>
              <button onClick={() => anadirArma(el)}>Añadir Arma</button>

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
              autoComplete="off"
              placeholder="Arma Corta"
              name="armasCortas"
              onChange={handleStateNewArma}
              value={armasCortas}
          />

          {/*<label>Arma Larga</label>*/}
          <input
              type="number"
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


      </div>

  );
}
