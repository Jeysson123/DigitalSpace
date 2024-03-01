import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./styles.css";
import RegexUtils from "../../utils/RegexUtils";
import Client from "../../dao/Client";
import Token from "../../dao/Token";

const Login = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Clave");
  const [msg, setMsg] = useState("");

  
  const EmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const PasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const LoginUser = (e) => {

    e.preventDefault();

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
        const clientDao = new Client('', email, password);
        headers = {
          "Authorization": `Bearer ${tokenResult}`,
          "Content-Type": "application/json", // Don't forget this content type for subsequent requests
        };

        content = {
          correoCliente:  clientDao.email,
          claveCliente: clientDao.password,
        };

        axios.post("http://localhost:1212/api/transport/client/login", content, { headers })
          .then((response) => {
            setShowMsg(true);
            setMsg(response.data);
            if (response.data !== null) {
                setShowForm(false);
                localStorage.setItem('client', JSON.stringify(response.data));
              }
          })
          .catch((error) => {
            alert("There was an error: " + error);
          });
      })
      .catch((error) => {
        alert("There was an error: " + error);
      });
  };

  return (
    <>
      {showForm && (
        <li className="contenedor-iniciar">
          <a href="#" className="iniciar-btn">iniciar</a>
          <form onSubmit={LoginUser} className="area-iniciar">
            <h2>Login</h2>
            <label htmlFor="email-iniciar">Correo</label>
            <input
              type="email"
              onChange={EmailChanged}
              placeholder={email}
              name="email-iniciar"
              id="email-iniciar"
              className="email-iniciar"
            />
            <label htmlFor="clave-iniciar">Contraseña</label>
            <input
              type="password"
              onChange={PasswordChanged}
              name="clave-iniciar"
              id="clave-iniciar"
              className="clave-iniciar"
            />
            <input type="submit" value="Loguearse" />
            {showMsg && <h4 className="msg">{msg}</h4>}
          </form>
        </li>
      )}
    </>
  );
};

export default Login;
