import React from 'react'
import wave2 from '../assets/wave-2.svg'
import wave3 from '../assets/wave-3.svg'
import './main.css'
import OptionToDo from './OptionToDo'
import Recipe from './Recipe'
import imageFood1 from '../assets/image-food-1.jpg'

const Main = () => {

  const ingredientes = [
    {name: 'papa'},
    {name: 'carne'},
    {name: 'verdura'},
    {name: 'salsa'},
  ]

  return (
    <main>

      <div className="wave-deco">
        <img src={wave2} alt="wave deco" />
      </div>
      <div className="main-container">
        < OptionToDo title={'Mis recetas'} description={'Lugar donde podes ver todas tus recetas guardadas, hacer búsqueda por filtros y más'} 
            icon={'list'} link={'/my-recipes'} />
        < OptionToDo title={'Crear Receta'} description={'Agregar una nueva receta a tu lista, indicando ingredientes, tiempo, precio, imagen...'} 
            icon={'add_circle'} link={'/create-recipe'}/>
        < OptionToDo title={'Editar receta'} description={'Edita la receta que eligas para poder cambiar cualquier item de la mísma'} 
            icon={'edit'} link={'/my-recipes'} />
      </div>
      <div className="wave-deco bottom">
        <img src={wave3} alt="wave deco" />
      </div>

      <div className="famous-recipes">
        <h2>Algunas recetas populares...</h2>
        < Recipe image={imageFood1} title={'Titulo de Prueba'} time={'45'} 
                  description={'Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.'}
                  price={'450.00'}
                  ingredients={ingredientes}/>
        < Recipe image={imageFood1} title={'Titulo de Prueba'} time={'45'} 
                  description={'Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.'}
                  price={'450.00'}
                  ingredients={ingredientes}/>
        < Recipe image={imageFood1} title={'Titulo de Prueba'} time={'45'} 
                  description={'Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.'}
                  price={'450.00'}
                  ingredients={ingredientes}/>
      </div>
    </main>
  )
}

export default Main