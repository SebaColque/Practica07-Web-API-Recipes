import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import './NavMenu.css';

const NavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const handleMenuResponsive = (e) => {
        if(e.target.innerText === 'menu'){
            setMenuOpen(true);
            return;
        }
        setMenuOpen(false);
    }

    const handleLogOut = () => {
        localStorage.removeItem('tokenUserRecipe');
        window.location.reload();
    }

  return (
    <div style={{position:"sticky", top:"-1px", zIndex:"999"}}>
        <nav className='nav-menu'>
            <div className="logo">
                < Link to="/" activeclassname='active'>
                <span className="material-symbols-outlined logo">
                    restaurant
                </span>
                </Link>
            </div>
            <div className={`links-menu ${menuOpen && 'responsive-menu'}`} >
                < NavLink to="/" activeclassname='active' onClick={handleMenuResponsive}>
                    <i>Inicio</i>
                </NavLink>
                {user &&
                    < NavLink to="/my-recipes" activeclassname='active' onClick={handleMenuResponsive}>
                        <i>Mis Recetas</i>
                    </NavLink>
                }
                {user &&
                    < NavLink to="/create-recipe" activeclassname='active' onClick={handleMenuResponsive}>
                        <i>Crear Receta</i>
                    </NavLink>
                }
                <span className={`material-symbols-outlined close-menu`} onClick={handleMenuResponsive}>
                    close
                </span>
                {/* <div className='theme-btns'>
                    <span className={`material-symbols-outlined btn-theme`}>
                        dark_mode
                    </span>
                </div> */}
                {!user &&
                    <span className="material-symbols-outlined btn-logout" onClick={() => navigate('/login')}>
                        account_circle
                    </span>
                }
                {user && 
                    <span className="material-symbols-outlined btn-logout" onClick={handleLogOut}>
                        logout
                    </span>
                }
            </div>
            <span className="material-symbols-outlined btn-menu" onClick={handleMenuResponsive}>
                menu
            </span>
        </nav>
    </div>
  )
}

export default NavMenu;