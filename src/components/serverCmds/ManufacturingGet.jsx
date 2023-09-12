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
  
       // Log the entire response object
  
      if (data.success) {
      //  console.log(title)
        return data;
        // Do something with data.data (the actual result from the server)
      } else {
        console.log('Failed: ' + title);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    
  };
  