import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LanguageContext from '../context/languageContext';
import UserContext from '../context/userContext';
import './NavMenu.css';
import esFlag from '../assets/es.png'
import enFlag from '../assets/en.png'

const NavMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const { user } = useContext(UserContext);
    const { texts, handleLanguage } = useContext(LanguageContext);

    const navigate = useNavigate();

    const imgLangauge = useRef();

    const handleMenuResponsive = (e) => {
        if(e.target.innerText === 'menu'){
            setMenuOpen(true);
            return;
        }
        setMenuOpen(false);
    }

    const handleChangeLanguage = e => {
        console.log(e.target.dataset.language)
        handleLanguage(e);
        if(e.target.dataset.language === 'en'){
            e.target.dataset.language = 'es'
            e.target.src = enFlag
        } else {
            e.target.dataset.language = 'en'
            e.target.src = esFlag
        }

    }

    const handleLogOut = () => {
        localStorage.removeItem('tokenUserRecipe');
        window.location.reload();
    }

    useEffect(() => {
        const language = window.localStorage.getItem('recipeLanguage');
        if(language === 'en'){
            imgLangauge.current.dataset.language = 'es'
            imgLangauge.current.src = enFlag
        } else {
            imgLangauge.current.dataset.language = 'en'
            imgLangauge.current.src = esFlag
        }
    }, [])

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
                    <i>{texts.navHome}</i>
                </NavLink>
                {user &&
                    < NavLink to="/my-recipes" activeclassname='active' onClick={handleMenuResponsive}>
                        <i>{texts.navMyRecipes}</i>
                    </NavLink>
                }
                {user &&
                    < NavLink to="/create-recipe" activeclassname='active' onClick={handleMenuResponsive}>
                        <i>{texts.navCreateRecipe}</i>
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
                <img src={esFlag} alt="idioma" className='language-flag' data-language='en' onClick={handleChangeLanguage} ref={imgLangauge} />

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