import React, { useEffect, useState } from 'react';
import { AccountAdd } from './AccountAdd';
import { AccountList } from './AccountList';
import { Link } from 'react-router-dom';

export const AccountSettings = () => {
  const [accountData, setAccountData] = useState(null);
  const [list, setList] = useState(false);

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
    <div>
      {accountData && (accountData.results[0].user_rank === 'admin') ? (
        <div className='h4'>
          Settings : <br/><br/>
            <AccountAdd/>
            <Link to="/AddWorkcenter" className="btnAdd btn btn-primary" style={{width:150}} >Add Work Center</Link>
            <Link to="/ListInvoices" className="btnAdd btn btn-primary" style={{width:110}} >Invoices List</Link>
            <button className="btnAdd btn btn-primary" style={{width:110}} onClick={()=>{setList(!list)}}>Accounts List</button>
            {list === true ? (<AccountList/>):(<label></label>)}
        </div>
      ) : (
        <div></div>
      )}
      {accountData && (accountData.results[0].user_rank === 'inginer') ? (
        <div>
            <Link to="/AddWorkcenter" className="btnAdd btn btn-primary" style={{width:150}} >Add Wrok Center</Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
