import React from 'react'
import { Button } from 'react-bootstrap'

const HomeSlideContent = ({ key, style, title, content }) => {
  return (
    <div key={key} className='slider-content-title' style={style}>
        <h1>{title}</h1>
        <p>{content}</p>
        <div>
            <Button style={{ backgroundColor: "#C40808", border:"none"}} >Lire l'article</Button>
        </div>
    </div>
  )
}

export default HomeSlideContent