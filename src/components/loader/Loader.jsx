import React from 'react';
import './Loader.scss';

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100 z-100">
      <span className="loader"></span>
    </div>
  )
}

export default Loader;