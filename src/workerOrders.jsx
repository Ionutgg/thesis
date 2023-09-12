import React, {useState, useEffect} from 'react'
import {Navbar} from './components/navbar'
import { To_doGet } from './components/serverCmds/To_doGet'
import { OrderUpdateStatus } from './components/serverCmds/OrderUpdateStatus'
import { AuditLogAdd } from './components/serverCmds/AuditLogAdd'
import { To_doOwnedAmount } from './components/serverCmds/To_doUpdateOwnedAmount'
import { ToDoCompletationCheck } from './components/serverCmds/To_doCompleteCheck'
import { ToDoDelete } from './components/serverCmds/To_doDelete'

export const WorkerOrders = () => {
  const [toDo, setToDo] = useState([]);
  const [worker,setWorker] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  let occupied = true;
  let wc,product,client,id;

  useEffect(() => {
    const fetchOrders = async() => {
      const todo = await To_doGet();
      setToDo(todo);
      const storedAccountData = localStorage.getItem('loggedInAccount');
      const parsedData = JSON.parse(storedAccountData);
      const results = parsedData.results;
      setWorker(results);
    }
  
    fetchOrders();
  }, []); // Empty dependency array, no dependencies
  
  
  const handle = ()=>{
    for(let i in toDo){
      for (let l in worker[0].wc.split(',')){
      //primul caz pentru comenzi disponibile 
      if (toDo[i].wc === worker[0].wc.split(',')[l] && occupied && toDo[i].type.toLowerCase() === 'ss' && 
      toDo[i].owned_amount < toDo[i].amount){
        //alt caz
        occupied = false;
        wc = toDo[i].wc;
        client = toDo[i].client;
        product = toDo[i].title;
        id = toDo[i].id;
        return(
          <div className='text-center'>
            To do in {toDo[i].wc} for {toDo[i].title}
            <div className='btnCircle'>
            <button className="circular-button btn" style={{backgroundColor: 'Green'}} onClick={Start}>Start</button>
            <button id='btnStop' className="circular-button btn" style={{backgroundColor: 'Orange'}} onClick={Stop} disabled={buttonDisabled}>Stop!</button>
            <button id='btnFinish' className="circular-button btn" style={{backgroundColor: 'Red'}} onClick={Finished} disabled={buttonDisabled}>Finished</button>
          </div></div>
        )
      }}
      for (let l in worker[0].wc.split(',')){
      //al doilea caz pentru comenzi disponibile in caz in care ceva a fost deja facut din primul caz
      if (toDo[i].wc === worker[0].wc.split(',')[l] && occupied && 
      toDo[i].owned_amount < toDo[i].amount && toDo[i-1].owned_amount > toDo[i].owned_amount ){
        occupied = false;
        wc = toDo[i].wc;
        client = toDo[i].client;
        product = toDo[i].title;
        id = toDo[i].id;
        return(
          <div className='text-center'>
            To do in {toDo[i].wc} for {toDo[i].title}
            <div className='btnCircle'>
            <button className="circular-button" style={{backgroundColor: 'Green'}} onClick={Start}>Start</button>
            <button className="circular-button btn" style={{backgroundColor: 'Orange'}} onClick={Stop} disabled={buttonDisabled}>Stop!</button>
            <button className="circular-button btn" style={{backgroundColor: 'Red'}} onClick={Finished} disabled={buttonDisabled}>Finished</button>
          </div></div>
        )
      }}}
    return(
      <div>
        Nothing to do
      </div>
    )
  }

  const getDate= ()=>{
    const today = new Date();
    const month = today.getMonth()+1;
      const year = today.getFullYear();
      const date = today.getDate();
  
      return(year + "-" + month + "-" +date);
  }

  const getHour= ()=>{
    const today = new Date();
    const hour = today.getHours();
      const minutes = today.getMinutes();
      return(hour+":"+minutes  );
  }

  const Start = ()=>{
    OrderUpdateStatus(product,client,'working');
    AuditLogAdd(worker[0].name,'Started the production for '+product+' with '+wc,getDate(),getHour());
    setButtonDisabled(false);
  }

  const Stop =async ()=>{
    await AuditLogAdd(worker[0].name,'Stopped the production for '+product+' on '+wc,getDate(),getHour()); 
    await OrderUpdateStatus(product,client,'stopped');
  }

  const Finished =async ()=>{
    let a,b;
    
    await AuditLogAdd(worker[0].name,'did for '+product+' with '+wc,getDate(),getHour());
    await To_doOwnedAmount(id);
    a = await ToDoCompletationCheck(product,client)[0];
    b = await ToDoCompletationCheck(product,client)[1];
    if(a === b){
       OrderUpdateStatus(product,client,'finished');
       ToDoDelete(product,client);
    }
    window.location.reload();
  }

  return (
    <div>
        <Navbar/>
        {handle()}
        
    </div>
  )
}
