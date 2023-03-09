import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { helpHtpp } from '../helpers/helpHttp';
import Loader from './Loader';
import { Message } from './Message';
import './login.css'
import UserContext from '../context/userContext';
import LanguageContext from '../context/languageContext';

const initialLoginForm = {
    email: '',
    password: ''
}

const Login = ({handleChangeLoginRegister, loginDiv, activeLogin}) => {
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const [loading, setLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);

    const { setUser } = useContext(UserContext);
    const { texts } = useContext(LanguageContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        const options = {
            method: 'POST',
            body: loginForm,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': '0CKQ9ccQff77KsDKMnMGiMlEYreu36gez93bUe3jaQSM1LlyDsTBNlO4O9bjTV7f'
            }
        }
        helpHtpp().post('http://ec2-3-82-93-203.compute-1.amazonaws.com/api/user/token/', options)
            .then(res => {
                if(!res.err){
                    setErrorLogin(false);
                    // console.log(res);
                    setUser(res);
                    localStorage.setItem('tokenUserRecipe', JSON.stringify(res));
                    navigate('/');
                } else{
                    setErrorLogin(true);
                    setTimeout(() => setErrorLogin(false), 4000)
                }
                setLoading(false);
            })
    };

    useEffect(() => {
      const token = localStorage.getItem('tokenUserRecipe');
      if(token){
        setUser(JSON.parse(token));
        navigate('/');
      }
    }, [])

  return (
    <div className="login" onClick={handleChangeLoginRegister} ref={loginDiv}>
      <h1>{texts.loginButton}</h1>
      {activeLogin && (
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email..."
            value={loginForm.email}
            required
            onChange={handleChange}
          />
          <label htmlFor="password">{texts.loginPassword}</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder={`${texts.loginPassword}...`}
            value={loginForm.password}
            required
            onChange={handleChange}
          />
          <button>{texts.loginButton}</button>
          {loading && <Loader />}
          {errorLogin && <Message description={texts.unsuccesLogin} />}
        </form>
      )}
    </div>
  );
}

export default Login