import React, { useState } from 'react';
import {Navbar} from './navbar';
import '../styles/index.css';

const AddInv = () => {
  const [productName, setProductName] = useState('');
  const [pictureFile, setPictureFile] = useState(null);
  const [isProduct, setIsProduct] = useState(true); 

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPictureFile(event.target.files[0]);
  };

  // comuta selectarea intre produs si material
  const changeValue = () => {
    setIsProduct((prevState) => !prevState);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productAdress', pictureFile);

    try {
      const response = await fetch(`http://localhost:3001/insert/${isProduct ? 'product' : 'material'}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Picture uploaded successfully!');
      } else {
        console.error('Failed to upload picture.');
      }
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='app'>
        <h1>Add Product</h1>
        <select onChange={changeValue} id="type">
          <option value="product">Product</option>
          <option value="material">Material</option>
        </select>
        <div className='form'>
          <label>Name:</label>
          <input type='text' value={productName} onChange={handleProductNameChange} />
          <label>Img:</label>
          <input type='file' onChange={handlePictureChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default AddInv;
