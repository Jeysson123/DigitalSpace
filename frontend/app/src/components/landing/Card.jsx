import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Token from "../../dao/Token";
import RegexUtils from "../../utils/RegexUtils";
import Update from "../update/Update";
import Result from "../result/Result";

const Card = (props) => {
  const { productId, productType, dateDelivery, sector } = props;
  const [tipoProducto, setTipoProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState(0);
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [bodegaEntrega, setBodegaEntrega] = useState('');
  const [precioEnvio, setPrecioEnvio] = useState(0);
  const [placaVehiculo, setPlacaVehiculo] = useState('');
  const [numeroGuia, setNumeroGuia] = useState(0);
  const [tipoCarga, setTipoCarga] = useState(false);
  const [token, setToken] = useState("");
  const [showUpdate, setShowUpdate] = useState(false); // State variable for showing Update component
  const [showDetail, setShowDetail] = useState(false); 
  const [clicked, setClicked] = useState(false); // State variable to track whether the title has been clicked
  const [client, setClient] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClient(localStorage.getItem('client'));
    }, 5000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const tokenDao = new Token("javainuse", "password");

    let headers = {
      "Content-Type": "application/json"
    };

    let content = {
      username: tokenDao.user,
      password: tokenDao.password
    };

    axios
      .post("http://localhost:8080/authenticate", content, { headers })
      .then((response) => {
        const tokenResult = RegexUtils.ExtractValue(
          /"token"\s*:\s*"([^"]+)"/,
          JSON.stringify(response.data)
        );
        setToken(tokenResult);
      })
      .catch((error) => {
        alert("There was an error: " + error);
      });
  }, []);

  const CompleteFields = async () => {

    if(token !== "") {

      let getEndpoint = '';

      const headers = {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if(sector === "Land"){
        getEndpoint = `http://localhost:9090/api/transport/land/find?id=${productId}`;
      } else {
        getEndpoint = `http://localhost:1010/api/transport/maritime/find?id=${productId}`;
      }

      const response = await axios.get(getEndpoint, { headers })
      const data = response.data;
      setTipoProducto(data.tipoProducto);
      setCantidadProducto(data.cantidadProducto);
      setFechaRegistro(data.fechaRegistro);
      setFechaEntrega(data.fechaEntrega);
      setBodegaEntrega(data.bodegaEntrega);
      setPrecioEnvio(data.precioEnvio);
      setPlacaVehiculo(data.placaVehiculo);
      setNumeroGuia(data.numeroGuia);
      setTipoCarga(data.tipoCarga);
      setShowDetail(true);
    }
  }

  const convertToLocalDate = (timestamp) => {
    const milliseconds = parseInt(timestamp) * 1000;
    const dateObject = new Date(milliseconds);
    const localDate = dateObject.toLocaleDateString();
    return localDate;
  };

  const DeleteShipment = (e) => {
    if(client === null){
      alert('Debes hacer login, primero.')
    }
    else{
      e.preventDefault();
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      let removeEndpoint = "";
      if (sector === "Land") {
        removeEndpoint = `http://localhost:9090/api/transport/land/remove/${productId}`;
      } else {
        removeEndpoint = `http://localhost:1010/api/transport/maritime/remove/${productId}`;
      }
      axios
        .delete(removeEndpoint, { headers })
        .then((response) => {
          // Handle response if needed
          alert(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="card">
      <h2 className={`card__title ${clicked ? 'clickable' : ''}`} onClick={() => CompleteFields(productId)}>{productType}</h2>
      <span className="card__fecha">{convertToLocalDate(dateDelivery)}</span>
      <div className="card__btn-container">
        <button className="card__btn btn--eliminar" onClick={DeleteShipment}>
          Eliminar
        </button>
        {/* Toggle the showUpdate state when update button is clicked */}
        <button
          className="card__btn btn--actualizar"
          onClick={() => client ? setShowUpdate(!showUpdate) : alert('Debes hacer login, primero.')}
        >
          Actualizar
        </button>
      </div>
      {/* Render Update component conditionally based on showUpdate state */}
      {showUpdate && <Update typeRequest={"Update"} productId={productId} sector={sector}/>}
      {showDetail && <Result showDetail={true} tipoProducto={tipoProducto} cantidadProducto={cantidadProducto}
      fechaRegistro={fechaRegistro} fechaEntrega={fechaEntrega} bodegaEntrega={bodegaEntrega}
      precioEnvio={precioEnvio} placaVehiculo={placaVehiculo} numeroGuia={numeroGuia}/>}

    </div>
  );
};

export default Card;
