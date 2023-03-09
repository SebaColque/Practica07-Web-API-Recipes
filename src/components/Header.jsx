import React, { useContext, useState } from 'react'
import imageFood1 from '../assets/image-food-1.jpg'
import imageFood2 from '../assets/image-food-2.jpg'
import imageFood3 from '../assets/image-food-3.jpg'
import imageFood4 from '../assets/image-food-4.jpg'
import imageFood5 from '../assets/image-food-5.jpg'
import imageFood6 from '../assets/image-food-6.jpg'
import imageFood7 from '../assets/image-food-7.jpg'
import imageFood8 from '../assets/image-food-8.jpg'
import imageFood9 from '../assets/image-food-9.jpg'
import imageFood10 from '../assets/image-food-10.jpg'
import './header.css'
import Carousel from './CarouselImages'
import LanguageContext from '../context/languageContext'

const Header = () => {
    const images = [imageFood1,imageFood2,imageFood3,imageFood4,imageFood5,imageFood6,imageFood7,imageFood8,imageFood9,imageFood10]

    const { texts } = useContext(LanguageContext)

  return (
    <header>
        <div className="title">
            <h1><i>MyRecipes</i></h1>
            <p>{texts.headerSubtitle} 
                <b className='key-words-container'>
                    <b className="key-words">
                        <i>{texts.headerKeyWord1}</i>
                        <i>{texts.headerKeyWord2}</i>
                        <i>{texts.headerKeyWord3}</i>
                        <i>{texts.headerKeyWord1}</i>
                    </b>
                </b>
            </p>
        </div>
        <div className="gallery">
            < Carousel images={images}/>
        </div>
    </header>
  )
}

export default Header