
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
                    className="download-table-xls-button dn"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS Completo"
                />
                <br/>
                <br />


               

                  
                    {/*<table id="table-to-xls" className='dn' >*/}

{/*<caption>
    Council budget (in £) 2018
</caption>*/}
                   {/* <thead>
                    <tr>
                        <th>N REG CLUB</th>
                        <th>DOMICILIO DEL CLUB</th>

                        <th>NOMBRE DEL SOCIO</th>
                        <th>CURP</th>
                        <th>NO. DE SOCIO</th>
                        <th>DOMICILIO DEL SOCIO</th>

                        <th>CLASE</th>
                        <th>CALIBRE</th>
                        <th>MARCA</th>
                        <th>MODELO</th>
                        <th>MATRICULA</th>
                        <th>FOLIO</th>
                        <th>ARMAS CORTAS</th>
                        <th>ARMAS LARGAS</th>
                    </tr>
                    </thead>

                    <tbody>

                    {items.map((el,i)=>{
              return<tr key={i}>
                        <td>624</td>
                        <td>
                            San Luis Potosi No.<br />
                            158, Col. San<br />
                            Benito, C. P. 83190,<br />
                            Hermosillo<br />
                            Sonora<br />
                        </td>

                        <td>{el.nombreDelSocio}</td>
                        <td>{el.curp}</td>
                        <td>{el.numeroDelSocio}</td>
                        <td>{el.domicilioDelSocio}</td>





                        <td>
                            <tr>{el.clase}</tr>
                            {el.armasArr.map((ele,index)=>(
                               <tr key={index}>{ele.calibre}</tr>
                            ))} 
                        </td>

                        <td>
                            <tr>{el.calibre}</tr>
                            {el.armasArr.map((ele,index)=>{
                                return<tr key={index}>{ele.calibre}</tr>
                            })} 
                        </td>

                        <td>
                            {el.marca}
                            {el.armasArr.map((ele,index)=>{
                                return<tr key={index}>{ele.marca}</tr>
                            })} 
                        </td>

                        <td>
                            {el.modelo}
                            {el.armasArr.map((ele,index)=>{
                                return<tr key={index}>{ele.modelo}</tr>
                            })} 
                        </td>

                        <td>
                            {el.matricula}
                            {el.armasArr.map((ele,index)=>{
                                return<tr key={index}>{ele.matricula}</tr>
                            })} 
                        </td>

                        <td>
                            {el.folio}
                            {el.armasArr.map((ele,index)=>{
                                return<tr key={index}>{ele.folio}</tr>
                            })} 
                        </td>

                        <td>
                            {el.armasCortas}
                            {el.armasArr.map((ele,index)=>{
                                return<tr key={index}>{ele.armasCortas}</tr>
                            })} 
                        </td>
                        <td>
                            {el.armasLargas}
                            {el.armasArr.map((ele,index)=>{
                                return<tr key={index}>{ele.armasLargas}</tr>
                            })} 
                        </td>
                    </tr>  
                         })



                    }</tbody>
*/}


{/*<tfoot>
    <tr>
      <th scope="row">Totals</th>
      <td>21,000</td>
    </tr>
  </tfoot>*/}



                  
                {/*</table>*/}
                   
                


      </div>
  );
}
