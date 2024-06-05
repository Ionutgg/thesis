import React, { useEffect, useState } from 'react';
import { AuditLogGet } from './serverCmds/AuditLogGet';
import '../styles/index.css';

export const AuditLogShow = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auditlog = await AuditLogGet();
        setData(auditlog);
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };

    fetchData();
  }, []);

  const giveDate = (value) =>{
    var d = new Date(value);
    const year = d.getFullYear(); // Get the year (e.g., 2023)
    const month = d.getMonth() + 1; // Get the month (zero-based, so add 1 for human-readable format)
    const day = d.getDate();
    return(day+"/"+month+"/"+year);
  }

  return (
    <div>
      <div className='AuditModel' key={'index'}>
        <label className='AuditListName'>Name : </label>
        <label className='AuditListDate'>Date : </label>
        <label className='AuditListhour'>Hour : </label>
        <label className='AuditAction'>Action : </label>
      </div>
      {data.reverse().map((item, index) => (
        <div className='AuditList' key={index}>
          <label className='AuditListName'>{item.name}</label>
          <label className='AuditListDate'>{giveDate(item.date)}</label>
          <label className='AuditListhour'>{item.hour}</label>
          <label className='AuditAction'>{item.action}</label>
        </div>
      ))}
    </div>
  );
};
