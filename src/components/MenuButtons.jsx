import React from 'react';
// import '../style.css';





export default function MenuButtons({setError, setMsg, setFinder, arr, setArr}) {



    const handleAll = () => {

        setError(false)

        if (arr.length === 0) {
            setMsg('No hay Socios Escritos');
            return;
        } else {
            setMsg(`${arr.length}, Todos los Socios`);
        }

        setFinder(null)

    }


  
    const handleActive = () => {

        setError(false)

        let check = arr.some((el) => el.toggle === true);
  
        if (check) {
            setMsg(`${arr.filter((el) => el.toggle === true).length} Socios Activos`)
        } else {
            setMsg('No hay Socios Activos');
        }

        setFinder(arr.filter((el) => el.toggle === true))
    }


  
    const handleCompleted = () => {

        setError(false)

        let check = arr.some((el) => el.toggle === false)
  
        if (check) {
            setMsg(`${arr.filter((el) => el.toggle === false).length} Socios Inactivos`)
        } else {
            setMsg('No hay Socios Inactivos');
        }

        setFinder(arr.filter((el) => el.toggle === false))
    }





/* -=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=------------------------------Sort----------- */
    const handleSort = () => {

        setError(false)

        if (arr.length === 0) {
            setMsg('No hay Socios Escritos para Ordenar');
            return;
        } else {
            setMsg('Socios de Mayor a Menor por Fecha');
        }

        let copy = [...arr]

        setFinder(copy.sort((o1, o2) => o1.nombreDelSocio.length - o2.nombreDelSocio.length))

    }



    const handleUnSort = () => {

        setError(false)

        if (arr.length === 0) {
            setMsg('No hay Socios Escritos para Ordenar');
            return;
        } else {
            setMsg('Socios de Menor a Mayor por Fecha');
        }

        let copy = [...arr]

        setFinder(copy.sort((o1, o2) => o2.nombreDelSocio.length - o1.nombreDelSocio.length))

    }






/* -=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=------------------------------clearComplete----------- */

    // const handleClearComplete = () => {

    //     setError(false)

    //     let check = arr.some((el) => el.toggle === true);

    //     if (check) {
    //         setMsg('Las Tareas Completadas se Eliminaron ');
    //     } else {
    //         setMsg('No hay Tareas Completadas para Eliminar');
    //         return;
    //     }

    //     setArr(arr.filter((el) => el.toggle === false))

    //     setFinder(null)
    // }



  return (
      <>
          <button onClick={handleAll}>TODOS</button>
          <button onClick={handleActive}>Activos</button>
          <button onClick={handleCompleted}>Inactivos</button>

          <button onClick={handleSort}>Fecha Min to Max</button>
          <button onClick={handleUnSort}>Fecha Max to Min</button>

          {/*<button onClick={handleClearComplete}>Clear Completed</button>*/}
      </>
  );
}
