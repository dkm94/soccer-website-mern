import React from 'react';
import { useTheme } from '@material-ui/core';
import './ToggleButton.css';

function ToggleButton({ key, value, selected, onChange }) {
  const { palette } = useTheme();
  console.log('🚀 ~ file: ToggleButton.jsx:5 ~ ToggleButton ~ value:', value);

  const btnToggleStyle = {
    background: selected ? palette.primary.main : 'hsl(0, 4%, 69%)'
  };

  return (
    <>
      <div
        key={key}
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
