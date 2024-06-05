import React, { useState, useEffect } from 'react';
import { InvoicesGetByMonthYear } from './serverCmds/invoiceGetMonth';
import { ReportWorkers } from './reportWorkers';
import '../styles/index.css';

export const ReportIncome = (date,totalCost) => {
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const bills = await InvoicesGetByMonthYear(date);
      
            let total = 0;
            bills.forEach(invoice => {
              // separam produsele individual
              const products = invoice.products.split('/');
              // se ia fiecare produs in parte
              products.forEach(product => {
                // se separa valorile produsului in cele 3 variabile
                const [, amount, price] = product.split(' ');
                
                total += parseInt(amount) * parseInt(price);
              });
            });
            setTotalIncome(total);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [date]);      

  return (
    <>
      <label htmlFor="filterMonthYear align" style={{ marginRight: 570, fontSize: 22 }}>Income:</label>

      <div className="salary-section">
        <div className="box">
          <div className="box-header">Total Income</div>
          <div className="box-header"></div>
          <div className="box-content">{totalIncome}</div>
        </div>
        <div className="box">
          <div className="box-header">Total Cost</div>
          <div className="box-header"> {' '}</div>
          <div className="box-content">{totalCost}</div>
        </div>
        <div className="box">
          <div className="box-header">Profit</div>
          <div className="box-content">{totalIncome-totalCost}</div>
          <div className="box-content">{((totalIncome - totalCost) / totalIncome * 100).toFixed(2)}%</div>
        </div>
      </div>
      {ReportWorkers(date)}
    </>
  );
  
  
};
