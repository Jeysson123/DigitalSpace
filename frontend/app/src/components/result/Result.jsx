import React, { useState, useEffect } from "react";
import "./styles.css";

const Result = (props) => {
  const [showPopup, setShowPopup] = useState(true);

  const CloseAlert = (event) => {
    event.preventDefault();
    setShowPopup(false); // Close the popup
  };

  if (!showPopup) {
    return null; // Return null when showPopup is false to hide the popup
  }

  return (
    <div className="popup-container">
      <div className="popup-body">
        {props.children}
        {props.name !== null && <h1>Benvenido  + {props.name}</h1>}
        <hr />
        <button onClick={CloseAlert}>Cerrar</button>
      </div>
    </div>
  );
};

export default Result;
