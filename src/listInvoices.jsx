import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navbar';
import { GetInvoices } from './components/serverCmds/InvoiceGet';
import './styles/index.css';
import InvoicePreviewModal from './components/pdf/bill2';

export default function ListInvoices() {
  const [data, setData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State pentru a urmari factura selectata
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // State pentru a seta previzualizarea pdf-ului

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await GetInvoices();
        setData(clientsData);
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = (productsString) => {
    // se separa in produse separate
    const products = productsString.split('/');
    
    // se calculeaza valoarea totala
    const totalPrice = products.reduce((acc, product) => {
      const [, amount, price] = product.split(' '); // obtinem cantitate si pret din fiecare produs
      return acc + parseInt(amount) * parseInt(price); // se calculeaza pretul total pentru fiecare produs
    }, 0);
  
    return totalPrice; // se returneaza pretul total
  };

  // functie pentru gestionarea click-ului pe o linie
  const handleRowClick = (invoice) => {
    setSelectedInvoice(invoice); // se seteaza factura de pe rand
    setIsPreviewOpen(true); // se deschide previzualizarea pdf-ului
  };

  return (
    <>
      <Navbar />
      <div className="invoice-table-container">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Name</th>
              <th>Create</th>
              <th>Due</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((invoice, index) => (
              <tr key={index} onClick={() => handleRowClick(invoice)}>
                <td>{index + 1}</td>
                <td>{invoice.client_name}</td>
                <td>{invoice.create}</td>
                <td>{invoice.due}</td>
                <td>{calculateTotalPrice(invoice.products)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Previzualizare PDF Modal */}
      <InvoicePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        invoice={selectedInvoice}
      />
    </>
  );
}
