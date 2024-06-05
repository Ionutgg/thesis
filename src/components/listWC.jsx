import React, { useState, useEffect } from 'react';
import { WCGet } from './serverCmds/WCGet';
import '../styles/index.css'

export const ListWC = ({product}) => {
  const [data, setData] = useState([]);
  const [time,setTime] = useState([]);
  const [order,setOrder] = useState([]);
  const [type,setType]= useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await WCGet();
      setData(jsonData);
    };

    fetchData();
  }, []);

  const addItem = async () => {
    const combinedData = [];
    
    for (let i = 0; i < time.length; i++) {
      const singleObject = {
        name: time[i].name,
        time: time[i].time,
        order: order[i].order,
        type: type[i].type,
      };
      combinedData.push(singleObject);
    }
  
    // se trimit toate datele
    try {
      await Promise.all(combinedData.map(item => senddata(item)));
      console.log('All data sent successfully');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
  const senddata = async ({ name, time, order, type }) => {
    const formData = new FormData();
    formData.append('namewc', name);
    formData.append('time', time);
    formData.append('order', order);
    formData.append('type', type);
    formData.append('title', product);
  
    try {
      const response = await fetch('http://localhost:3001/insert/products_workcenter', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Data uploaded successfully!');
      } else {
        console.error('Failed to upload data.');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  //Adaugarea in variabile
  const addTime = (name, event) => {
    if (event === '') {
      // se scot obiectele cu numele specific
      const updatedTime = time.filter(item => item.name !== name);
      setTime(updatedTime);
    } else {
      if (time.length === 0) {
        const newTime = { name: name, time: event };
        setTime([newTime]);
      } else {
        const existingItemIndex = time.findIndex(item => item.name === name);
        if (existingItemIndex !== -1) {
          const updatedTime = [...time];
          updatedTime[existingItemIndex].time = event;
          setTime(updatedTime);
        } else {
          const newTime = { name: name, time: event };
          setTime([...time, newTime]);
        }}}
  };
  
  const addOrder = (name, event) => {
    if (event === '') {
      // se scot obiectele cu numele specific
      const updatedOrder = order.filter(item => item.name !== name);
      setOrder(updatedOrder);
    }else{
    if (order.length === 0) {
      const newOrder = { name: name, order: event };
      setOrder([newOrder]);
    } else {
      const existingItemIndex = order.findIndex(item => item.name === name);
      if (existingItemIndex !== -1) {
        const updatedOrder = [...order];
        updatedOrder[existingItemIndex].order = event;
        setOrder(updatedOrder);
      } else {
        const newOrder = { name: name, order: event };
        setOrder([...order, newOrder]);
      }}}
  };  
  const addType = (name, event) => {
    if (event === '') {
      // se scot obiectele cu numele specific
      const updatedType = type.filter(item => item.name !== name);
      setType(updatedType);
      console.log(type);
    } else {
      if (type.length === 0) {
        const newType = { name: name, type: event };
        setType([newType]);
        console.log(type);
      } else {
        const existingItemIndex = type.findIndex(item => item.name === name);
        if (existingItemIndex !== -1) {
          const updatedType = [...type];
          updatedType[existingItemIndex].type = event;
          setType(updatedType);
          console.log(type);
        } else {
          const newType = { name: name, type: event };
          setType([...type, newType]);
          console.log(type);
        }
      }
    }
  };  


  return (
    <div className='workCenter'>
      {data && // se verifica daca productData nu este null inainte the map
        data.map((item, index) => (
          <div key={index}>
            <label className='wcLabel'>{item.namewc}</label>
            <input className='wcText' type="text"  placeholder="Time" onChange={(event) => {addTime(item.namewc,event.target.value)}}/>
            <input className='wcText' type="text"  placeholder="Order" onChange={(event) => {addOrder(item.namewc,event.target.value)}}/>
            <input className='wcText' type="text"  placeholder="Type" onChange={(event) => {addType(item.namewc,event.target.value)}}/>
          </div>
          ))}
        <button onClick={() => {addItem()}}>Submit</button>
    </div>
  );
};
