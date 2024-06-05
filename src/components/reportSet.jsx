import React, { useState, useEffect } from 'react';
import { CostsAdd } from './serverCmds/costsAdd';
import { GetAccounts } from './serverCmds/AccountsGet';
import todayDate from './GetTodayDate';
import Modal from 'react-modal';
import { ReportCosts } from './reportCosts';
import '../styles/index.css';

export const ReportSet = () => {
  const [filterMonthYear, setFilterMonthYear] = useState(todayDate().substring(3, 10));
  const [date,setDate] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [electricityBill, setElectricityBill] = useState(0);
  const [testBill, setTestBill] = useState(0); 
  const [totalSalary, setTotalSalary] = useState([]);
  const [audit, setAudit] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await GetAccounts();

        setAudit(clientsData);
        setDate(filterMonthYear)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [filterMonthYear]);

  useEffect(() => {
    // se calculeaza salariul total cand jusrnalul se schimba
    calculateTotalSalary();
  }, [audit]);

  const calculateTotalSalary = () => {
    const newTotalSalary = audit.map(item => item.salary);
    setTotalSalary(newTotalSalary);
  }

  const handleSubmit = () => {
    // se calculeaza salariul total
    const totalSalarySum = totalSalary.reduce((acc, curr) => acc + curr, 0);
    // se salveaza costurile in baza de date
    CostsAdd(totalSalarySum, electricityBill, testBill, date);
    // se reseteaza intrarile
    setElectricityBill(0);
    setTestBill(0);
    setShowModal(false); // se inchide modal-ul
  };

  const handleElectricity = (e) => {
    setElectricityBill(parseFloat(e.target.value));
  };

  const handleTest = (e) => {
    setTestBill(parseFloat(e.target.value));
  };

  const handleMonthYear = (e) => {
    setFilterMonthYear(e.target.value)
  };

  const handleModuleClose = () => {
    setShowModal(false);
  };

  const handleDate = (e) =>{
    setDate(e.target.value)
  }

  return (
    <>
    <div className="invoice-table-container1">
        <div className="filter-section">
            <label style={{ marginRight: 20, fontSize: 22 }}>Filter by Month/Year:</label>
            <input type="text" id="date" style={{ fontSize: 22 }} value={filterMonthYear} onChange={handleMonthYear} />
            <button className="btnAdd btn btn-primary" onClick={() => setShowModal(true)}>Set Bills</button><br />
            <label htmlFor="filterMonthYear" style={{ marginRight: 20, fontSize: 22 }}>Costs:</label>
        </div>

      {ReportCosts(filterMonthYear)}
    </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleModuleClose}
        ariaHideApp={false}
        contentLabel="Insert Data Modal"
        style={{
          content: {
            width: '300px',
            height: '600px',
            margin: 'auto',
          },
        }}
      >
        <h2 className="modal-title">Month's bills</h2>
        <div className="modal-content">
          <p><br />
            <label htmlFor="EB">Electricity Bill:</label><br />
            <input type="text" id="EB" onChange={handleElectricity} />
          </p><br />
          <p>
            <label htmlFor="TB">Test Bill:</label><br />
            <input type="text" id="TB" onChange={handleTest} />
          </p><br />
          <p>
            <label htmlFor="MY">Month/Year:</label><br />
            <input type="text" id="MY" value={date} onChange={handleDate} />
          </p>
          <button className="btnAdd btn btn-primary" style={{ marginTop: 40 }} onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>
    </>
  );
};
