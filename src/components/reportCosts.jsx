import React, { useState, useEffect } from 'react';
import { GetAccounts } from './serverCmds/AccountsGet';
import { CostsGetColumn } from './serverCmds/costsGetColumns';
import { ReportIncome } from './reportIncome';
import '../styles/index.css';

export const ReportCosts = (filterMonthYear) => {
  const [audit, setAudit] = useState([]);
  const [totalSalary, setTotalSalary] = useState([]);
  const [electricityBill, setElectricityBill] = useState([]);
  const [testBill, setTestBill] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await GetAccounts();
        const columnData = await CostsGetColumn(filterMonthYear);

        setAudit(clientsData);
        setElectricityBill(columnData.map(column => column['Electricity Bill']));
        setTestBill(columnData.map(column => column['Test Bill']));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [filterMonthYear]);

  useEffect(() => {
    
    calculateTotalSalary();
    //comentariu care trebuie pentru a opri regula ESLint pentru acasta linie
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [audit]);

  const calculateTotalSalary = () => {
    const newTotalSalary = audit.map(item => item.salary);
    setTotalSalary(newTotalSalary);
  }

  return (
    <>
      <div className="salary-section">
        <div className="box">
          <div className="box-header">Salary</div>
          <div className="box-content">{totalSalary.reduce((acc, curr) => acc + curr, 0)}</div>
        </div>
        <div className="box">
          <div className="box-header">Electricity Bill</div>
          <div className="box-content">{electricityBill.reduce((acc, curr) => acc + curr, 0)}</div>
        </div>
        <div className="box">
          <div className="box-header">Test Bill</div>
          <div className="box-content">{testBill.reduce((acc, curr) => acc + curr, 0)}</div>
        </div>
      </div>
      {ReportIncome(filterMonthYear, totalSalary.reduce((acc, curr) => acc + curr, 0) + electricityBill.reduce((acc, curr) => acc + curr, 0) + testBill.reduce((acc, curr) => acc + curr, 0))}
    </>
  );
};
