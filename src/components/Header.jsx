import React, { useContext, useState } from 'react'
import imageFood1 from '../assets/image-food-1.webp'
import imageFood2 from '../assets/image-food-2.webp'
import imageFood3 from '../assets/image-food-3.webp'
import imageFood4 from '../assets/image-food-4.webp'
import imageFood5 from '../assets/image-food-5.webp'
import imageFood6 from '../assets/image-food-6.webp'
import imageFood7 from '../assets/image-food-7.webp'
import imageFood8 from '../assets/image-food-8.webp'
import imageFood9 from '../assets/image-food-9.webp'
import imageFood10 from '../assets/image-food-10.webp'
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