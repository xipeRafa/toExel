import React from 'react';



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



  const deleteItem = (EL) => {
      setArr(arr.filter((el) => el.id !== EL.id))
      setFinder(null);
      setMsg('Eliminado: ' + EL.text);
  }


  const toggleItem = (id) => {
      arr.map((el) => (el.id === id ? (el.toggle = !el.toggle) : el))

      arr.find((el) => el.id === id).toggle
          ? setMsg('Marcado como Completado')
          : setMsg('Desmarcado');
  }


  const editItem = (item) => {
      setState(item);
      setEdit(item);
  }





  return (

      <div key={i} className="item">

          <div className={el.toggle ? 'active' : ''}>{el.nombreDelSocio}, {el.text2}</div>

          <button onClick={() => deleteItem(el)}>Delete</button>

          <button onClick={() => editItem(el)}>Edit</button>

          <input className='dn' type="button" id={el.id} onClick={()=> toggleItem(el.id)} />

          <label className='cursor-pointer' htmlFor={el.id}> {el.toggle ? ' Completed' : ' Incomplet' } </label>

      </div>

  );
}
