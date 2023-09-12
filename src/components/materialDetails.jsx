import React, { useEffect, useState } from 'react';
import {Navbar} from './navbar';
import { useParams } from 'react-router-dom';
import '../styles/productsList.css'

export const MaterialDetails = () => {
    const { product } = useParams();
    const [productData, setProductData] = useState(null); // Initial state is null
  
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
            // Update the state with the fetched data
            setProductData(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
  
      handleProduct(); // Call the function to fetch data
    }, [product]); // Include product as a dependency to re-fetch when product changes
  
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
  
  
    return (
      <>
        <Navbar />
        {productData && (
          <div>
            {/* Render the fetched data here */}
            {productData.map((item, index) => (
              <div key={index}>
                <h3>{item.materials_name}</h3>
                {/* Render other properties here */}
                <img className='itemProduct' alt='product' src={require(`../uploads/${item.adress}`)}/>
              </div>
            ))}
            <button onClick={() => handleDelete(product)}>Delete</button>
          </div>
          
        )}
      </>
    );
  };