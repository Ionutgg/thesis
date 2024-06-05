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
        <div className='workCenter shadow p-3 mb-5 bg-white rounded' style={{ display: 'flex', flexWrap: 'wrap', width: 900, marginLeft: -130 }}>
          {data && data.map((item, index) => (
            <div key={index} style={{ position: 'relative', width: '250px', height: '200px', border: '1px solid #ccc', margin: '10px 20px 10px 0', padding: '10px', boxSizing: 'border-box', overflow: 'hidden' }}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Name: {item.name} <br /><br />
                Mail: {item.mail} <br />
                Job: {item.user_rank}
              </div>
              <a href={'/Account/Edit/' + item.mail} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <button className=" btn btn-primary">Edit</button>
              </a>
            </div>
          ))}
        </div>
      )      
}
