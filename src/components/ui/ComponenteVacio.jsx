import Link from 'next/link'
import React from 'react'
import "../../styles/Vacio.css"; 

const ComponenteVacio = ({mensaje, link, button}) => {
  return (
        <div className="mis-reservas">
        <div className="container">
          <div className="empty-state">
            <p>{mensaje}</p>
            <Link href={`/${link}`} className="browse-button">
              {button}
            </Link>
          </div>
        </div>
      </div>
  )
}

export default ComponenteVacio