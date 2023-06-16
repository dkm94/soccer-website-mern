/* eslint-disable no-unused-vars */
import React from 'react';
import { useTheme } from '@material-ui/core';
import './ToggleButton.css';

function ToggleButton({ value, selected, onChange }) {
  const { palette } = useTheme();

  const btnToggleStyle = {
    background: selected ? palette.green.light : 'hsl(0, 4%, 69%)'
  };

  return (
    <>
      <div
        id="toggle"
        onClick={onChange}
        className={`btn-toggle__wrapper ${selected ? 'active' : ''}`}
        style={btnToggleStyle}>
        <div className="btn-toggle__circle"></div>
      </div>
      <input id="checkboxToggle" type="checkbox" className="hidden" defaultChecked={selected} />
    </>
  );
}
export default ToggleButton;
