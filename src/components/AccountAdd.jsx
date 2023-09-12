import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AccountAddServer } from './serverCmds/AccountAddServer';
import { WCGet } from './serverCmds/WCGet';
import '../styles/index.css'

export const AccountAdd = ({ isOpen, onClose }) => {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setpassword] = useState('');
  const [rank, setrank] = useState('');
  const [wc, setwc] = useState([]);
  let selectedWC;

  const onOpen = () => {
    setAdd(true);
  };
  const inClose = () => {
    setAdd(false);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };
  const handleRank = (e) => {
    setrank(e.target.value);
  };
  const handleWC = (e) => {
    selectedWC = (e.target.value);
  };

  const addAccount =async () => {
     await AccountAddServer(mail,name,password,rank,selectedWC);
     inClose();
  };

  useEffect(() => {
    const fetchData = async () => {
        const wcData = await WCGet();
        setwc(wcData);
    };
  
    fetchData();
  }, []);

  return (
    <>
    <button onClick={() => {onOpen()}} className="btnAdd btn btn-primary" style={{width:85}}>Add Account</button>
    <Modal
      isOpen={add}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Insert Data Modal"
      style={{
        content: {
          width: '300px', // Set the desired width
          height: '540px', // Set the desired height
          margin: 'auto', // Center the modal horizontally
        },}}
    >
      <div>
        <h2>Insert Data Account</h2>
        <label className='labelAddClients'>Name:</label>
        <input type="text" onChange={handleNameChange} /><br/>
        <label className='labelAddClients'>Mail:</label>
        <input type="text" onChange={handleMail} /><br/>
        <label className='labelAddClients'>Password:</label>
        <input type="text" onChange={handlePassword} /><br/>
        <label className='labelAddClients'>Rank:</label>
        <select  onChange={handleRank}>
          <option value="none"></option>
          <option value={'admin'}>Admin</option>
          <option value={'worker'}>Worker</option>
          <option value={'inginer'}>Inginer</option>
          </select><br/>

        <label className='labelAddClients'>Worck Station:</label>
          <select  onChange={handleWC}>
          <option value="none"></option>
          {wc.map((item, index) => (
                <option key={index} value={item.namewc}>{item.namewc}</option>
            ))}
          </select><br/>

        <button onClick={addAccount} className="btn btn-primary"style={{ margin: 20}}>Insert</button>
        <button onClick={inClose} className="btn btn-primary"style={{ margin: 20, marginLeft: 40}}>Cancel</button>
      </div>
    </Modal>
    </>
  );
};
