import React from 'react'
import './footer.css'

export const Footer = () => {
  return (
      <footer>
        <p>Página hecha por Sebastián Colque utilizando la 
            <a href="http://ec2-3-82-93-203.compute-1.amazonaws.com/api/docs/" target="_blank" rel="noreferrer"
            style={{color:"rgb(185, 155, 107)", fontWeight:"bolder"}}> API </a> 
            creada por Valentín Minolli</p>
        <hr />

        <div className="redes">
          <a href="https://www.linkedin.com/in/sebasti%C3%A1n-colque-20a040180/" target="_blank" rel="noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/sebacolque01" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://github.com/SebaColque" target="_blank" rel="noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <p>sebacolque06@gmail.com</p>
        </div>
      </footer>
  )
}
