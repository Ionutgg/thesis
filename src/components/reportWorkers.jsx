import React, { useState, useEffect } from 'react';
import { AuditLogGetSorted } from './serverCmds/auditLogGetSorted';
import '../styles/index.css';

export const ReportWorkers = (date) => {
    const [audit, setAudit] = useState([]); 
    const [totalTimeByWorkers, setTotalTimeByWorkers] = useState({});
    const [processesCount, setProcessesCount] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const log = await AuditLogGetSorted(date);
            setAudit(log);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [date]);       

      useEffect(() => {
        // calculeaza timpul total petrecut de fiecare muncitor
        const calculateTotalTimeByWorkers = () => {
            const totalTimeByNames = {};
            const processesCount = {}; 
            const lastStartActionTimestamp = {};
    
            for (const entry of audit) {
                const { name, action, date: entryDate, hour: entryHour } = entry;
            
                const dateParts = entryDate.split('T')[0].split('-');
                const year = parseInt(dateParts[0]);
                const month = parseInt(dateParts[1]) - 1;
                const day = parseInt(dateParts[2]);
            
                const timeParts = entryHour.split(':');
                const hour = parseInt(timeParts[0]);
                const minute = parseInt(timeParts[1]);
                const second = parseInt(timeParts[2]);
            
                const dateTime = new Date(year, month, day, hour, minute, second);
            
                const timestamp = dateTime.getTime();
        
                if (action.startsWith('Started the production')) {
                    // se seteaza ultima actiune de incepere a unei producti al muncitorului
                    lastStartActionTimestamp[name] = timestamp;
                } else if (action.startsWith('did for')) {
                    // se calculeaza timpul total folosind ultima actiunea de incepere
                    const lastStartTimestamp = lastStartActionTimestamp[name] || 0;
                    const timeDiff = timestamp - lastStartTimestamp;
                    
                    // se updateaza timpul total al muncitorului
                    totalTimeByNames[name] = totalTimeByNames[name] || 0;
                    totalTimeByNames[name] += timeDiff;
        
                    // se numara procesele efectuate de muncitor
                    processesCount[name] = processesCount[name] || 0;
                    processesCount[name]++;
                }
            }
        
            // se seteaza timpul total si numarul de procese numarate pentru fiecare muncitor
            setTotalTimeByWorkers(totalTimeByNames);
            setProcessesCount(processesCount);
        };
    
        calculateTotalTimeByWorkers();
    }, [audit]);
    

        // functie de formatat din milisecunde in ore si minute
    const formatTotalTime = (totalTime) => {
        const hours = Math.floor(totalTime / (1000 * 60 * 60));
        const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours} hours and ${minutes} minutes`;
    };

    return (
        <>
            <label htmlFor="filterMonthYear align" style={{ marginRight: 570, fontSize: 22 }}>Workers:</label>

            <div className="salary-section" style={{ width: 1000, display: 'flex', flexWrap: 'wrap' }}>
                
                {Object.entries(totalTimeByWorkers).map(([worker, totalTime]) => (
                    <div className="box" key={worker} style={{ width: 300, margin: '5px' }}>
                        <div className="box-header">{worker}:</div>
                        <div className="box-content">Processes: {processesCount[worker]}</div>
                        <div className="box-content">{formatTotalTime(totalTime)}</div>
                    </div>
                ))}
                
            </div>

        </>
    );
};
