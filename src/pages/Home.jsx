import React from 'react'
import { Footer } from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'
import NavMenu from '../components/NavMenu'

const Home = () => {

  return (
    <div>
      < NavMenu />

      < Header />
      < Main />
      <Footer/>
    </div>
  )
}

export default Home