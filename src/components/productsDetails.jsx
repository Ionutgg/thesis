import React, { useEffect, useState } from 'react';
import {Navbar} from './navbar';
import { useParams } from 'react-router-dom';
import '../styles/productsList.css'
import { ListWC } from './listWC';
import { ListMaterials } from './listMaterials';
import { ProductsMaterials } from './productsMaterials';

export const ProductsDetails = () => {
  const { product } = useParams();
  const [productData, setProductData] = useState(null); // Initial state is null
  let [manufacturing, setManufacturing] = useState(false);
  let [materials, setmaterials] = useState(false);

  useEffect(() => {
    const handleProduct = () => {
      fetch('http://localhost:3001/get/product', {
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

  //obtinerea datelor locale
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    const storedAccountData = localStorage.getItem('loggedInAccount');
    if (storedAccountData) {
      try {
        setAccountData(JSON.parse(storedAccountData));
      } catch (error) {
        console.error('Error parsing account data:', error);
      }
    }
  }, []);

  const handleDelete = (productName) => {
    fetch('http://localhost:3001/delete/product', {
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
            <div key={index} className='productSpace'>
              <h3>{item.title}</h3>
              {/* Render other properties here */}
              <img className='itemProduct' alt='product' src={require(`../uploads/${item.adress}`)}/>
              <ProductsMaterials product={product}/>
            </div>
          ))}
          
          {accountData && (accountData.results[0].user_rank === 'admin' || accountData.results[0].user_rank === 'inginer') ? (
            <p>
              <button className='btnAdd btn btn-primary' onClick={() => handleDelete(product)}>Delete</button>
              <button className='btnAdd btn btn-primary' style={{width : 130}} onClick={() => {
                setManufacturing(!manufacturing);setmaterials(false)}}>Edit Manufacturing</button>
              <button className='btnAdd btn btn-primary' style={{width : 100}} onClick={() => {
                setManufacturing(false);setmaterials(!materials)}}>Edit Materials</button>
            </p>
          ) : (' ')}
          {manufacturing === true ? (<ListWC product={product}/>):(<label></label>)}
          {materials === true ? (<ListMaterials product={product}/>):(<label></label>)}
        </div>
      )}
    </>
  );
};