import React, { useContext, useState } from 'react'
import LanguageContext from '../context/languageContext';
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

  const { texts } = useContext(LanguageContext);

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
                }, 1000)
            } else {
                res.info.then(msg => {
                  console.log(msg);
                  for(let key in msg){
                    if(key === 'email'){
                      // console.log(msg[key][0])
                      // const msj = msg[key][0] === 'Enter a valid email address.' ? 'Ingrese un correo válido' : 'El correo ya está registrado';
                      let msj;
                      if(msg[key][0] === 'Enter a valid email address.'){
                         msj = texts.invalidEmail
                      } else if(msg[key][0] === 'user with this email already exists.'){
                         msj = texts.emailAlreadyExists
                      }
                      setMessageError('Email: ' + msj)
                      return;
                    } else{
                      const msj = 'La contraseña debe tener al menos 5 caracteres';
                      setMessageError(`${texts.loginPassword}: `+ msj)
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
      <h1>{texts.registerButton}</h1>
      {activeRegister && (
        <form onSubmit={handleRegister}>
          <label htmlFor="name">{texts.loginUserName}</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={`${texts.loginUserName}...`}
            value={registerForm.name}
            required
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email... (Ej: xxxx@xxxx.xx)"
            value={registerForm.email}
            required
            onChange={handleChange}
          />
          <label htmlFor="password">{texts.loginPassword}</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder={texts.passwordMinLength}
            value={registerForm.password}
            required
            onChange={handleChange}
          />
          <button>{texts.registerButton}</button>
          {loading && <Loader />}
          {errorRegister && <Message description={messageError} />}
          {registered && (
            <Message description={texts.successfullyRegistered} error={false} />
          )}
        </form>
      )}
    </div>
  );
}

export default Register