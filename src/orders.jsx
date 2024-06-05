import React, { useState, useEffect } from 'react';
import {Navbar} from './components/navbar';
import { OrdersAdd } from './components/ordersAdd';
import { GetOrder } from './components/serverCmds/Orderget';
import { ChangeOrder } from './components/serverCmds/Orderchange';
import './styles/index.css'

export const  Orders = () => {
  const [data, setData] = useState([]);
  

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async  (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData('index'));
    const reorderedItems = [...data];
    const [movedItem] = reorderedItems.splice(sourceIndex, 1);
    reorderedItems.splice(targetIndex, 0, movedItem);
    setData(reorderedItems);

    try {
      await ChangeOrder(reorderedItems);
    } catch (error) {
      console.error('Error updating order in server:', error);
    }
  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await GetOrder();
        setData(clientsData);
      } catch (error) {
        console.error('Error fetching clients data:', error);
      }
    };

    fetchData();
  }, []);

  const setColor = (status) => {
    if(status === 'not started'){
      return '#999999';
    }
    if(status === 'working'){
      return '#89CFF0'
    }
    if(status === 'finished'){
      return '#90EE90'
    }
    if(status === 'stopped'){
      return '#FFA500'
    }
  }

  const setTime = (time) =>{
    let hours = ~~(time/60);
    let minutes = time%60;
    if(hours<10)hours='0'+hours;
    if(minutes<10)minutes='0'+minutes;
    return (hours+ 'h' +minutes+ 'm')
  }

  return (
    <>
      <Navbar />
      <OrdersAdd />
      <ul style={{textAlign:'center', listStyle: 'none'}}>
        {data.map((item, index) => (
          <li
          className='orderSpace'
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
              <label style={{background:setColor(item.status)}} className='orderList'>Product: {item.title}</label>
              <label style={{background:setColor(item.status)}} className='orderList2'>Amount: {item.amount}</label>
              <label style={{background:setColor(item.status)}} className='orderList2'>Client: {item.clientsName}</label>
              <label style={{background:setColor(item.status)}} className='orderList2'>Estimated time: {setTime(item.estimatedTime)}</label>
          </li>
        ))}
      </ul>
    </>
  );
};
