import React, {useEffect, useState} from 'react'
import { GetAccounts } from './serverCmds/AccountsGet';
import '../styles/index.css'

export const AccountList = () => {
    
  const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const wcData = await GetAccounts();
            setData(wcData);
        };
      
        fetchData();
      }, []);


  return (
    <div className='workCenter'>
      {data && data.map((item, index) => (
          <div key={index}>
            <label className='wcLabel'>{item.name}</label>
            <a href={'/Account/Edit/'+item.mail}><button className="btnAdd btn btn-primary">Edit</button></a>
          </div>
          ))}
    </div>
  )
}
