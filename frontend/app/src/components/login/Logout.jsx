import React from "react";

const Logout = ({ setClient }) => {
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('client'); // Remove client from localStorage
    setClient(null); // Update the client state to null
  };

  return (
    <li className="contenedor-iniciar">
      <a href="#" className="iniciar-btn" onClick={handleLogout}>
        Salir
      </a>
    </li>
  );
};

export default Logout;
