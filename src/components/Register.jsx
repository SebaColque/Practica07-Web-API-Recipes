import React, { useState } from 'react'
import { helpHtpp } from '../helpers/helpHttp';
import Loader from './Loader';
import { Message } from './Message';
import './register.css'

const initialRegisterForm = {
  email: '',
  password: '',
  name: '',
}

const Register = ({handleChangeLoginRegister, loginDiv, registerDiv, activeRegister, setActiveRegister, activeLogin, setActiveLogin}) => {
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [loading, setLoading] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleChange = (e) => {
    setRegisterForm({
        ...registerForm,
        [e.target.name]: e.target.value
    })
}

const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const options = {
        method: 'POST',
        body: registerForm,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': '0CKQ9ccQff77KsDKMnMGiMlEYreu36gez93bUe3jaQSM1LlyDsTBNlO4O9bjTV7f'
        }
    }
    helpHtpp().post('http://ec2-3-82-93-203.compute-1.amazonaws.com/api/user/create/', options)
        .then(res => {
            if(!res.err){
                setErrorRegister(false);
                setRegistered(true);
                setMessageError('');
                setTimeout(() => {
                  setRegistered(false)
                    setActiveLogin(!activeLogin);
                    setActiveRegister(!activeRegister);
                    loginDiv.current.classList.toggle('no-active');
                    registerDiv.current.classList.toggle('no-active');
                }, 2000)
            } else {
                res.info.then(msg => {
                  console.log(msg);
                  for(let key in msg){
                    if(key === 'email'){
                      const msj = msg[key][0] === 'Enter a valid email address.' ? 'Ingrese un correo válido' : 'El correo ya está registrado';
                      setMessageError('Email: ' + msj)
                      return;
                    } else{
                      const msj = 'La contraseña debe tener al menos 5 caracteres';
                      setMessageError('Contraseña: '+ msj)
                    }
                  }
                })
                setErrorRegister(true);
                setTimeout(() => setErrorRegister(false), 2500)
            }
            setLoading(false);
        })
};

  return (
    <div
      className="register no-active"
      onClick={handleChangeLoginRegister}
      ref={registerDiv}
    >
      <h1>Registrarse</h1>
      {activeRegister && (
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Nombre de Usuario</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre de usuario..."
            value={registerForm.name}
            required
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Correo... (Ej: xxxx@xxxx.xx)"
            value={registerForm.email}
            required
            onChange={handleChange}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña... (Al menos 5 caracteres)"
            value={registerForm.password}
            required
            onChange={handleChange}
          />
          <button>Registrarse</button>
          {loading && <Loader />}
          {errorRegister && <Message description={messageError} />}
          {registered && (
            <Message description={"Registrado con éxito"} error={false} />
          )}
        </form>
      )}
    </div>
  );
}

export default Register