export const MaterialsDecrease = async (name, quantity) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
  
    try {
      const response = await fetch(`http://localhost:3001/decrease/material_quantity`, {
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
  