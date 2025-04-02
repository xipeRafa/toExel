
// import '../style.css';



import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';

import {
  CellStyleModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  TextFilterModule,
  ValidationModule,
  createGrid,
} from "ag-grid-community";

import {
  ColumnMenuModule,
  ContextMenuModule,
  ExcelExportModule,
} from "ag-grid-enterprise";

ModuleRegistry.registerModules([
  TextFilterModule,
  CellStyleModule,
  ClientSideRowModelModule,
  ExcelExportModule,
  ColumnMenuModule,
  ContextMenuModule,
  ValidationModule /* Development Only */,
]);






export default function MenuButtons({setError, setMsg, setFinder, items, setBtnDisplayState}) {

const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        //timeStyle: "short",
    })

    const milisegundosComoFecha = (milisegundos=0) => {  // '8 de agosto de 2024, 12:08 a.m.'

        return formateador.format(new Date(milisegundos)).toUpperCase()

    }


    

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
        setBtnDisplayState(true)
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
        setBtnDisplayState(false)
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
        setBtnDisplayState(false)
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

        setFinder(copy.sort((o1, o2) => o1.fechaDeInscripcion - o2.fechaDeInscripcion))

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

        setFinder(copy.sort((o1, o2) => o2.fechaDeInscripcion - o1.fechaDeInscripcion))

    }









// excel generator // excel generator // excel generator // excel generator 
// excel generator // excel generator // excel generator // excel generator 




    const gridRef = useRef();



    const [rowData, setRowData] = useState();






