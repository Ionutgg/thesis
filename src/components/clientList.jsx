import React, { useEffect, useState } from 'react';
import { GetClients } from './serverCmds/getClients';
import '../styles/index.css';

export const ClientList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await GetClients();
        setData(clientsData);
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };

    fetchData();
  },[]);

  return (
    <div>
      <div className='clientListModel' key={'index'}>
        <label className='clientListNameModel'>Name : </label>
        <label className='clientListNameModel'>Mail : </label>
        <label className='clientListNameModel'>Phone : </label>
        <label className='clientListNameModel'>Address : </label>
      </div>
      {data.map((item, index) => (
        <div className='clientList' key={index}>
          <label className='clientListName'>{item.clientsName}</label>
          <label className='clientListName'>{item.clientsMail}</label>
          <label className='clientListName'>{item.clientsPhone}</label>
          <label className='clientListName'>{item.clientsAdress}</label>
        </div>
      ))}
    </div>
  );
};
