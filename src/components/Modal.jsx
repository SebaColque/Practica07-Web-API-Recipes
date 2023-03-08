import { useContext } from 'react'
// import ThemeContext from '../context/ThemeContext'
import './Modal.css'

const Modal = ({children, isOpen, closeModal}) => {
    const handleModalContainerClick = e => e.stopPropagation()
    // const {theme} = useContext(ThemeContext)

  return (
        <article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
            <div className={`modal-container`} onClick={handleModalContainerClick}>
                <button className="modal-close" onClick={closeModal}>X</button>
                {children}
            </div>
        </article>
        )
}

export default Modal;
