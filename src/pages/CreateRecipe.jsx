import React, { useContext, useEffect, useRef, useState } from 'react'
import NavMenu from '../components/NavMenu'
import DragAndDrop from '../components/DragAndDrop'
import './createRecipe.css'
import UserContext from '../context/userContext'
import { helpHtpp } from '../helpers/helpHttp'
import bookGif from '../assets/book-recipe-unscreen.gif'

const initialForm = {
    title: '',
    time_minutes: '',
    price: '',
    link: '',
    tags: [],
    ingredients: [],
    description: '',
    image: null,
}



const CreateRecipe = ({title, time, description, price, ingredients, id, setEdited}) => {
    // const initialFormData = new FormData();
    // const [formData, setFormData] = useState(initialFormData);

    const [form, setForm] = useState(initialForm);
    // console.log(id)
    // if(id) console.log(id)
    // console.log(ingredients)
    // if(ingredients) console.log(ingredients)
    
    const [sended, setSended] = useState(false);
    // const [image, setImage] = useState(null);
    // const [imageRecipe, setImageRecipe] = useState(null);
    // const [uploadedImage, setUploadedImage] = useState(null);
    // const [titleDragDrop, setTitleDragDrop] = useState('');

    const ingredientList = useRef();

    const { user } = useContext(UserContext);
    const TOKEN = user.token;

    // const uploadFile = (file) => {
    //     if(file.length >= 2){
    //         setTitleDragDrop('Debe ser una única imagen!')
    //         return;
    //     }

    //     if(file[0].type.split('/')[0] !== 'image') {
    //         setTitleDragDrop('Debe ser una imagen!')
    //         return;
    //     }

    //     const objectURL = URL.createObjectURL(file[0])
    //     console.log(objectURL)
    //     setImageRecipe(objectURL);

    //     // const reader = new FileReader();

    //     // reader.addEventListener('load', () => {
    //     //     const content = reader.result;
    //     //     setImageRecipe(content);
    //     //     setUploadedImage(content);
    //     // });

    //     // reader.readAsDataURL(file[0])
    // }
    
    // useEffect(() => {
    //     if(image) uploadFile(image);
    // }, [image])

    // useEffect(() => {

    //     if(imageRecipe){
    //         console.log(imageRecipe)
    //         setForm({
    //             ...form,
    //             image: imageRecipe
    //         })
    //     }
    // }, [imageRecipe])
    
    const handleRemoveIngredient = e => {
        const value = e.target.previousSibling.value;
        e.target.previousSibling.remove();
        e.target.remove()

        const ingredients = [...form.ingredients].filter(ing => ing.name !== value);

        setForm({
            ...form,
            ingredients
        })

    }

    const handleAddIngredient = () => {
            const ingredient = document.createElement('input');
            ingredient.type = 'text';
            ingredient.name = 'ingredient';
            ingredient.onchange = handleChange;
    
            const button = document.createElement('button');
            button.innerText = 'X';
            button.onclick = handleRemoveIngredient;
    
            ingredientList.current.appendChild(ingredient);
            ingredientList.current.appendChild(button)
    }

    useEffect(() => {
        setForm(initialForm)
        if(id){
            form.title = title;
            form.time_minutes = time;
            form.price = price;
            form.ingredients = ingredients;
            form.description = description;
            setForm(form);
        } else{
            setForm(initialForm);
        }

        if(ingredients){
            ingredients.forEach(ingr => {
                
                const ingredient = document.createElement('input');
                ingredient.type = 'text';
                ingredient.name = 'ingredient';
                ingredient.onchange = handleChange;
                ingredient.value = ingr.name;
    
                const button = document.createElement('button');
                button.innerText = 'X';
                button.onclick = handleRemoveIngredient;
    
                ingredientList.current.appendChild(ingredient);
                ingredientList.current.appendChild(button)
            });
            setForm({
                ...form,
                ingredients
            }) 
            // return;
        } else{
            setForm({
                ...form,
                ingredients: []
            });
        }

    }, [])

    const handleChange = e => {
        if(e.target.name === 'ingredient'){
            const ingredients = [...form.ingredients];
            ingredients.push({'name' : e.target.value});
            setForm({
                ...form,
                ingredients
            })
            return;
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const createRecipe =  async (url, put=false) => {
        
        const options = {
            method: 'POST',
            body: form,
            headers: {
                'accept': 'application/json',
                'Authorization': `Token ${TOKEN}`,
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': '31vSHf1OHopCIFJIFy2C7jX7w2RC8RJhCyOdshShCZahZYrwwD9xCSqxmKOrYGAi',
            }
        }
        
        if(!put){
            helpHtpp().post(url, options)
                .then(res => {
                    if(!res.err){
                        setSended(true);
                    }
                })
        } else {
            helpHtpp().put(url, options)
                .then(res => {
                    if(!res.err){
                        setSended(true);
                    }
                })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(!id) createRecipe('http://ec2-3-82-93-203.compute-1.amazonaws.com/api/recipe/recipes/')
        else createRecipe(`http://ec2-3-82-93-203.compute-1.amazonaws.com/api/recipe/recipes/${id}/`, true)

        setTimeout(() => {
            setForm(initialForm)
            e.target.reset()
            setSended(false);
            if(id) setEdited(true)
        }, 3000)
    }

  return (
    <>
        {!id && < NavMenu />}
        <form className='recipe-form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Nombre:</label>
                <input type="text" name='title' id='title' placeholder="Nombre de la receta" required onChange={handleChange}
                          defaultValue={title ? title : ''}/>
            </div>
            <hr />
            <div>
                <label htmlFor="time_minutes">Timpo de preparación (minutos):</label>
                <input type="number" name='time_minutes' id='time_minutes' min='0' max='9999' required onChange={handleChange}
                        placeholder='Tiempo' defaultValue={time ? time : ''}/>
            </div>
            <hr />
            <div>
                <label htmlFor="price">Precio (USD):</label>
                <input type="number" name='price' id='price' min='0' max='999' required onChange={handleChange}
                        placeholder='USD' defaultValue={price ? price : ''}/>
            </div>
            <hr />
            <div>
                <label htmlFor="description">Descripción</label>
                <textarea maxLength='255' name="description" id="description" cols="80" rows="10" placeholder="Descripción de la receta" 
                onChange={handleChange} defaultValue={description ? description : ''}></textarea>
            </div>
            <hr />
            <div className='ingredients-div'>
                <label htmlFor="ingredients">Ingredientes</label>
                <div className='add-ingredient'>
                    <span className="material-symbols-outlined add" onClick={handleAddIngredient}>
                        add_circle
                    </span>
                <ul ref={ingredientList}></ul>
                </div>
            </div>
            {/* <hr /> */}
            {/* <div>
                <label htmlFor="link">Link:</label>
                <input type="text" name='link' id='link' placeholder='Opcional'onChange={handleChange}/>
            </div> */}
            {/* <hr />
            <div>
                <input type="file" accept='image/*' name='image' id='image' onChange={handleChange}/>
            </div> */}
            <hr />
            <div>
                {!id && <button type="submit" className='btn-submit'>Crear receta</button>}
                {id && <button type="submit" className='btn-submit'>Editar receta</button>}
            </div>
        </form>
        {sended && 
            <div className='sended' onClick={() => setSended(false)}>
                <img src={bookGif} alt="enviado" />
                {!id && <h3>Receta Creada!</h3>}
                {id && <h3>Receta Editada!</h3>}
            </div>
        }
        {/* < DragAndDrop setImage={setImage} titleDragDrop={titleDragDrop} setTitleDragDrop={setTitleDragDrop}/>
        {uploadedImage && <img src={uploadedImage} alt='img cargada'/>} */}
    </>
  )
}

export default CreateRecipe