import React, { useEffect, useState } from 'react';

export const Navbar = () => {
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const storedAccountData = localStorage.getItem('loggedInAccount');
    if (storedAccountData) {
      try {
        setAccountData(JSON.parse(storedAccountData));
      } catch (error) {
        console.error('Error parsing account data:', error);
      }
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginBottom: 20, fontSize: 26 }}>
      <a className="navbar-brand" href="/" style={{ paddingLeft: 40 }}>
        <img src={require('../logo/logo.png')} alt="" width="35" height="35" className="d-inline-block align-text-top" />
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {accountData && accountData.results[0].user_rank === 'admin' ? (
            <a className="nav-item nav-link" href="/AuditLog">Audit Log</a>
          ) : null}
          {accountData && accountData.results[0].user_rank === 'worker' ? (
            <a className="nav-item nav-link" href="/WOrders">Orders</a>
          ) : (
            <a className="nav-item nav-link" href="/Orders">Orders</a>
          )}
          <a className="nav-item nav-link" href="/Inventory">Inventory</a>
          <a className="nav-item nav-link" href="/Account">Account</a>
          {accountData && accountData.results[0].user_rank === 'admin' ? (
            <a className="nav-item nav-link" href="/Clients">Clients</a>
          ) : null}
          {accountData && accountData.results[0].user_rank === 'admin' ? (
            <a className="nav-item nav-link" href="/Reports">Reports</a>
          ) : null}
        </div>
      </div>
      <style>
        {`
          .navbar-nav .nav-item:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* se adauga effect de umbra */
          }
        `}
      </style>
    </nav>
  );
};
