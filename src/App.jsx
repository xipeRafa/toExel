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



export default function App() {


  const [state, setState] = useState({
      numeroRegistroDelClub: '',
      domicilioDelClub:'',
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
      armasLargas:''
  })


  const [editMode, setEdit] = useState(null);

  const [arr, setArr] = useLocalStorage();

  const [finderState, setFinder, handleSearch, searchTXT, setSearchTXT] = useFinder(); 

  const [msg, setMsg, setFinderMsg, finderMsg, error, setError] = useMsgs();



  useEffect(()=>{

      if(finderState !== null){

          if(finderState.length===1 && searchTXT.length>3){
              setMsg('Encontrado')
              console.log('true-59') 
          }else{
              setMsg(`${finderState.length} Resultados`)
              console.log('false-62') 
          }

          if(searchTXT.length===0){
              setFinder(null)   
              setMsg(`${arr.length}, Todos las Socios`)
          }

      }

  },[searchTXT])




  return (
    <div>
      

      {finderMsg ? <p className="msg">{finderMsg}</p> : ''}

      <Login />

      <Form
        editMode={editMode}
        error={error}
        msg={msg}
        setArr={setArr}
        arr={arr}
        setMsg={setMsg}
        setFinder={setFinder}
        setError={setError}
        setFinderMsg={setFinderMsg}
        setState={setState}
        state={state}
        setEdit={setEdit}
        setSearchTXT={setSearchTXT}
      />


      <div className='totalesGenerales'>
          <span>Armas Cortas: {arr.filter(el=>el.armasCortas === '1').length}</span>
          <span>Armas Largas: {arr.filter(el=>el.armasLarga === '1').length}</span>

          <span>
              Total de Armas: {arr.filter(el=>el.armasLarga === '1').length + arr.filter(el=>el.armasCortas === '1').length}
          </span>
      </div>

      
      <FinderSearch arr={arr} handleSearch={handleSearch} searchTXT={searchTXT} />
      <br />

      <MenuButtons
        setError={setError}
        setMsg={setMsg}
        setFinder={setFinder}
        arr={arr}
        setArr={setArr}
      />


     {/*  <JsonToExcel
        title="Download as Excel"
        data={arr}
        fileName="sample-file"
        btnClassName="custom-classname"
      />*/}


     

      {finderState === null
        ? arr.sort((a, b) => b.nombreDelSocio - a.nombreDelSocio).map((el, i) => (
            <Item
              key={i}
              i={i}
              setEdit={setEdit}
              setState={setState}
              el={el}
              arr={arr}
              setArr={setArr}
              setFinder={setFinder}
              setMsg={setMsg}
            />
          ))

        : finderState.sort((a, b) => a.nombreDelSocio - b.nombreDelSocio).map((el, i) => (
            <Item
              key={i}
              i={i}
              setEdit={setEdit}
              setState={setState}
              el={el}
              arr={arr}
              setArr={setArr}
              setFinder={setFinder}
              setMsg={setMsg}
            />
          ))
      }



      {arr.length === 0 ? (
          <p className="check">No hay Socios Escritos</p>
      ) : null}
      
    </div>
  );
}

