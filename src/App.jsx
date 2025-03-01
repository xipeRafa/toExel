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


     {/*  <JsonToExcel
        title="Download as Excel"
        data={arr}
        fileName="sample-file"
        btnClassName="custom-classname"
      />*/}


     

      {finderState === null
        ? items.sort((a, b) => b.nombreDelSocio - a.nombreDelSocio).map((el, i) => (
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

        : finderState.sort((a, b) => a.nombreDelSocio - b.nombreDelSocio).map((el, i) => (
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
      
    </div>
  );
}

