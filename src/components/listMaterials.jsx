import React, { useState, useEffect } from 'react';
import '../styles/index.css'

export const ListMaterials = ({product}) => {
    const [data, setData] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/get/materials', {
            method: 'GET',
          });
  
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
  
      fetchData();
    }, []);

    const addMaterials = (name, nr) => {
        if (!nr || nr === '0') {
          // se scoate numele si numarul din lista
          setMaterials(materials.filter(item => item.name !== name));
        } else {
          const updatedMaterials = [...materials];
      
          // se verifica daca materialul exists deja
          const existingMaterialIndex = updatedMaterials.findIndex(item => item.name === name);
          
          if (existingMaterialIndex !== -1) {
            // se seteaza numarul materialului existent
            updatedMaterials[existingMaterialIndex].nr = nr;
          } else {
            // se adauga un material nou
            updatedMaterials.push({ name, nr });
          }
      
          setMaterials(updatedMaterials);
        }
      };

      const handleSubmit = async (title,materials_name,quantity) => {
        const formData = new FormData();
        formData.append('title', product);
        formData.append('materials_name', materials_name);
        formData.append('quantity', quantity);
    
        try {
          const response = await fetch('http://localhost:3001/insert/products_materials', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            console.log('Picture uploaded successfully!');
          } else {
            console.error('Failed to upload picture.');
          }
        } catch (error) {
          console.error('Error uploading picture:', error);
        }
      };

      const submite = () => {
        materials.forEach(item =>{
            handleSubmit(product,item.name,item.nr);
        })
      }

    return (
      <div className='workCenter'>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <label className='wcLabel'>{item.materials_name}</label>
              <input className='wcText' type="text"  placeholder="Nr." onChange={(event) => addMaterials(item.materials_name,event.target.value)}/>
            </div>
            ))}
          <button onClick={() => {submite()}}>Submit</button>
      </div>
    );
}
