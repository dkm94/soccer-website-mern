import React, { useState } from "react";
import "./ToggleButton.css";

function ToggleButton({ isMod }) {

    const handleToggleClick = () => {
        console.log(isMod);
      };
      
  const btnToggleStyle = {
    background: isMod ? "hsl(109, 63%, 64%)" : "hsl(0, 4%, 69%)",
  };

  return (
    <>
      <div id="toggle" onClick={handleToggleClick} className={`btn-toggle__wrapper ${isMod ? "active" : ""}`} style={btnToggleStyle} >
        <div className="btn-toggle__circle"></div>
      </div>
      <input id="checkboxToggle" type="checkbox" className="hidden" defaultChecked={isMod} />
    </>
  );
}
export default ToggleButton;