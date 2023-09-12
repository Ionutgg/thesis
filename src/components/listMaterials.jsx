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
          // Remove both the name and number from the list
          setMaterials(materials.filter(item => item.name !== name));
        } else {
          const updatedMaterials = [...materials];
      
          // Check if the material already exists in the array
          const existingMaterialIndex = updatedMaterials.findIndex(item => item.name === name);
          
          if (existingMaterialIndex !== -1) {
            // Update the existing material's nr
            updatedMaterials[existingMaterialIndex].nr = nr;
          } else {
            // Add a new material
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
            // Do something after successful upload, e.g., show a success message.
          } else {
            console.error('Failed to upload picture.');
            // Handle error, e.g., show an error message.
          }
        } catch (error) {
          console.error('Error uploading picture:', error);
          // Handle error, e.g., show an error message.
        }
      };

      const submite = () => {
        materials.forEach(item =>{
            handleSubmit(product,item.name,item.nr);
        })
      }

    return (
      <div className='workCenter'>
        {data && // Check if productData is not null before mapping
          data.map((item, index) => (
            <div key={index}>
              <label className='wcLabel'>{item.materials_name}</label>
              <input className='wcText' type="text"  placeholder="Nr." onChange={(event) => addMaterials(item.materials_name,event.target.value)}/>
              {/* Render other properties here */}
            </div>
            ))}
          <button onClick={() => {submite()}}>Submit</button>
      </div>
    );
}
