import React, { useState, useEffect } from "react";
import "./styles.css";

const Result = (props) => {

  const [showPopup, setShowPopup] = useState(true);
  const { showDetail , tipoProducto, cantidadProducto, fechaRegistro,
    fechaEntrega, bodegaEntrega, precioEnvio, placaVehiculo,
    numeroGuia, tipoCarga} = props;

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
        {showDetail === true && <div>
          <h1>Tipo : {tipoProducto}</h1>
          <h4>Cantidad : {cantidadProducto}</h4>
          <h4>Fecha Registro : {fechaRegistro}</h4>
          <h4>Fecha Entrega : {fechaEntrega}</h4>
          <h4>Bodega Entrega : {bodegaEntrega}</h4>
          <h4>Precio Envio : {precioEnvio}</h4>
          <h4>Placa  : {placaVehiculo}</h4>
          <h4>Numero Guia : {numeroGuia}</h4>
          <h4>Cantidad : {cantidadProducto}</h4>     
          </div>}
        {showDetail === null && props.children}
        {showDetail === null && props.name !== null && <h1>Benvenido  + {props.name}</h1>}
        <hr />
        <button onClick={CloseAlert}>Cerrar</button>
      </div>
    </div>
  );
};

export default Result;
