export const MaterialsPrice = async (name, price) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
  
    try {
      const response = await fetch(`http://localhost:3001/update/material_price`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Data Updated!');
      } else {
        console.error('Failed to update data.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  