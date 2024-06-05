import React, { useEffect, useState } from 'react';
import {Navbar} from './navbar';
import { useParams } from 'react-router-dom';
import '../styles/productsList.css'
import { ListWC } from './listWC';
import { ListMaterials } from './listMaterials';
import { ProductsMaterials } from './productsMaterials';
import {ProductsWorckCenter} from './productsWC';
import { ProductsMaterialsCosts } from './productsCosts';

export const ProductsDetails = () => {
  const { product } = useParams();
  const [productData, setProductData] = useState(null);
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
          setProductData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    handleProduct(); // se cheama functia pentru obtinerea datelor
  }, [product]);

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
      {productData.map((item, index) => (
        <div key={index} className='productSpace'>
          <h3 className="title">{item.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img className='itemProduct' alt='product' src={require(`../uploads/${item.adress}`)} />
            <ProductsMaterials product={product}/>
            <ProductsWorckCenter product={product}/>
            <ProductsMaterialsCosts product={product} price={productData[0].price} ammount={productData[0].quantity}/>
          </div>
          {accountData && (accountData.results[0].user_rank === 'admin' || accountData.results[0].user_rank === 'inginer') ? (
            <div className="buttons">
              <button className='btnAdd btn btn-danger' onClick={() => handleDelete(product)}>Delete</button>
              <button className='btnAdd btn btn-primary' style={{ width: '180px' }} onClick={() => { setManufacturing(!manufacturing); setmaterials(false) }}>Edit Manufacturing</button>
              <button className='btnAdd btn btn-primary' onClick={() => { setManufacturing(false); setmaterials(!materials) }}>Edit Materials</button>
            </div>
          ) : (' ')}
        </div>
      ))}
      {manufacturing === true ? (<ListWC product={product} />) : (<label></label>)}
      {materials === true ? (<ListMaterials product={product} />) : (<label></label>)}
    </div>
  )}
</>

  );
};