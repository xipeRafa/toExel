
// import '../style.css';

//import * as XLSX from "xlsx"
import ReactHTMLTableToExcel from "react-html-table-to-excel"


export default function MenuButtons({setError, setMsg, setFinder, items}) {



    const handleAll = () => {

        setError(false)

        if (items.length === 0) {
            setMsg(null)
            setError('No hay Socios Escritos');
            return;
        } else {
            setMsg(`${items.length}, Todos los Socios`);
        }

        setFinder(null)

    }


  
    const handleActive = () => {

        setError(false)

        let check = items.some((el) => el.toggle === true);
  
        if (check) {
            setMsg(`${items.filter((el) => el.toggle === true).length} Socios Activos`)
        } else {
            setMsg(null)
            setError('No hay Socios Activos');
        }

        setFinder(items.filter((el) => el.toggle === true))
    }


  
    const handleCompleted = () => {

        setError(false)

        let check = items.some((el) => el.toggle === false)
  
        if (check) {
            setMsg(`${items.filter((el) => el.toggle === false).length} Socios Inactivos`)
        } else {
            setMsg(null)
            setError('No hay Socios Inactivos');
        }

        setFinder(items.filter((el) => el.toggle === false))
    }





/* -=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=------------------------------Sort----------- */
    const handleSort = () => {

        setError(false)

        if (items.length === 0) {
            setMsg(null)
            setError('No hay Socios Escritos para Ordenar');
            return;
        } else {
            setMsg('Socios de Mayor a Menor por Fecha');
        }

        let copy = [...items]

        setFinder(copy.sort((o1, o2) => o1.id - o2.id))

    }



    const handleUnSort = () => {

        setError(false)

        if (items.length === 0) {
            setMsg(null)
            setError('No hay Socios Escritos para Ordenar');
            return;
        } else {
            setMsg('Socios de Menor a Mayor por Fecha');
        }

        let copy = [...items]

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


    
  // const downloadExcel = (data) => {

  //     let hello = []

  //     data.map(el =>{
  //       delete el.id
  //       delete el.toggle

  //       // el.NoREGCLUB = el.numeroRegistroDelClub
  //       // delete el.numeroRegistroDelClub

  //       hello.unshift(el)
  //     })

  //    console.log(hello)
  //     const worksheet = XLSX.utils.json_to_sheet(data);
  //     const workbook = XLSX.utils.bo9ok_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1") 
  //     //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //     //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  //     XLSX.writeFile(workbook, "DataSheet.xlsx");
  // }



  return (
      <div className='menuButtons'>
          <button onClick={handleAll}>TODOS</button>
          <button onClick={handleActive}>Activos</button>
          <button onClick={handleCompleted}>Inactivos</button>

          <button onClick={handleSort}>Fecha Min to Max</button>
          <button onClick={handleUnSort}>Fecha Max to Min</button>


            <button className='dn' onClick={()=>downloadExcel(items)}>
                Download As Excel
            </button>

               <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>

                <table id="table-to-xls" className='dn'>
                    <tr>
                        <th>Firstname s</th>
                        <th>Lastname s</th>
                        <th>Age s</th>
                    </tr>
                    <tr>
                        <td>Jill cccc</td>
                        <td>Smithccc</td>
                        <td>50 ccc</td>
                    </tr>
                    <tr>
                        <td>Eve fff</td>
                        <td>Jackson fff</td>
                        <td>94 34256</td>
                    </tr>
                </table>


          {/*<button onClick={handleClearComplete}>Clear Completed</button>*/}
      </div>
  );
}
