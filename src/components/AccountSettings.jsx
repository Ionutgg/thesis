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
        <div>
            <AccountAdd/>
            <Link to="/AddWorkcenter" className="btnAdd btn btn-primary" style={{width:100}} >Add Work Center</Link>
            <button className="btnAdd btn btn-primary" style={{width:85}} onClick={()=>{setList(!list)}}>Accounts List</button>
            {list === true ? (<AccountList/>):(<label></label>)}
        </div>
      ) : (
        <div></div>
      )}
      {accountData && (accountData.results[0].user_rank === 'inginer') ? (
        <div>
            <Link to="/AddWorkcenter" className="btnAdd btn btn-primary" style={{width:100}} >Add Wrok Center</Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
