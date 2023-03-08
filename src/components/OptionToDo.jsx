import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/userContext'
import './optionToDo.css'

const OptionToDo = ({title, description, icon, link}) => {
  const { user } = useContext(UserContext);

  return (
    <div className='option-to-do'>
        <h3>{title.toUpperCase()}</h3>
        <p>{description}</p>
        <Link to={`${user ? link : '/login'}`} className='link-to'>
          <span className="material-symbols-outlined">
            {icon}
          </span>
        </Link>
    </div>
  )
}

export default OptionToDo