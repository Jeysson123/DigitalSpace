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
  const [searchTerm, setSearchTerm] = useState("");
  const [client, setClient] = useState({});

  // Effect to run once on component mount to set the initial state
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClient(localStorage.getItem('client'));
      setSearchTerm(localStorage.getItem('searchTerm')); // Update searchTerm
    }, 1000);
  
    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [searchTerm]); // Include searchTerm in the dependency array

  useEffect(() => {
    setSearchTerm(""); // Set searchTerm to empty when component is refreshed
    localStorage.setItem('searchTerm', ''); // Set searchTerm to empty in localStorage
  }, []);
  
  // Effect to fetch token on component mount
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

  // Effect to fetch land shipments
  useEffect(() => {
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

    throwLandShipments();

    const intervalId = setInterval(() => {
      throwLandShipments();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [token]); // Include token in the dependency array to re-run when token changes

  // Effect to fetch maritime shipments
  useEffect(() => {
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

    throwMaritimeShipments();

    const intervalId = setInterval(() => {
      throwMaritimeShipments();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [token]); // Include token in the dependency array to re-run when token changes

  // Effect to concatenate land and maritime shipments arrays
  useEffect(() => {
    setListShipments([...listLandShipments, ...listMaritimeShipments]);
  }, [listLandShipments, listMaritimeShipments]);

  // Effect to reset searchTerm to empty when component is refreshed
  useEffect(() => {
    setSearchTerm(""); // Set searchTerm to empty when component is refreshed
  }, []);

  const shipmentsFiltered = () => {
    if(searchTerm !== "") {
      // Filter the list of shipments based on the search term
      const filteredShipments = listShipments.filter(item => 
        item.productType.toLowerCase().startsWith(searchTerm.toLowerCase())
      );

      // Return the filtered list of shipments
      return filteredShipments.map((item, index) => (
        <div key={index}>
          <Card productId={item.productId} productType={item.productType} dateDelivery={item.dateDelivery} sector={item.sector}/>
        </div>
      ));
    } else {
      // If searchTerm is empty, return the original list of shipments
      return listShipments.map((item, index) => (
        <div key={index}>
          <Card productId={item.productId} productType={item.productType} dateDelivery={item.dateDelivery} sector={item.sector}/>
        </div>
      ));
    }
  }

  return (
    <div className="landing">
      {shipmentsFiltered()}
    </div>
  );
};

export default Landing;
