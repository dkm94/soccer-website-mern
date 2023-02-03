import React from 'react';
import "./MainContent.css";

const MainContent = ({ title, children }) => {
  return (
    <div>
    <div>
        <h1 className='mc-title' id='mc-title'>{title}</h1>
    </div>
    <div style={{ backgroundColor: "#FFF"}}>
        {children}
    </div>
    </div>
  )
}

export default MainContent