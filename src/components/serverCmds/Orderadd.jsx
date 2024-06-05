export const AddOrder = (title,amount,clientsName,time) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('amount', amount);
        formData.append('clientsName', clientsName);
        formData.append('time', time);

        try {
            const response = await fetch('http://localhost:3001/insert/order', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              console.log('Picture uploaded successfully!');
            } else {
              console.error('Failed to upload.');
            }
          } catch (error) {
            console.error('Error uploading:', error);
          }
        };
  
    return fetchData();
}
