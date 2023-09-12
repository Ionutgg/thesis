import { useEffect, useState } from "react"
import React from 'react'

export const ProductsMaterials = ({ product }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async (product) => {
          try {
            const response = await fetch(`http://localhost:3001/get/materials/needed?product=${product}`);
            
            if (response.ok) {
              const jsonData = await response.json();
              setData(jsonData);
            } else {
              console.error('Failed to fetch data.');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData(product);
      }, []);

    return (
        <div>
            Materials needed :
            {data.map((item, index) => (
                <p key={index} className="productSpace">
                    {item.materials_name} - {item.quantity}
                </p>
            ))}
        </div>
    );
}