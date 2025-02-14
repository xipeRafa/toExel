import React from 'react';
// import '../style.css';

export default function MenuButtons({setError,setMsg,setFinder,arr,setArr}) {

    const handleAll = () => {
      setError(false);
      if (arr.length === 0) {
        setMsg('No hay Tareas Escritas');
        return;
      } else {
        setMsg('Todas las Tareas');
      }
      setFinder(null);
    };
  
    const handleActive = () => {
      setError(false);
      let check = arr.some((el) => el.toggle === false);
  
      if (check) {
        setMsg('Tareas Activas');
      } else {
        setMsg('No hay Tareas Activas');
      }
      setFinder(arr.filter((el) => el.toggle === false));
    };
  
    const handleCompleted = () => {
      setError(false);
      let check = arr.some((el) => el.toggle === true);
  
      if (check) {
        setMsg('Tareas Completadas');
      } else {
        setMsg('No hay Tareas Completadas');
      }
      setFinder(arr.filter((el) => el.toggle === true));
    };

      /* -=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=------------------------------Sort----------- */
  const handleSort = () => {
    setError(false);
    if (arr.length === 0) {
      setMsg('No hay Tareas Escritas para Ordenar');
      return;
    } else {
      setMsg('Tareas de Mayor a Menor');
    }

    let copy = [...arr];
    setFinder(copy.sort((o1, o2) => o1.text.length - o2.text.length));
  };

  const handleUnSort = () => {
    setError(false);
    if (arr.length === 0) {
      setMsg('No hay Tareas Escritas para Ordenar');
      return;
    } else {
      setMsg('Tareas de Menor a Mayor');
    }

    let copy = [...arr];
    setFinder(copy.sort((o1, o2) => o2.text.length - o1.text.length));
  };
  /* -=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=------------------------------clearComplete----------- */

  const handleClearComplete = () => {
    setError(false);
    let check = arr.some((el) => el.toggle === true);

    if (check) {
      setMsg('Las Tareas Completadas se Eliminaron ');
    } else {
      setMsg('No hay Tareas Completadas para Eliminar');
      return;
    }

    setArr(arr.filter((el) => el.toggle === false));
    setFinder(null);
  };

  return (
    <>
      <button onClick={handleAll}>Show All</button>
      <button onClick={handleActive}>Active</button>
      <button onClick={handleCompleted}>Completed</button>

      <button onClick={handleSort}>Min to Max</button>
      <button onClick={handleUnSort}>Max to Min</button>
      <button onClick={handleClearComplete}>Clear Completed</button>
    </>
  );
}
