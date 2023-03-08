import React, { useRef, useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import './loginPage.css'

const LoginPage = () => {
    const [activeLogin, setActiveLogin] = useState(true);
    const [activeRegister, setActiveRegister] = useState(false);

    const loginDiv = useRef();
    const registerDiv = useRef();

    const handleChangeLoginRegister = e => {
        if(!e.target.classList.contains('no-active')) return;

        setActiveLogin(!activeLogin);
        setActiveRegister(!activeRegister);
        loginDiv.current.classList.toggle('no-active');
        registerDiv.current.classList.toggle('no-active');
    }

  return (
    <div className='login-page-container'>

        <div className="login-register-container">
            < Login handleChangeLoginRegister={handleChangeLoginRegister} loginDiv={loginDiv} activeLogin={activeLogin} />
            < Register handleChangeLoginRegister={handleChangeLoginRegister} loginDiv={loginDiv} registerDiv={registerDiv} activeRegister={activeRegister}
                setActiveRegister={setActiveRegister} activeLogin={activeLogin} setActiveLogin={setActiveLogin}/>
        </div>

    </div>
  )
}

export default LoginPage