import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./styles.css";
import RegexUtils from "../../utils/RegexUtils";
import Client from "../../dao/Client";
import Token from "../../dao/Token";
import Result from "../result/Result";

const Register = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Clave");
  const [msg, setMsg] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const NameChanged = (e) => {
    setName(e.target.value);
  };

  const EmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const PasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const RegisterUser = (e) => {
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

        const clientDao = new Client(name, email, password);

        headers = {
          "Authorization": `Bearer ${tokenResult}`,
          "Content-Type": "application/json", // Don't forget this content type for subsequent requests
        };

        content = {
          nombreCliente: clientDao.name,
          correoCliente:  clientDao.email,
          claveCliente: clientDao.password,
        };

        axios.post("http://localhost:1212/api/transport/client/insert", content, { headers })
          .then((response) => {
            setShowMsg(true);
            if (response.data.includes("Nombre") || response.data.includes("3 y 15") ) {
              setName('Valide este campo');
              setIsValidName(false);
            }
            if (response.data.includes("Correo") || response.data.includes("10 y 20")) {
              setEmail('Valide este campo');
              setIsValidEmail(false);

            }
            if (response.data.includes("Clave") ||  response.data.includes("5 y 8")) {
              setPassword('Valide este campo');
              setIsPasswordValid(false);

            }
            if(response.data.includes("exitoso")){
              setMsg(response.data);
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
        <li className="contenedor-registro">
          <a href="#" className="registro-btn">Registro</a>
          <form onSubmit={RegisterUser} className="area-registro">
            <h2>Registrarse</h2>
            <label htmlFor="nombre-registro">Nombre completo </label>
            <input
              type="text"
              onChange={NameChanged}
              placeholder={name}
              name="nombre-registro"
              id="nombre-registro"
              className="nombre-registro"
              style={{
                border: isValidName ? "1px solid black" : "1px solid red"
              }}
            />
            <label htmlFor="email-registro">Correo</label>
            <input
              type="email"
              onChange={EmailChanged}
              placeholder={email}
              name="email-registro"
              id="email-registro"
              className="email-registro"
              style={{
                border: isValidEmail ? "1px solid black" : "1px solid red"
              }}
            />
            <label htmlFor="clave-registro">Contraseña</label>
            <input
              type="password"
              onChange={PasswordChanged}
              placeholder={password}
              name="clave-registro"
              id="clave-registro"
              className="clave-registro"
              style={{
                border: isPasswordValid ? "1px solid black" : "1px solid red"
              }}
            />
            <input type="submit" value="Registrarse" />
            {showMsg && <h4 className="msg">{msg}</h4>}
          </form>
        </li>
      )}
      {!showForm && <Result name={name}/>}
    </>
  );
};

export default Register;
