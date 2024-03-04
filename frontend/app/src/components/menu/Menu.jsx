import React, { useState, useEffect } from "react";
import imageSearch from "../../images/busqueda.svg";
import './styles.css';
import Register from "../register/Register";
import Login from "../login/Login";
import Logout from "../login/Logout";

const Menu = () => {

  const [client, setClient] = useState(null); // Initialize client state to null
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const storedClient = localStorage.getItem('client');
    setClient(storedClient); // Update client state

    return () => clearInterval(5000);
  }, []);

  const handleSearchButtonClick = () => {
    const term = document.getElementById("barra-busqueda").value;
    setSearchTerm(term); 
  
    setSearchTerm(prevSearchTerm => {
      localStorage.setItem('searchTerm', prevSearchTerm); // Store the previous searchTerm
      return prevSearchTerm; // Return the previous searchTerm
    });
  };
  

  return (
    <header>
      <ul className="contenedor-logo">
        <li><a href="#" className="logo">Logo</a></li>
        <li><a href="#" className="inicio-btn">Inicio</a></li>
      </ul>

      <div className="contenedor-busqueda">
        <input 
          type="search" 
          name="campo-busqueda" 
          required 
          id="barra-busqueda" 
          className="barra-busqueda" 
        />
        {/* Attach onClick event handler to the image button */}
        <img 
          src={imageSearch} 
          alt="Imagen de busqueda" 
          className="imagen-busqueda" 
          onClick={handleSearchButtonClick} 
        />
      </div>
      
      <ul className="iniciar-registro">
        {client === null && <Register/>}
        {client === null && <Login/>}
        {client !== null && <Logout setClient={setClient} />}
      </ul>
    </header>
  );
}

export default Menu;
