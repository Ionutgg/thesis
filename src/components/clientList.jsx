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

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard:', text);
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
      });
  }

  return (
    <div className='workCenter shadow p-3 mb-5 bg-white rounded' style={{ display: 'flex', flexWrap: 'wrap', marginRight: 300, marginLeft: 300, width: 1250 }}>
    {data && data.map((item, index) => (
      <div key={index} style={{ position: 'relative', width: '380px', height: '200px', border: '1px solid #ccc', margin: '10px', padding: '10px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Name:<span onClick={() => copyToClipboard(item.clientsName)} style={{ cursor: 'pointer' }}>{item.clientsName}</span>  <br/><br/> 
          Mail:<span onClick={() => copyToClipboard(item.clientsMail)} style={{ cursor: 'pointer' }}>{item.clientsMail}</span>  <br/> 
          Phone:<span onClick={() => copyToClipboard(item.clientsPhone)} style={{ cursor: 'pointer' }}>{item.clientsPhone}</span>  <br/>
          Address:<span onClick={() => copyToClipboard(item.clientsAdress)} style={{ cursor: 'pointer' }}>{item.clientsAdress}</span> 
        </div>
        <a href={'/Account/Edit/'+item.mail} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        </a>
      </div>
    ))}
  </div>
  );
};
