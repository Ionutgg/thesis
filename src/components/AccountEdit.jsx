import React, { useEffect, useState } from 'react';
import { GetAccount } from './serverCmds/AccountGet';
import { useParams } from 'react-router-dom';
import { WCGet } from './serverCmds/WCGet';
import {Navbar} from './navbar';
import { AccountDelete } from './serverCmds/AccountDelete';
import { AccountUpdate } from './serverCmds/AccountUpdate';

export const AccountEdit = () => {
    const { name } = useParams();
    const [data, setData] = useState({});
    const [wc, setWc] = useState([]);
    const [nameCont, setNameCont] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [job, setJob] = useState('');
    const [machine, setMachine] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountData = await GetAccount(name);
                const wcData = await WCGet();
                setData(accountData[0]);
                setWc(wcData);
                defaultValues(accountData[0]);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };

        fetchData();
    }, [name]);

    const defaultValues = (accountData) => {
        setNameCont(accountData.name);
        setMail(accountData.mail);
        setJob(accountData.user_rank);
        setPassword(accountData.password);
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        // Add or remove the value from the machine array based on the checkbox state
        if (checked) {
            setMachine(prevMachine => [...prevMachine, name]);
        } else {
            setMachine(prevMachine => prevMachine.filter(item => item !== name));
        }
    };

    const handleSubmit = () => {
        AccountUpdate(nameCont,mail,password,job,machine,name)
    };
    const handleDelete = () => {
        console.log('Mail:', mail);
        AccountDelete(mail);
        
    };

    return (
        <div>
            <Navbar />
            <div className='accountDetails'>
                <label className='aclabel label info'>Name : </label>
                <input placeholder={data.name} value={nameCont} onChange={(event) => setNameCont(event.target.value)} /> <br />
                <label className='aclabel label info'>Password : </label>
                <input placeholder={data.password} value={password} onChange={(event) => setPassword(event.target.value)} /> <br />
                <label className='aclabel label info'>Mail : </label>
                <input placeholder={data.mail} value={mail} onChange={(event) => setMail(event.target.value)} /><br />
                <label className='aclabel label info'>Job : </label>
                <input placeholder={data.user_rank} value={job} onChange={(event) => setJob(event.target.value)} /><br />
            </div>
            <div className='accountCheck'>
                {wc && wc.map((item) => (
                    <div key={item.namewc}>
                        <label className='wcLabel'>{item.namewc}</label>
                        <input className='accountCheck' type="checkbox" id={item.namewc} name={item.namewc} value={item.namewc} onChange={handleCheckboxChange}></input>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="btnAdd btn btn-primary">Edit</button>
            <button onClick={handleDelete} className="btnAdd btn btn-primary">Delete</button>
        </div>
    );
};
