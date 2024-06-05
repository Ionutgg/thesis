import React, { useEffect, useState } from 'react';
import { Navbar } from './components/navbar';
import { ShowInv } from './components/showInv';
import { Link } from 'react-router-dom';
import { RenderPdf } from './components/renderPdf';
import './styles/index.css';

export default function Inventory() {
  // pentru stocarea datelor locale
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
    <>
      <Navbar />
      {accountData && (accountData.results[0].user_rank === 'admin' || accountData.results[0].user_rank === 'inginer') ? (
        <>
          <Link to="/addProduct" className="btnAdd btn btn-primary">Add</Link>
          <RenderPdf />
        </>
      ) : null}
      <ShowInv />
    </>
  );
}
