import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../components/menu/Menu";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Landing from "../components/landing/Landing";
import Update from "../components/update/Update";
import Result from "../components/result/Result";

const HomePage = () => {

  const [showUpdate, setShowUpdate] = useState(false);
  const [client, setClient] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClient(localStorage.getItem('client'));
    }, 5000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, []);


  const handleInsertClick = () => {
    setShowUpdate(true); // Set showUpdate to true to display the Insert option
  };

  const handleUpdateClose = () => {
    setShowUpdate(false); // Set showUpdate to false to hide the Update component
  };

  return (
    <BrowserRouter>
      <Menu />
      {client !== null && <div style={{ textAlign: "left", marginLeft: "20px", marginTop: "22px" }}>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleInsertClick} // Wire up the button click event to handleInsertClick function
        >
          Agregar
        </button>
      </div>}
      <div className="content-container">
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="landing" element={<Landing />} />
        </Routes>
        <Landing />
        {showUpdate && (
          <Result showDetail={null}>
            <Update  client ={client} typeRequest={"Insert"} onClose={handleUpdateClose} />
          </Result>
        )}
      </div>
    </BrowserRouter>
  );
};

export default HomePage;
