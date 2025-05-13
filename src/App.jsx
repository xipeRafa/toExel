
import './App.css';
import { useEffect, useState } from 'react'
import FinderSearch from './components/FinderSearch.jsx';
import Form from './components/Form.jsx';
import Item from './components/Item.jsx';
import MenuButtons from './components/MenuButtons.jsx';

import Login from './components/auth/Login.jsx';

import useFinder from './hooks/useFinder.jsx';
import useLocalStorage from './hooks/useLocalStorage.jsx';
import useMsgs from './hooks/useMsgs.jsx';



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


   const formateador = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        //timeStyle: "short",
    })

    const milisegundosComoFecha = (milisegundos=0) => {  // '8 de agosto de 2024, 12:08 a.m.'

        return formateador.format(new Date(milisegundos)).toUpperCase()

    }


  // const [arr, setArr] = useLocalStorage();

    const [items, setItems] = useState([]);
console.log(items)
  const itemCollection = collection(firestoreDB, 'sociosCaza')
  


  const [getDB, setGetDB] = useState(true);


  useEffect(() => {

    if(localStorage.userSocio !== undefined){

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
          
      })
      .catch((err) => {
          console.log('Error searching items', err);
      });

      // setTimeout(()=>{
      //     setArr(JSON.parse(localStorage.array)) // refresca la vista
      // },1111)

    
    }

    
  }, [getDB]);




  const [state, setState] = useState({
      nombreDelSocio: '',
      apellidoPaterno: '',
      apellidoMaterno: '',

      curp: '',
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

          if(finderState.length===1 && searchTXT.length>1){
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



// const multiDataSetAnexo = [


//   {
//     columns: [
//       { value: "No. DE REGISTRO", widthPx: 120, style: { alignment: { horizontal: "Center", bold: true } }, }, // width in pixels
//       { value: "NOMBRE SOCIO", widthPx: 120 }, // width in charachters
//       { value: "No. DE SOCIO", widthPx: 120 }, // , widthCh: 120 will check for width in pixels first
//       { value: "ARMAS CORTAS", widthPx: 120 }, // width in pixels
//       { value: "ARMAS LARGAS", widthPx: 120 }, // width in charachters
//       { value: "FECHA ALTA", widthPx: 120 }, // will check for width in pixels first
//     ],
//     data: [
//       ["Johnson", 300070, "Male", "Johnson", 30000, "Male"],
//       ["Monika", 355000, "Female"],
//       ["Konstantina", 20000, "Female"],
//       ["John", 250000, "Male"],
//       ["Josef", 450500, "Male"],
//     ],
//   },


//   {
//     xSteps: 1, // Will start putting cell with 1 empty cell on left most
//     ySteps: 5, //will put space of 5 rows,
//     columns: ["Name", "Department"],
//     data: [
//       ["Johnson", "Finance"],
//       ["Monika", "IT"],
//       ["Konstantina", "IT Billing"],
//       ["John", "HR"],
//       ["Josef", "Testing"],
//     ],
//   },


// ]


 
  const[sliceState, setSliceState]=useState(0)
  let prodByPage = 7;
  const[sliceAlert, setSliceAlert]=useState('')

  const[btnDisplayState, setBtnDisplayState]=useState(true)

let arrAC = []
let arrAL = []
let acc = []
let all = []

items.forEach((obj,index) => {

              arrAC.push(Number(obj.armasArr.filter(el=>el.armasCortas==1).length))
              arrAL.push(Number(obj.armasArr.filter(el=>el.armasLargas==1).length))

              if(obj.armasCortas==1){
                  acc.push(Number(obj.armasCortas))
              }
              if(obj.armasLargas==1){
                  all.push(Number(obj.armasLargas))
              }
})

let totalArmasLargas = all.reduce((a, b) => a + b, 0) + arrAL.reduce((a, b) => a + b, 0)
let totalArmasCortas = acc.reduce((a, b) => a + b, 0) + arrAC.reduce((a, b) => a + b, 0)


 














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
          <span>Armas Cortas: {totalArmasCortas}</span>
          <span>Armas Largas: {totalArmasLargas}</span>

          <span>
              Total de Armas: {totalArmasCortas + totalArmasLargas}
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
        btnDisplayState={btnDisplayState}
        setBtnDisplayState={setBtnDisplayState}
      />

  


  
   


     

      {finderState === null
        ? items.slice(sliceState, sliceState + prodByPage).map((el, i) => (
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
              setBtnDisplayState={setBtnDisplayState}
            />
          ))

        : finderState.slice(sliceState, sliceState + prodByPage).map((el, i) => (
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
              setBtnDisplayState={setBtnDisplayState}
            />
          ))}

<hr />
{

      <div className={btnDisplayState ? '' : ''}>

            <button className={sliceState === 0 ? 'dn' : 'button'} onClick={()=>{
                                                                  if(sliceState > 0){
                                                                      setSliceState(sliceState - prodByPage)
                                                                      //window.scrollTo(0,0)
                                                                    }
                                                                  }
                                                                }>
                                                                    ⇦ Anterior
            </button>  



            <button className={sliceState === prodByPage || sliceState === 0 ? 'dn' : 'button'} onClick={()=>{ 
                                                                                                        setSliceState(0)
                                                                                                        //window.scrollTo(0,0) 
                                                                                                    }
                                                                                                  }>
                                                                                                      ０
            </button>   



            <button className='button' onClick={()=>{ 
                                    if(items.filter(el => el).length > sliceState + prodByPage){
                                        setSliceState(sliceState + prodByPage) 
                                        //window.scrollTo(0,0) 
                                    }else{
                                        setSliceAlert(' No hay mas Socios en esta Lista')
                                        setTimeout(()=>{
                                            setSliceAlert('')
                                        },2500)
                                    }
                                }
                    }>
                        Siguiente ⇨ 
            </button>  


            <span className='sliceAlert'>{sliceAlert}</span>


            <p className='sliceButtonsP'>De: {sliceState + 1} a: {items.length > sliceState + prodByPage ? sliceState + prodByPage : items.length}</p>
            <p className='sliceButtonsP'>Paginas de {prodByPage} Socios. c/u </p>

        </div>

      }



      {items.length === 0 ? (
          <p className="check">No hay Socios Escritos</p>
      ) : null}































































     {/***/}


      
    </div>
  );
}

