import React from 'react';
import Modal from 'react-modal';
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from './bill';

const InvoicePreviewModal = ({ isOpen, onClose, invoice }) => {
  if (!invoice) return null; // returneaza null daca factura este null sau undefined

  const { products, client_name, create, due, id_Invoice, address } = invoice;

  // functie pentru formatarea produselor
  const parseItemListString = (itemListString) => {
    const items = itemListString.split('/');
    return items.map(item => {
      const [title, amount, price] = item.split(' ');
      return { title, amount: parseInt(amount), price: parseInt(price) };
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Preview PDF Modal"
      style={{content: {width: 'auto',height: 'auto',margin: 'auto',},}}
    >
      <div>
        <h2 style={{ margin: 30 }}>Preview Invoice</h2>
        <PDFViewer style={{ width: '100%', height: '700px' }}>
          <MyDocument
            products={parseItemListString(products)}
            client={client_name} date={create}
            endDate={due} id = {id_Invoice} address={address}
          />
        </PDFViewer>
        <button onClick={onClose} className="btn btn-primary" style={{ margin: 20 }}>Close</button>
      </div>
    </Modal>
  );
}

export default InvoicePreviewModal;
