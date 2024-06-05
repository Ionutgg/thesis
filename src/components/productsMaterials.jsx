import { useEffect, useState } from "react"
import { GetMaterialsNeeded } from "./serverCmds/materialsNeeded";
import React from 'react'

export const ProductsMaterials = ({ product }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await GetMaterialsNeeded(product);
            
            setData(response);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [product]);

    return (
      <div className="section">
      <h5>Materials needed :</h5>
      {data.map((item, index) => (
          <p key={index} className="material">
              {item.materials_name} - {item.quantity}
          </p>
      ))}
  </div>
    );
}