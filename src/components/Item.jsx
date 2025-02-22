import React from 'react';
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


 const [isActiveModal, setIsActiveModal] = useState(true)



  const deleteItem = (EL) => {

      if (window.confirm("Quieres Borrar a este Socio")) {
          setIsActiveModal(!isActiveModal)
          setArr(arr.filter((el) => el.id !== EL.id))
          setFinder(null);
          setMsg('Eliminado: ' + EL.nombreDelSocio);
      }   
      
  }


  const toggleItem = (id, nombre) => {

      if (window.confirm("Cambiar")) {

          arr.map((el) => (el.id === id ? (el.toggle = !el.toggle) : el))

          arr.find((el) => el.id === id).toggle
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





  return (

      <div key={i} className="item">

          <div className={!el.toggle ? 'active' : ''} onClick={() => setIsActiveModal(!isActiveModal)}>{el.nombreDelSocio}</div>

     


          <modal className={!isActiveModal ? 'detallesContent inModal' : 'detallesContent outModal'}>

              <button className='btnCerrarModal' onClick={() => setIsActiveModal(!isActiveModal)}>Cerrar ✕</button>

              <div className='modalContent'>

                  <div>
                      <p className='name'>{el.nombreDelSocio} </p>
                      <p><span>CURP:</span> {el.curp}</p>
                      <p><span>Numero:</span> {el.numeroDelSocio}</p>

                      <p><span>Domicilio:</span> {el.domicilioDelSocio}</p>
                      <p><span>Clase:</span> {el.clase}</p>
                      <p><span>Calibre:</span> {el.calibre}</p>
                  </div> 

                  <div>
                      <p><span>Marca:</span> {el.marca}</p>
                      <p><span>Modelo:</span> {el.modelo}</p>
                      <p><span>Matricula:</span> {el.matricula}</p>

                      <p><span>Folio:</span> {el.folio}</p>
                      <p><span>Armas Cortas:</span> {el.armasCortas}</p>
                      <p><span>Armas Largas:</span> {el.armasLargas}</p>
                  </div>

              </div>


              <button onClick={() => deleteItem(el)}>Borrar</button>
              <button onClick={() => editItem(el)}>Editar</button>
              <input className='dn' type="button" id={el.id} onClick={()=> toggleItem(el.id, el.nombreDelSocio)} />
              <label className='labelItemToggle' htmlFor={el.id}> {!el.toggle ? 'Inactivo' : ' Activo' } </label>

          </modal>

      </div>

  );
}
