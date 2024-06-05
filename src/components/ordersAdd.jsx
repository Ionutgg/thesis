import React, { useState, useEffect } from 'react';
import { GetClients } from './serverCmds/getClients';
import GetInv from './serverCmds/getInv';
import Modal from 'react-modal';
import { AddOrder } from './serverCmds/Orderadd';
import { OrderEstimatedTime } from './serverCmds/OrderEstimatedTime';
import { To_doAdd } from './serverCmds/To_doAdd';
import { OrderGetTitle } from './serverCmds/OrderGetTitle';
import '../styles/index.css';

export const OrdersAdd = () => {
  const [insertModalIsOpen, setInsertModalIsOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [client, setClient] = useState([]);
  let orderClient, orderAmount, orderProduct, timeProduct;

  const openInsertModal = () => {
    setInsertModalIsOpen(true);
  };

  const closeInsertModal = () => {
    setInsertModalIsOpen(false);
  };

  const handleProductChange = (e) => {
    orderProduct = e.target.value;
  };

  const handleAmountChange = (e) => {
    orderAmount = e.target.value;
  };

  const handleClientChange = (e) => {
    orderClient = e.target.value;
  };

  const handleTime =async () => {
    timeProduct =await OrderEstimatedTime(orderProduct);
  }

  const handleSubmit =async () => {
    const addData = async () => {
      try {
        await AddOrder(orderProduct,orderAmount,orderClient,timeProduct*orderAmount);
        const let1 = await OrderGetTitle(orderProduct);
        for(let i in let1){
          await To_doAdd(let1[i].namewc,let1[i].type,let1[i].order,let1[i].title,orderAmount,'0',orderClient);
        }

      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    }
    await handleTime();
    await addData();
    closeInsertModal();
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const clientsData = await GetClients();
      const productData = await GetInv();
      setClient(clientsData);
      setProduct(productData);
    } catch (error) {
      console.error('Error fetching clients data:', error);
    }
  };

  fetchData();
}, []);

  return (
    <>
      <button className="btnAdd btn btn-primary" onClick={openInsertModal}>Add</button>

      <Modal
        isOpen={insertModalIsOpen}
        onRequestClose={closeInsertModal}
        ariaHideApp={false}
        contentLabel="Insert Data Modal"
        style={{content: {width: '300px',height: '510px', margin: 'auto', },}}
      >
        <div>
          <h2 style={{margin: 30}}>Create Order</h2>

          <label className='labelAddClients'>Product:</label>
          <select  onChange={handleProductChange}>
          <option value="none"></option>
          {product.map((product, index) => (
                <option key={index} value={product.title}>{product.title}</option>
            ))}
          </select><br/>

          <label className='labelAddClients'>Amount:</label>
          <input type="text"  onChange={handleAmountChange} style={{width: 80}}/><br/>
          
          <label className='labelAddClients'>Client:</label>
            <select onChange={handleClientChange}>
            <option value="none"></option>
            {client.map((client, index) => (
                <option key={index} value={client.clientsName}>{client.clientsName}</option>
            ))}
            </select><br/>

          <button onClick={handleSubmit} className="btn btn-primary" style={{ margin: 20 }}>Insert</button>
          <button onClick={closeInsertModal} className="btn btn-primary" style={{ margin: 20, marginLeft: 40 }}>Cancel</button>
        </div>
      </Modal>
    </>
  );
};
