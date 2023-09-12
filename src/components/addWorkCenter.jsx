import React, { useState } from 'react'
import {Navbar} from './navbar'
import '../styles/index.css'

const AddWorkCenter = () => {
    const [wcName, setwcName] = useState('');
    const [description, setDescription] = useState(null);
  
    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };
  
    const handleWcNameChange = (event) => {
      setwcName(event.target.value);
    };
  
    const handleSubmit = async () => {
      const formData = new FormData();
      formData.append('wcName', wcName);
      formData.append('description', description);
  
      try {
        const response = await fetch('http://localhost:3001/insert/workcenter', {
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
  
    return (
      <>
        <Navbar />
        <form className="form">
  <div className="col-sm-4">
    <input type="text" onChange={handleWcNameChange} className="form-control" placeholder="Name"/>
    <textarea
    onChange={handleDescriptionChange}
    className="form-control"
    placeholder="Description"
    style={{ width: '100%', height: '100px' }} // Adjust the height as needed
    />
  </div>
  <button onClick={handleSubmit} style={{ marginTop: 20 }}>Submit</button>
        </form>
        
      </>
    );
  };
  
  export default AddWorkCenter;