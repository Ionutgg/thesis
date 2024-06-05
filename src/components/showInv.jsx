import React, { useEffect, useState } from 'react';
import GetInv from './serverCmds/getInv';
import '../styles/productsList.css'

export const ShowInv = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const clientsData = await GetInv();
        setData(clientsData);
    };

    fetchData();
  }, []); 

  return (
    <div className='container'>
      {data.map((item, index) => (                                                     //sar putea sa aibe nevoie de modificare
        <div className='itemProduct' key={index}><a href={'/Inventory/'+ (item.title=== undefined ? 'materials/'+item.materials_name : 'product/'+item.title)}>
          <label>{item.title}</label>
          <label>{item.materials_name}</label>
          <img alt='product' src={require(`../uploads/${item.adress}`)}/>
          <label>Quantity : {item.quantity}</label></a>
        </div>
      ))}
    </div>
  );

};
