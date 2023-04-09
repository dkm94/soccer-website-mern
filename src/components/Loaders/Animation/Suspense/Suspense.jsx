import React from 'react';
import './Suspense.css';

const Suspense = () => {
  return (
    <div className="loader-suspense">
      <span className="loader__element"></span>
      <span className="loader__element"></span>
      <span className="loader__element"></span>
    </div>
  );
};

export default Suspense;
