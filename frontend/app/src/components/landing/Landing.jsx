import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import Card from "./Card";
import RegexUtils from "../../utils/RegexUtils";
import Token from "../../dao/Token";

const Landing = (props) => {
  const [listLandShipments, setListLandShipments] = useState([]);
  const [listMaritimeShipments, setListMaritimeShipments] = useState([]);
  const [listShipments, setListShipments] = useState([]);
  const [token, setToken] = useState("");
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
        const tokenResult = RegexUtils.ExtractValue(/"token"\s*:\s*"([^"]+)"/, JSON.stringify(response.data));
        setToken(tokenResult); // Set the token in the state
      })
      .catch((error) => {
        alert("There was an error: " + error);
      });
  }, []); // Empty dependency array to run only once on component mount

  const throwLandShipments = async () => {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    try {
      const response = await axios.get("http://localhost:9090/api/transport/land/get", { headers });
      const parseShipments = response.data.map((item) => ({
        productId: item.id,
        productType: item.tipoProducto,
        dateDelivery: item.fechaEntrega,
        sector: 'Land'
      }));
      setListLandShipments(parseShipments);
    } catch (error) {
      console.log("Error fetching land shipments:", error);
    }
  };

  const throwMaritimeShipments = async () => {
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    try {
      const response = await axios.get("http://localhost:1010/api/transport/maritime/get", { headers });
      const parseShipments = response.data.map((item) => ({
        productId: item.id,
        productType: item.tipoProducto,
        dateDelivery: item.fechaEntrega,
        sector: 'Maritime'
      }));
      setListMaritimeShipments(parseShipments);
    } catch (error) {
      console.log("Error fetching maritime shipments:", error);
    }
  };

  useEffect(() => {
    throwLandShipments();
    throwMaritimeShipments();

    const intervalId = setInterval(() => {
      throwLandShipments();
      throwMaritimeShipments();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [token]); // Include token in the dependency array to re-run when token changes

  useEffect(() => {
    // Concatenate land and maritime shipments arrays
    setListShipments([...listLandShipments, ...listMaritimeShipments]);
  }, [listLandShipments, listMaritimeShipments]);

  return (
    <div className="landing">
      {listShipments.map((item, index) => (
        <div key={index}>
          <Card productId={item.productId} productType={item.productType} dateDelivery={item.dateDelivery} sector={item.sector}/>
        </div>
      ))}
    </div>
  );
};

export default Landing;
