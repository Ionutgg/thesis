import { useEffect, useState } from "react"
import { GetWcNeeded } from "./serverCmds/wcNeeded";
import React from 'react'

export const ProductsWorckCenter = ({ product }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await GetWcNeeded(product);
            
            setData(response);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [product]);

    return (
        <div className="section">
    <h5>Steps needed :</h5>
    {data.map((item, index) => (
        <p key={index} className="step">
            {item.namewc}
        </p>
    ))}
</div>
    );
}