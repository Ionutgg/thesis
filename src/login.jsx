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
    <div className="container">
  <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh', marginLeft:200 }}>
    <div className="col-lg-6">
      <div className="text-center mb-4">
        <img src={require('./logo/logo.png')} alt="Logo" width="100" height="100" />
        <h2 className="mt-3">Company Description</h2>
        <p className="text-muted">Here will be placed the description of the company.</p>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="card shadow-sm" style={{marginLeft:50, width:400, height:350}}>
        <div className="card-body">
          <h1 className="text-center mb-4">Login</h1>
          <form>
            <div className="mb-3">
              <input className="form-control" type="text" id="email" placeholder="Mail" value={email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <input className="form-control" type="password" id="password" placeholder="Password" value={password} onChange={handleInputChange} />
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="button" onClick={handleLogin}>Sign in</button>
            </div>
          </form>
          {loginStatus === false && (
            <p className="text-danger mt-3">Login failed. Please check your email and password.</p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>);
};
