import React, { useContext } from 'react'
import wave2 from '../assets/wave-2.svg'
import wave3 from '../assets/wave-3.svg'
import './main.css'
import OptionToDo from './OptionToDo'
import Recipe from './Recipe'
import imageFood1 from '../assets/image-food-1.jpg'
import LanguageContext from '../context/languageContext'

const Main = () => {

  const { texts } = useContext(LanguageContext);

  const ingredientes = [
    {name: 'dolore'},
    {name: 'laboris'},
    {name: 'pariatur'},
    {name: 'mollit'},
  ]

  return (
    <main>

      <div className="wave-deco">
        <img src={wave2} alt="wave deco" />
      </div>
      <div className="main-container">
        < OptionToDo title={texts.navMyRecipes} description={texts.mainMyRecipesDescription} 
            icon={'list'} link={'/my-recipes'} />
        < OptionToDo title={texts.navCreateRecipe} description={texts.mainCreateRecipeDescription} 
            icon={'add_circle'} link={'/create-recipe'}/>
        < OptionToDo title={texts.createEditRecipeButton} description={texts.mainEditRecipeDescription} 
            icon={'edit'} link={'/my-recipes'} />
      </div>
      <div className="wave-deco bottom">
        <img src={wave3} alt="wave deco" />
      </div>

      <div className="famous-recipes">
        <h2>{texts.mainFamouseRecipes}</h2>
        < Recipe image={imageFood1} title={'Lorem laboris dolore'} time={'45'} 
                  description={'Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.'}
                  price={'450.00'}
                  ingredients={ingredientes}/>
        < Recipe image={imageFood1} title={'Lorem laboris dolore'} time={'45'} 
                  description={'Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.'}
                  price={'450.00'}
                  ingredients={ingredientes}/>
        < Recipe image={imageFood1} title={'Lorem laboris dolore'} time={'45'} 
                  description={'Lorem laboris dolore laboris velit proident adipisicing sunt fugiat ipsum mollit dolor.'}
                  price={'450.00'}
                  ingredients={ingredientes}/>
      </div>
    </main>
  )
}

export default Main