import React, { useEffect, useState } from 'react'
import '../styles/index.css'


const AccountComponent = () => {
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
      <div className='accountDetails grid shadow p-3 mb-5 bg-white rounded h4' >
        <label className='h4' style={{marginRight:25}}>Bine ai venit</label> {accountData && accountData.results[0].name}<br/><br/>
        <label className=''>Details account :</label><br/><br/>
        <label className='label info'>Mail : </label> {accountData && accountData.results[0].mail} <br/><br/>
        <label className='label info' style={{ fontSize: '15px' }}>Work Center : </label> {accountData && accountData.results[0].wc}<br/><br/>
        <label className='label info'>Job : </label> {accountData && accountData.results[0].user_rank} <br/><br/>     
      </div>
  );
};

export default AccountComponent;
