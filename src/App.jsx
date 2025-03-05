import { useState, useEffect } from 'react';
import './App.css';

import FinderSearch from './components/FinderSearch.jsx';
import Form from './components/Form.jsx';
import Item from './components/Item.jsx';
import MenuButtons from './components/MenuButtons.jsx';

import Login from './components/auth/Login.jsx';

import useFinder from './hooks/useFinder.jsx';
import useLocalStorage from './hooks/useLocalStorage.jsx';
import useMsgs from './hooks/useMsgs.jsx';

// import DownloadExcelAnexo from "./components/btnsExcel/DownloadExcelAnexo.jsx"


import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { firestoreDB } from './firebase/firebaseConfig';








export default function App() {


  // const [arr, setArr] = useLocalStorage();

    const [items, setItems] = useState([]);

  const itemCollection = collection(firestoreDB, 'sociosCaza')
  


  const [getDB, setGetDB] = useState(true);

  useEffect(() => {
     let isMounted = true

     if(isMounted = true){
    getDocs(itemCollection)
      .then((item) => {
          if (item.size === 0) {
              console.log('No results!');
          }

          const documents = item.docs.map((doc) => ({
              idDB: doc.id,
              ...doc.data(),
          }));

          setItems(documents)
          //localStorage.setItem('array', JSON.stringify(documents))
      })
      .catch((err) => {
          console.log('Error searching items', err);
      });

      // setTimeout(()=>{
      //     setArr(JSON.parse(localStorage.array)) // refresca la vista
      // },1111)

    
    }

    isMounted = false
  }, [getDB]);




  const [state, setState] = useState({
      nombreDelSocio: '',
      apellidoPaterno: '',
      apellidoMaterno: '',

      curp: '',
      numeroDelSocio:'',
      domicilioDelSocio: '',

      clase: '',
      calibre:'',
      marca: '',

      modelo: '',
      matricula:'',
      folio: '',

      armasCortas: '',
      armasLargas:'',

      fechaDeInscripcion:0

  })


  const [editMode, setEdit] = useState(null);


  const [finderState, setFinder, handleSearch, searchTXT, setSearchTXT] = useFinder(); 

  const [msg, setMsg, setFinderMsg, finderMsg, error, setError] = useMsgs();



  useEffect(()=>{

      if(finderState !== null){

          if(finderState.length===1 && searchTXT.length>3){
              setMsg('Encontrado')
          }else{
              setMsg(`${finderState.length} Resultados`)
          }

          if(searchTXT.length===0){
              setFinder(null)   
              setMsg(`${items.length}, Todos las Socios`)
          }

      }

  },[searchTXT])

  let ac = []
   let al = []


    items.map(el => {
        el.armasArr.map(el=>{
            if(el.armasCortas === '1'){
                ac.push('corta')
            }

            if(el.armasLargas === '1'){
                al.push('larga')
            }
        })
    })



 const postCollection = collection(firestoreDB, 'sociosCaza');

  const postSocio =(state)=>{
            addDoc(postCollection, state)
                .then(() => {
        
                    //+setToggle(!toggle);
                    console.log('wuuu!!')

                })
                .catch((error) => console.log(error));
  }




    const deleteByIdDB = async (idDB) => {
        
        const aDoc = doc(firestoreDB, 'sociosCaza', idDB)

        try {
            await deleteDoc(aDoc);
            console.log(idDB, 'Fue Eliminado')
        } catch (error) {
            console.error(error);
        }

    }



  const updateByIdDB = async (idDB, obj) => {

      const aDoc = doc(firestoreDB, 'sociosCaza', idDB)

      try {
          await updateDoc(aDoc, obj)
      } catch (error) {
          console.error(error);
      }

  }



// console.log(items.sort(function(a, b) {
//     if (a.apellidoPaterno > b.apellidoPaterno) {
//         return 1;
//     } else if (a.apellidoPaterno < b.apellidoPaterno) {
//         return -1;
//     }
// })


  items.sort((a, b) => {
          const result = a.nombreDelSocio.localeCompare(b.nombreDelSocio);

          return result === 0 ? result : a.apellidoPaterno.localeCompare(b.apellidoPaterno);
        })




const multiDataSetAnexo = [


  {
    columns: [
      { value: "No. DE REGISTRO", widthPx: 120, style: { alignment: { horizontal: "center", bold: true } }, }, // width in pixels
      { value: "NOMBRE SOCIO", widthPx: 120 }, // width in charachters
      { value: "No. DE SOCIO", widthPx: 120 }, // , widthCh: 120 will check for width in pixels first
      { value: "ARMAS CORTAS", widthPx: 120 }, // width in pixels
      { value: "ARMAS LARGAS", widthPx: 120 }, // width in charachters
      { value: "FECHA ALTA", widthPx: 120 }, // will check for width in pixels first
    ],
    data: [
      ["Johnson", 300070, "Male", "Johnson", 30000, "Male"],
      ["Monika", 355000, "Female"],
      ["Konstantina", 20000, "Female"],
      ["John", 250000, "Male"],
      ["Josef", 450500, "Male"],
    ],
  },


  // {
  //   xSteps: 1, // Will start putting cell with 1 empty cell on left most
  //   ySteps: 5, //will put space of 5 rows,
  //   columns: ["Name", "Department"],
  //   data: [
  //     ["Johnson", "Finance"],
  //     ["Monika", "IT"],
  //     ["Konstantina", "IT Billing"],
  //     ["John", "HR"],
  //     ["Josef", "Testing"],
  //   ],
  // },


]

// items.map(obj=>{
//   console.log(Object.values(obj))
// })

// multiDataSetAnexo[0].data = ['Johnson 1', 30000, 'Male 1']
// console.log(multiDataSetAnexo)







  return (
    <div>
      

      {finderMsg ? <p className="msg">{finderMsg}</p> : ''}

      <Login />

      <Form
        editMode={editMode}
        error={error}
        msg={msg}
        // setArr={setArr}
        // arr={arr}
        items={items}
        setMsg={setMsg}
        setFinder={setFinder}
        setError={setError}
        setFinderMsg={setFinderMsg}
        setState={setState}
        state={state}
        setEdit={setEdit}
        setSearchTXT={setSearchTXT}
        postSocio={postSocio}
        setGetDB={setGetDB}
        getDB={getDB}
        updateByIdDB={updateByIdDB}
      />


      <div className='totalesGenerales'>
          <span>Armas Cortas: {items.filter(el=>el.armasCortas === '1').length + ac.length}</span>
          <span>Armas Largas: {items.filter(el=>el.armasLargas === '1').length + al.length}</span>

          <span>
              Total de Armas: {items.filter(el=>el.armasLargas === '1').length + items.filter(el=>el.armasCortas === '1').length + ac.length + al.length}
          </span>
      </div>


      <FinderSearch items={items} handleSearch={handleSearch} searchTXT={searchTXT} />
      <br />

      <MenuButtons
        setError={setError}
        setMsg={setMsg}
        setFinder={setFinder}
        // arr={arr}
        // setArr={setArr}
        items={items}
      />


  
       {/*<DownloadExcelAnexo multiDataSetAnexo={multiDataSetAnexo} />*/}



     

      {finderState === null
        ? items.map((el, i) => (
            <Item
              key={i}
              i={i}
              setEdit={setEdit}
              setState={setState}
              state={state}
              el={el}
              // arr={arr}
              // setArr={setArr}
              setFinder={setFinder}
              setMsg={setMsg}
              deleteByIdDB={deleteByIdDB}
              setGetDB={setGetDB}
              getDB={getDB}
              updateByIdDB={updateByIdDB}
              items={items}
            />
          ))

        : finderState.map((el, i) => (
            <Item
              key={i}
              i={i}
              setEdit={setEdit}
              setState={setState}
              state={state}
              el={el}
              // arr={arr}
              // setArr={setArr}
              setFinder={setFinder}
              setMsg={setMsg}
              deleteByIdDB={deleteByIdDB}
              setGetDB={setGetDB}
              getDB={getDB}
              updateByIdDB={updateByIdDB}
              items={items}
            />
          ))
      }



      {items.length === 0 ? (
          <p className="check">No hay Socios Escritos</p>
      ) : null}































































     {/***/}


      
    </div>
  );
}

