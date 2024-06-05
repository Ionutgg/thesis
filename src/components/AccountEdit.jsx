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
    const [salary, setSalary] = useState([]);
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
        setSalary(accountData.salary);
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        if (checked) {
            setMachine(prevMachine => [...prevMachine, name]);
        } else {
            setMachine(prevMachine => prevMachine.filter(item => item !== name));
        }
    };

    const handleSubmit = () => {
        AccountUpdate(nameCont,mail,password,job,machine,name,salary)
    };
    const handleDelete = () => {
        console.log('Mail:', mail);
        AccountDelete(mail);
    };

    return (
        <div>
            <Navbar />
            <div className='accountDetails' style={{margin:50}}>
                <label className='aclabel label info rounded-pill'>Name:</label>
                <input style={{ marginLeft: '10px' }}  placeholder={data.name} value={nameCont} onChange={(event) => setNameCont(event.target.value)} /> <br />
                <label className='aclabel label info rounded-pill'>Password:</label>
                <input style={{ marginLeft: '10px' }}  placeholder={data.password} value={password} onChange={(event) => setPassword(event.target.value)} /> <br />
                <label className='aclabel label info rounded-pill'>Mail:</label>
                <input style={{ marginLeft: '10px' }}  placeholder={data.mail} value={mail} onChange={(event) => setMail(event.target.value)} /><br />
                <label className='aclabel label info rounded-pill'>Job:</label>
                <input style={{ marginLeft: '10px' }}  placeholder={data.user_rank} value={job} onChange={(event) => setJob(event.target.value)} /><br />
                <label className='aclabel label info rounded-pill'>Salary:</label>
                <input style={{ marginLeft: '10px' }}  placeholder={data.salary} value={salary} onChange={(event) => setSalary(event.target.value)} /><br />
            </div>

            <div className='accountCheck' style={{margin:50}}>
                {wc && wc.map((item) => (
                    <div key={item.namewc}>
                        <label className='wcLabel rounded-pill'><span style={{marginLeft:10}}>{item.namewc}</span></label>
                        <input className='accountCheck' type="checkbox" id={item.namewc} name={item.namewc} value={item.namewc} onChange={handleCheckboxChange}></input>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="btnAdd btn btn-primary" style={{marginLeft:550}}>Edit</button>
            <button onClick={handleDelete} className="btnAdd btn btn-danger">Delete</button>
        </div>
    );
};
