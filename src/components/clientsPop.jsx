import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/index.css'

export const ClientsPop = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleAdress = (e) => {
    setAdress(e.target.value);
  };

  const addClient = async () => {
    const formData = new FormData();
    formData.append('clientName', name);
    formData.append('clientMail', mail);
    formData.append('clientPhone', phone);
    formData.append('clientAdress', adress);
  
    try {
      const response = await fetch(`http://localhost:3001/insert/client`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Data inserted successfully!');
        onClose();
      } else {
        console.error('Failed to insert data.');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  

  const handleSubmit = () => {
    addClient();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Insert Data Modal"
      style={{
        content: {width: '300px',height: '510px',margin: 'auto',},}}
    >
      <div>
        <h2>Insert Data Client</h2>
        <label className='labelAddClients'>Name:</label>
        <input type="text" onChange={handleNameChange} /><br/>
        <label className='labelAddClients'>Mail:</label>
        <input type="text" onChange={handleMail} /><br/>
        <label className='labelAddClients'>Phone number:</label>
        <input type="text" onChange={handlePhone} /><br/>
        <label className='labelAddClients'>Adress:</label>
        <input type="text" onChange={handleAdress} /><br/>
        <button onClick={handleSubmit} className="btn btn-primary"style={{ margin: 20}}>Insert</button>
        <button onClick={onClose} className="btn btn-primary"style={{ margin: 20, marginLeft: 40}}>Cancel</button>
      </div>
    </Modal>
  );
};
