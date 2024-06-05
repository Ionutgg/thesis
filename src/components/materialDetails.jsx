import React, { useEffect, useState } from 'react';
import {Navbar} from './navbar';
import { useParams } from 'react-router-dom';
import { MaterialsPrice } from './serverCmds/materialsPrice';
import { MaterialsQuantity } from './serverCmds/materialsQuantity';
import '../styles/productsList.css'

export const MaterialDetails = () => {
    const { product } = useParams();
    const [productData, setProductData] = useState(null);
    const [price, setPrice] = useState([]);
    const [quantity, setQuantity] = useState([]);
  
    useEffect(() => {
      const handleProduct = () => {
        fetch('http://localhost:3001/get/material', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product }),
        })
          .then((response) => response.json())
          .then((data) => {
            
            setProductData(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
  
      handleProduct(); 
    }, [product]);
  
    const handleDelete = (productName) => {
      fetch('http://localhost:3001/delete/material', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: productName })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Sucesfull');
        } else {
          console.log('Unsucesfull');
        }
      })
      .catch(error => {
        console.error('Error during product deletion:', error);
      });
    };
    
    const handlePrice = (e) =>{
      setPrice(e.target.value);
    };

    const handleQuantity = (e) =>{
      setQuantity(e.target.value);
    };

    const handleSubmit = () =>{
      MaterialsPrice(product,price);
    }

    const handleSubmit1 = () =>{
      MaterialsQuantity(product,quantity);
    }
  
    return (
      <>
        <Navbar />
        {productData && (
          <div className='productSpace'>
            {productData.map((item, index) => (
              <div key={index}>
                <h3 className="title">{item.materials_name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img className='itemProduct' alt='product' src={require(`../uploads/${item.adress}`)}/>
                    <div>
                      <div>
                        <label style={{marginLeft: 25}}>Price : </label>
                        <input style={{ marginLeft: 10, marginBottom: 30 }} placeholder={item.price} type='number' onChange={handlePrice}></input>
                        <button className='btnAdd btn btn-primary' onClick={handleSubmit}>Set new price</button>
                      </div>
                      <div>
                        <label>Quantity : </label>
                        <input style={{ marginLeft: 10 }} placeholder={item.quantity} type='number' onChange={handleQuantity}></input>
                        <button className='btnAdd btn btn-primary' onClick={handleSubmit1}>Set new quantity</button>
                      </div>
                    </div>

                  </div>
              </div>
            ))}
            <button className='btnAdd btn btn-danger' onClick={() => handleDelete(product)}>Delete</button>
          </div>
          
        )}
      </>
    );
  };