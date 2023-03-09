import React, { useContext, useEffect, useRef, useState } from 'react'
import './recipe.css'
import noImage from '../assets/no-image.jpg'
import { helpHtpp } from '../helpers/helpHttp';
import UserContext from '../context/userContext';
import CreateRecipe from '../pages/CreateRecipe';
import Modal from './Modal'
import { useModal } from '../hooks/useModal'
import LanguageContext from '../context/languageContext';

const Recipe = ({image=noImage, title, time, description, price, ingredients, id, setEdited}) => {
    const [isOpenRecipe, openModalRecipe, closeModalRecipe] = useModal(false);
    const [toEdit, setToEdit] = useState(false)

    const { user } = useContext(UserContext);
    const { texts } = useContext(LanguageContext)

    const recipeDiv = useRef();
    const recipeHr = useRef();

    image ? image : image = noImage;

    const handleRemove = e => {
        const id = e.target.id;
        const TOKEN = user.token;

        const options = {
            headers: {
                'accept': '*/*',
                'Authorization': `Token ${TOKEN}`,
                'X-CSRFTOKEN': '31vSHf1OHopCIFJIFy2C7jX7w2RC8RJhCyOdshShCZahZYrwwD9xCSqxmKOrYGAi',
            }
        }
        helpHtpp().del(`http://ec2-3-82-93-203.compute-1.amazonaws.com/api/recipe/recipes/${id}/`, options)    

        recipeDiv.current.remove();
        recipeHr.current.remove();
    }

    const handleEdit = e => {
        openModalRecipe();
        setToEdit(true)
    }

  return (
    <>
    <div className='recipe' ref={recipeDiv}>
        <div className="image">
            <img src={image} alt="imagen de la receta" />
        </div>
        <div className="info">
            <div className="title">
                <h3>{title}</h3>
                <p>{time} min.</p>
                <span className="material-symbols-outlined">
                    schedule
                </span>
            </div>
            <div className="description">
                <p>{description}</p>
            </div>
            <div className="price">
                <div className='price-div'>
                    <p>{price}</p>
                    <span className="material-symbols-outlined">
                        attach_money
                    </span>
                </div>
                {id && 
                    <div>
                        {/* <button className='btn-view-recipe' id={id} onClick={openModalRecipe}>Ver receta</button> */}
                        <button className='btn-recipe edit' id={id} onClick={handleEdit}>{texts.editRecipeButton}</button>
                        <button className='btn-recipe remove' id={id} onClick={handleRemove}>{texts.deleteRecipeButton}</button>
                    </div>
                }
            </div>
        </div>
        <div className="ingredients">
            <div>
                <hr />
            </div>
            <div className='ingr'>
                <h4>{texts.recipeIngredients}</h4>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    <hr className='hr-recipe' ref={recipeHr} />

    {toEdit && 
        < Modal isOpen={isOpenRecipe} closeModal={closeModalRecipe} setEdited={setEdited}>
            < CreateRecipe title={title} time={time} description={description} price={price} 
                                ingredients={ingredients} id={id} setEdited={setEdited}/>
        </Modal>
    }

    {/* < Modal isOpen={isOpenRecipe} closeModal={closeModalRecipe}>

        <div className='modal-recipe'>
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="info">
                <div className="title">
                    <h3>{title}</h3>
                    <p>{time} min.</p>
                    <span className="material-symbols-outlined">
                        schedule
                    </span>
                </div>
                <div className="description">
                    <p>{description}</p>
                </div>
                <div className="price">
                    <div className='price-div'>
                        <p>{price}</p>
                        <span className="material-symbols-outlined">
                            attach_money
                        </span>
                    </div>
                </div>
            </div>
            <div className="ingredients">
                <div>
                    <hr />
                </div>
                <div className='ingr'>
                    <h4>Ingredientes</h4>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    </Modal> */}
    </>
  )
}

export default Recipe