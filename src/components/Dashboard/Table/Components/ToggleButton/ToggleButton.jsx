import React, { useState } from "react";
import "./ToggleButton.css";

function ToggleButton({ key, value, selected, onChange }) {

    // const handleToggleClick = () => {
    //     console.log(isMod);
    //   };
      
  const btnToggleStyle = {
    background: selected ? "hsl(109, 63%, 64%)" : "hsl(0, 4%, 69%)",
  };

  return (
    <>
      <div id="toggle" onClick={onChange} className={`btn-toggle__wrapper ${selected ? "active" : ""}`} style={btnToggleStyle} >
        <div className="btn-toggle__circle"></div>
      </div>
      <input id="checkboxToggle" type="checkbox" className="hidden" defaultChecked={selected} />
    </>
  );
}
export default ToggleButton;