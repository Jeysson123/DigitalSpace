import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Token from "../../dao/Token";
import RegexUtils from "../../utils/RegexUtils";

const Update = (props) => {
  const { client, productId, sector, typeRequest } = props;
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
  const [showForm, setShowForm] = useState(true);


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
        const tokenResult = RegexUtils.ExtractValue(/"token"\s*:\s*"([^"]+)"/, JSON.stringify(response.data));
        setToken(tokenResult);
      })
      .catch((error) => {
        alert("There was an error: " + error);
      });

      
  }, []); 

  const CompleteFields = async () => {

    if(typeRequest === "Update" && token !== "") {

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
    }
  }

  const InsertShipment = (e) => {

    e.preventDefault();

    let insertEndpoint = '';

    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    let content = {
      tipoProducto: tipoProducto,
      cantidadProducto: cantidadProducto,
      fechaRegistro: fechaRegistro,
      fechaEntrega: fechaEntrega,
      bodegaEntrega : bodegaEntrega,
      precioEnvio : precioEnvio,
      numeroGuia : numeroGuia,
      client: client
    };

    if(tipoCarga === false){
      insertEndpoint=`http://localhost:9090/api/transport/land/insert`;
      content.placaVehiculo = placaVehiculo;
    }
    else{
      insertEndpoint=`http://localhost:1010/api/transport/maritime/insert`;
      content.numeroFlota = placaVehiculo;
    }

    axios.post(insertEndpoint,  content, { headers })
      .then(response => {
        alert(response.data);
        if(response.data.includes('exitoso')){
          setShowForm(false)
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {

    CompleteFields();

  }, [token]);

  const UpdateShipment = (e) => {

    e.preventDefault();

    let updateEndpoint = '';

    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    let content = {
      tipoProducto: tipoProducto,
      cantidadProducto: cantidadProducto,
      fechaRegistro: fechaRegistro,
      fechaEntrega: fechaEntrega,
      bodegaEntrega : bodegaEntrega,
      precioEnvio : precioEnvio,
      numeroGuia : numeroGuia
    };

    if(sector === 'Land'){
      updateEndpoint=`http://localhost:9090/api/transport/land/update/${productId}`;
      content.placaVehiculo = placaVehiculo;
    }
    else{
      updateEndpoint=`http://localhost:1010/api/transport/maritime/update/${productId}`;
      content.numeroFlota = placaVehiculo;
    }

    axios.put(updateEndpoint,  content, { headers })
      .then(response => {
        alert(response.data);
        if(response.data.includes('exitosamente')){
          setShowForm(false)
        }
      })
      .catch(error => console.log(error));
  };
  
  return (
    <>
    {showForm && (
      <div>
        <form className="registro-orden">
          <div className="labels">
            <label htmlFor="tipo-producto">Tipo de producto: </label>
            <label htmlFor="cantidad-producto">Cantidad de productos: </label>
            <label htmlFor="fecha-registro">Fecha de registro: </label>
            <label htmlFor="fecha-entrega">Fecha de entrega: </label>
            <label htmlFor="precio-envio">Precio de envio: </label>
            <label htmlFor="bodega-entrega" onClick={() => document.getElementById('precio-envio').scrollIntoView({ behavior: 'smooth' })}>Bodega de entrega: </label>
            <label htmlFor="placa-vehiculo">Placa del vehiculo: </label>
            <label htmlFor="numero-guia">Numero de guia: </label>
            {typeRequest === 'Insert' &&
            <label htmlFor="tipo-carga">Carga maritima?</label>
            }
          </div>
          <div className="campos">
            <input type="text" value={tipoProducto} onChange={(e) => setTipoProducto(e.target.value)} id="tipo-producto" className="tipo-producto" />
            <input type="number" value={cantidadProducto} onChange={(e) => setCantidadProducto(e.target.value)} id="cantidad-producto" className="cantidad-producto" min="0" />
            <input type="date" value={fechaRegistro} onChange={(e) => setFechaRegistro(e.target.value)} id="fecha-registro" className="fecha-registro" />
            <input type="date" value={fechaEntrega} onChange={(e) => setFechaEntrega(e.target.value)} id="fecha-entrega" className="fecha-entrega" />
            <input type="number" value={precioEnvio} onChange={(e) => setPrecioEnvio(e.target.value)} id="precio-envio" className="precio-envio" />
            <input type="text" value={bodegaEntrega} onChange={(e) => setBodegaEntrega(e.target.value)} id="bodega-entrega" className="bodega-entrega" />
            <input type="text" value={placaVehiculo} onChange={(e) => setPlacaVehiculo(e.target.value)} id="placa-vehiculo" className="placa-vehiculo" />
            <input type="number" value={numeroGuia} onChange={(e) => setNumeroGuia(e.target.value)} id="numero-guia" className="numero-guia" min="0" />
            {typeRequest === 'Insert' &&
            <div className="seleccion-carga">
              <span>Si</span>
              <input type="checkbox" checked={tipoCarga} onChange={(e) => setTipoCarga(e.target.checked)} id="tipo-carga" />
            </div>
            }
          </div>
          <input type="button" value={typeRequest === 'Update' ? 'Actualizar': 'Registrar'} onClick={typeRequest === 'Update' ? UpdateShipment : InsertShipment} className="orden-btn" />
        </form>
      </div>
    )
    }
    </>
  );
};

export default Update;
