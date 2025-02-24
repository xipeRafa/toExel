
import { useState, useEffect } from 'react';
import './login.css'

export default function Login() {



  const [loginState, setLoginState]=useState({nameLogin:'', passwordLogin:''})

  const { nameLogin, passwordLogin } = loginState

  const handleLogin =(e)=>{
      const {name, value}= e.target
      setLoginState({ ...loginState, [name]:value })
  }

   const [isActiveModal, setIsActiveModal] = useState(true)




   const handlerEntrar=()=>{
      if(nameLogin==='susana' && passwordLogin==='susy123'){
          localStorage.userSocio=nameLogin
          setIsActiveModal(!isActiveModal)
      }else{
          alert('Nombre o Contraseña incorrecto')
      }
   }



    useEffect(()=>{

      if(localStorage.userSocio !== undefined){

          setIsActiveModal(false)

      }

    },[])


  return (
    <modal className={isActiveModal ? ' inModalLogin' : ' outModalLogin'}>


      <h2>ENTRAR</h2>
      <h2>Socios Data Base</h2>

      <input
          className='finder'
          autoComplete="off"
          placeholder="Nombre"
          onChange={(e)=>handleLogin(e)}
          type="text"
          name='nameLogin'
          value={nameLogin}
      />


      <input
          className='Login'
          autoComplete="off"
          placeholder="Contraseña"
          onChange={(e)=>handleLogin(e)}
          type="password"
          name='passwordLogin'
          value={passwordLogin}
      />

      <button className='LoginButton' onClick={handlerEntrar}>Entrar</button>


    </modal>

  );

}

