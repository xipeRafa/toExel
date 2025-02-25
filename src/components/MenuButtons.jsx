
// import '../style.css';

import * as XLSX from "xlsx"



export default function MenuButtons({setError, setMsg, setFinder, arr, setArr}) {



    const handleAll = () => {

        setError(false)

        if (arr.length === 0) {
            setMsg(null)
            setError('No hay Socios Escritos');
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
            setMsg(null)
            setError('No hay Socios Activos');
        }

        setFinder(arr.filter((el) => el.toggle === true))
    }


  
    const handleCompleted = () => {

        setError(false)

        let check = arr.some((el) => el.toggle === false)
  
        if (check) {
            setMsg(`${arr.filter((el) => el.toggle === false).length} Socios Inactivos`)
        } else {
            setMsg(null)
            setError('No hay Socios Inactivos');
        }

        setFinder(arr.filter((el) => el.toggle === false))
    }





/* -=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=------------------------------Sort----------- */
    const handleSort = () => {

        setError(false)

        if (arr.length === 0) {
            setMsg(null)
            setError('No hay Socios Escritos para Ordenar');
            return;
        } else {
            setMsg('Socios de Mayor a Menor por Fecha');
        }

        let copy = [...arr]

        setFinder(copy.sort((o1, o2) => o1.id - o2.id))

    }



    const handleUnSort = () => {

        setError(false)

        if (arr.length === 0) {
            setMsg(null)
            setError('No hay Socios Escritos para Ordenar');
            return;
        } else {
            setMsg('Socios de Menor a Mayor por Fecha');
        }

        let copy = [...arr]

        setFinder(copy.sort((o1, o2) => o2.id - o1.id))

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


    
  const downloadExcel = (data) => {

      let hello = []

      data.map(el =>{
        delete el.id
        delete el.toggle

        // el.NoREGCLUB = el.numeroRegistroDelClub
        // delete el.numeroRegistroDelClub

        hello.unshift(el)
      })

     console.log(hello)
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1") 
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "DataSheet.xlsx");
  }



  return (
      <div className='menuButtons'>
          <button onClick={handleAll}>TODOS</button>
          <button onClick={handleActive}>Activos</button>
          <button onClick={handleCompleted}>Inactivos</button>

          <button onClick={handleSort}>Fecha Min to Max</button>
          <button onClick={handleUnSort}>Fecha Max to Min</button>


            <button onClick={()=>downloadExcel(arr)}>
                Download As Excel
            </button>

          {/*<button onClick={handleClearComplete}>Clear Completed</button>*/}
      </div>
  );
}
