export const OrderUpdateStatus = (title,clientsName,status) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('clientsName', clientsName);
        formData.append('status', status);

        try {
            const response = await fetch('http://localhost:3001/update/orderStatus', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              
              // Do something after successful upload, e.g., show a success message.
            } else {
              console.error('Failed to upload.');
              // Handle error, e.g., show an error message.
            }
          } catch (error) {
            console.error('Error uploading:', error);
            // Handle error, e.g., show an error message.
          }
        };
  
    return fetchData();
}
