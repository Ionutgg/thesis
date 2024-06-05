import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from './pdf/bill';
import { GetClients } from './serverCmds/getClients';
import { GetClient } from './serverCmds/getClient';
import GetInv from './serverCmds/getInv';
import todayDate from './GetTodayDate';
import '../styles/index.css';
import DatePicker from 'react-datepicker';
import { AddInvoice } from './serverCmds/invoiceAdd';
import { GetLastIdInvoice } from './serverCmds/InvoiceLastId';
import { ProductDecrease } from './serverCmds/productQuantityDecrease';
import 'react-datepicker/dist/react-datepicker.css';

export const RenderPdf = () => {
  const [insertModalIsOpen, setInsertModalIsOpen] = useState(false);
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [date, setDate] = useState(todayDate());
  const [endDate, setEndDate] = useState(new Date());
  const [maxId, setMaxId] = useState(0);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await GetClients();
        const productData = await GetInv();
        const idData = await GetLastIdInvoice();
        setClients(clientsData);
        setMaxId(idData[0].max_id);
        setProducts(productData.map(product => ({ title: product.title, amount: '', price: product.price })));
        setDate(todayDate());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openInsertModal = () => {
    setInsertModalIsOpen(true);
  };

  const closeInsertModal = () => {
    setInsertModalIsOpen(false);
  };

  const openPreviewModal = () => {
    setPreviewModalIsOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalIsOpen(false);
  };

  const handleAmountChange = (index) => (e) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], amount: e.target.value };
    setProducts(newProducts);
  };

  const handleClientChange = async (e) => {
    try {
      const clientsData = await GetClient(e.target.value);
      setAddress(clientsData[0].clientsAdress);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    setSelectedClient(e.target.value);
  };  

  const handleSubmit = () => {
    closeInsertModal();
    setSelectedProducts(products);
    openPreviewModal();
  };

  const saveInvoice = () => {
    
    const filteredProducts = products.filter(product => product.amount !== '');
    let listProducts = '';
    let quantity = [];

      quantity.push({title: filteredProducts[0].title, quantity: filteredProducts[0].amount })
      listProducts = filteredProducts[0].title+' '+filteredProducts[0].amount+' '+filteredProducts[0].price;
    for (let i = 1; i < filteredProducts.length; i++){
      listProducts += '/'+filteredProducts[i].title+' '+filteredProducts[i].amount+' '+filteredProducts[i].price
      quantity.push({title: filteredProducts[i].title, quantity: filteredProducts[i].amount })
    }
    console.log(quantity);
    for (let i = 0; i<quantity.length;i++){
      ProductDecrease(quantity[i].title, quantity[i].quantity)
    }
   AddInvoice(date,formatDate(endDate),selectedClient,listProducts, address);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleEndDate = (selectedDate) => {
    setEndDate(selectedDate);
  };

  return (
    <>
      <button className="btnAdd btn btn-primary" onClick={openInsertModal}>Invoice</button>
      <Modal
        isOpen={insertModalIsOpen}
        onRequestClose={closeInsertModal}
        ariaHideApp={false}
        contentLabel="Insert Data Modal"
        style={{
          content: {width: '600px',height: '1010px',margin: 'auto',},}}
      >
        <div>
          <h2 style={{ margin: 30 }}>Create Invoice</h2>

          <button onClick={handleSubmit} className="btn btn-primary" style={{ margin: 20 }}>Create</button>
          <button onClick={closeInsertModal} className="btn btn-primary" style={{ margin: 20, marginLeft: 40 }}>Cancel</button><br />

          <label className='labelAddClients'>Client:</label>
          <select onChange={handleClientChange}>
            <option value="">Select Client</option>
            {clients.map((client, index) => (
              <option key={index} value={client.clientsName}>{client.clientsName}</option>
            ))}
          </select><br />

          <label className='labelAddClients'>End Date:</label>
          <DatePicker dateFormat="dd/MM/yyyy" selected={endDate} onChange={handleEndDate} /><br />

          <label className='labelAddClients'>Products:</label><br />

          {products.map((product, index) => (
            product.title && (
              <div key={index} className="product-item">
                <label className="product-title">{product.title}</label>
                <label className='labelAddClients' style={{ marginLeft: 10 }}>Amount:</label>
                <input
                  type="text"
                  value={product.amount}
                  onChange={handleAmountChange(index)}
                  style={{ width: 80 }}
                />
              </div>
            )
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={previewModalIsOpen}
        onRequestClose={closePreviewModal}
        ariaHideApp={false}
        contentLabel="Preview PDF Modal"
        style={{
          content: {
            width: 'auto',
            height: 'auto',
            margin: 'auto',
          },
        }}
      >
        <div>
          <h2 style={{ margin: 30 }}>Preview Invoice</h2>
          <PDFViewer style={{ width: '100%', height: '700px' }}>
            <MyDocument products={selectedProducts} client={selectedClient} date={date} 
            endDate={formatDate(endDate)} id={maxId+1} address={address}  />
          </PDFViewer>
          <PDFDownloadLink document={<MyDocument products={selectedProducts} client={selectedClient} date={date} 
          endDate={formatDate(endDate)} id={maxId+1} address={address}/>} fileName="invoice.pdf" onClick={saveInvoice}>
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Invoice')}
          </PDFDownloadLink>
          <button onClick={closePreviewModal} className="btn btn-primary" style={{ margin: 20 }}>Close</button>
        </div>
      </Modal>
    </>
  );
};
