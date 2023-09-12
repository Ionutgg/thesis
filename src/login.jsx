import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "email") setEmail(value);
    else if (id === "password") setPassword(value);
  };

  const handleLogin = () => {
    // Trimite datele de autentificare către server pentru verificare folosind fetch
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      // Gestionează răspunsul serverului
      if (data.success) {
        localStorage.setItem('loggedInAccount', JSON.stringify(data));
        navigate('/Account');
      } else {
        // Autentificarea a eșuat
        setLoginStatus(false);
        console.log('data.success');
      }
    });
  };

  return (
      <div className="grid">
        <div className="row">
          <h1 className="text-center" style={{ marginTop: 150 }}>
            Login
          </h1>
        </div>
        <div className="row d-flex justify-content-center">
          <input
            className="" type="text" id="email" placeholder="Mail"
            style={{ width: 350 }} value={email} onChange={handleInputChange}/>
        </div>
        <div className="row d-flex justify-content-center">
          <input
            className="" type="password" id="password" placeholder="Password"
            style={{ width: 350, marginTop: 10 }} value={password} onChange={handleInputChange}/>
        </div>
        <div className="row d-flex justify-content-center">
          <button className="btn btn-primary" style={{ width: 70, marginTop: 10 }} onClick={handleLogin}>
            Sign in
          </button>
        </div>
        {loginStatus === false && (
            <p style={{marginLeft : 150}}>Login failed. Please check your email and password.</p>
        )}
      </div>
  );
};