// header
  const [columnDefs, setColumnDefs] = useState([
    { 
      field: 'numeroDeRegistroDelClub', width: 10, headerName: 'No. DE REGISTRO',  
      headerClass: 'gold-header', 
      // hearderStyle:{fontWeithg:'Bold'}, 
    },
    {
      field: 'nombreDelSocio', minWidth: 300, headerName: 'NOMBRE SOCIO', headerClass: 'gold-header',
      // cellClassRules: {
      //   greenBackground: (params) => {
      //     return params.value < 23;
      //   },
        // redFont: (params) => {
        //   return params.value < 20;
        // },

      // },
      cellClass: ['greenBackground']
    },
    {
      field: 'numeroDelSocio',
      // minWidth: 100,
      width: 50,
      headerName: 'No. DE SOCIO', headerClass: 'gold-header', border:true,
      // cellClassRules: {
      //   redFont: (params) => {
      //     return params.value === 'United States';
      //   },
      // },
    },
    { 
      field: 'armasCortas',
      width: 50,
      headerName: 'ARMAS CORTAS', headerClass: 'gold-header'
      // valueGetter: 'data.country.charAt(0)',
      // cellClass: ['redFont', 'greenBackground'],
    },
    {
      field: 'armasLargas', width: 50, headerName: 'ARMAS LARGAS', headerClass: 'gold-header'
      // cellClassRules: {
      //   notInExcel: (params) => {
      //     return true;
      //   },
      // },
    },
    { field: 'fechaDeInscripcion', minWidth: 150,  headerName: 'FECHA ALTA', headerClass: 'gold-header' },
  ]);




  // const defaultColDef = useMemo(() => {
  //   return {
  //     cellClassRules: {
  //       darkGreyBackground: (params) => {
  //         return (params.node.rowIndex || 0) % 2 == 0;
  //       },
  //     },
  //     filter: true,
  //     minWidth: 100,
  //     flex: 1,
  //   };
  // }, []);






  const excelStyles = useMemo(() => {
    return [
      {
        id: 'gold-header',
        alignment: {
          vertical: 'Center',
          horizontal: 'Center',
          wrapText: true,
        },
        font: {
          bold:true,
        },
        borders: {
          borderBottom: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 2,
          },
          borderTop: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 2,
          },
          borderLeft: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 2,
          },
          borderRight: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 2,
          },
        },
      },
      {
        id: 'cell',
        alignment: {
          vertical: 'Center',
          horizontal: 'Center'
        },
        borders: {
          borderBottom: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 1,
          },
          borderTop: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 1,
          },
          borderLeft: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 1,
          },
          borderRight: {
            // color: "#ffab00",
            lineStyle: "Continuous",
            weight: 1,
          },
        },
      },
      {
        id: 'greenBackground',
        // interior: {
        //   color: '#b5e6b5',
        //   pattern: 'Solid',
        // },
        alignment: {
          vertical: 'Center',
          horizontal: 'Left'
        },
        font: {
          // color: '#ffffff',
          bold:true
        },
      },
      {
        id: 'redFont',
        font: {
          fontName: 'Calibri Light',
          underline: 'Single',
          italic: true,
          color: '#BB0000',
          bold:true,
        },
      },
      {
        id: 'darkGreyBackground',
        interior: {
          color: '#888888',
          pattern: 'Solid',
        },
        font: {
          fontName: 'Calibri Light',
          color: '#ffffff',
        },
      },
    ]
     }, []);


    const onBtnExportDataAsExcel = (items) => {

            let arrExcel = []

            items.forEach((obj,index) => {

                    let objExcel = {}

                    let ac = Number(obj.armasArr.filter(el=>el.armasCortas==1).length) + Number(obj.armasCortas)
                    let al = Number(obj.armasArr.filter(el=>el.armasLargas==1).length) + Number(obj.armasLargas)

                    objExcel.nombreDelSocio=obj.nombreDelSocio +' '+ obj.apellidoPaterno +' '+ obj.apellidoMaterno
                    objExcel.numeroDelSocio=index+1
                    objExcel.armasCortas=ac
                    objExcel.armasLargas=al
                    objExcel.fechaDeInscripcion=milisegundosComoFecha(obj.fechaDeInscripcion)
                    objExcel.numeroDeRegistroDelClub='624'

                    arrExcel.push(objExcel)

            })

          
            setTimeout(()=>{
                setRowData(arrExcel) 
            },511)

            setTimeout(()=>{
                gridRef.current.api.exportDataAsExcel()
            },1111)

    };








  return (
        <div className='menuButtons'>
                <button onClick={handleAll}>TODOS</button>
                <button onClick={handleActive}>Activos</button>
                <button onClick={handleCompleted}>Inactivos</button>

                <button onClick={handleSort}>Fecha Min to Max</button>
                <button onClick={handleUnSort}>Fecha Max to Min</button>


                <button className='' onClick={()=>onBtnExportDataAsExcel(items)}  >
                        Excel Anexo
                </button>


                <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}

                        //defaultColDef={defaultColDef}
                        excelStyles={excelStyles}
                        //onGridReady={onGridReady}
                />


          
                <br/>
                <br />


               

                    {items.map((el,i)=>{
              return <table key={i} id="table-to-xls" className='dn' style={{marginBottom:'40px'}}>

{/*<caption>
    Council budget (in £) 2018
</caption>*/}
                    <thead>
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
                        <th style={{width:'100px'}}>FOLIO</th>
                        <th>ARMAS CORTAS</th>
                        <th>ARMAS LARGAS</th>
                    </tr>
                    </thead>

                    <tbody>
<tr >
                        <td>624</td>
                        <td>
                            San Luis Potosi No.<br />
                            158, Col. San<br />
                            Benito, C. P. 83190,<br />
                            Hermosillo<br />
                            Sonora<br />
                        </td>

                        <td>{el.apellidoPaterno} {el.apellidoMaterno} {el.nombreDelSocio}</td>
                        <td>{el.curp}</td>
                          <td>{i+1}</td>
                        <td>{el.domicilioDelSocio}</td>

                          



                        <td>
                            <tr>{el.clase}</tr>
                            {el?.armasArr?.map((ele,index)=>(
                               <tr key={index}>{ele.clase}</tr>
                            ))} 
                        </td>

                        <td>
                            <tr>{el?.calibre}</tr>
                            {el?.armasArr?.map((ele,index)=>{
                                return<tr key={index}>{ele.calibre}</tr>
                            })} 
                        </td>

                        <td>
                            <tr>{el?.marca}</tr>
                            {el?.armasArr?.map((ele,index)=>{
                                return<tr key={index}>{ele.marca}</tr>
                            })} 
                        </td>

                        <td>
                            <tr>{el?.modelo}</tr>
                            {el?.armasArr?.map((ele,index)=>{
                                return<tr key={index}>{ele.modelo}</tr>
                            })} 
                        </td>

                        <td>
                            <tr>{el?.matricula}</tr>
                            {el?.armasArr?.map((ele,index)=>{
                                return<tr key={index}>{ele.matricula}</tr>
                            })} 
                        </td>

                        <td>
                            <tr>{el.folio}</tr>
                            {el.armasArr?.map((ele,index)=>{
                                return<tr key={index}>{ele.folio}</tr>
                            })} 
                        </td>

                        <td>
                            <tr>{Number(el.armasCortas)}</tr>
                            {el.armasArr?.map((ele,index)=>{
                                if(ele.armasCortas == 1){
                                    return<tr key={index}>1</tr>
                                }else{
                                    return <tr>0</tr>
                                }
                            })} 
                        </td>
                        <td>
                            <tr>{Number(el.armasLargas)}</tr>
                            {el.armasArr?.map((ele,index)=>{


                                 if(ele.armasLargas == 1){
                                    return<tr key={index}>1</tr>
                                }else{
                                    return <tr>0</tr>
                                }
                            })} 
                        </td>
                            
                        

                    </tr>  
                         



                    </tbody>




    <tr >
         <td> </td>
          <td> </td>
           <td> </td>
            <td> </td>
             <td> </td>
              <td>Total por Persona</td>
               <td> </td>
               <td> </td>
               <td> </td>
               <td> </td>
               <td> </td>
               <td> </td>
       <td>{el.armasArr.reduce((total, item) => Number(item.armasCortas) + total, 0) + Number(el.armasCortas)}</td>
       <td>{el.armasArr.reduce((total, item) => Number(item.armasLargas) + total, 0) + Number(el.armasLargas)} </td>
    </tr>




                  
                </table>
               })}    
    


      </div>
  );
}
