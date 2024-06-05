export const ManufacturingGet = async (title) => {
    let time=0;
    const formData = new FormData();
    formData.append('title', title);
  
    try {
      const response = await fetch('http://localhost:3001/get/manufacturing/time', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
       // se trece prin tot raspunsul
      if (data.success) {
        return data;
      } else {
        console.log('Failed: ' + title);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  