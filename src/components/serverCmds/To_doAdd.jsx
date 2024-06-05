export const To_doAdd = (wc,type,order,title,amount,owned_amount,client) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('wc', wc);
        formData.append('type', type);
        formData.append('order', order);
        formData.append('title', title);
        formData.append('amount', amount);
        formData.append('owned_amount', owned_amount);
        formData.append('client', client);

        try {
            const response = await fetch('http://localhost:3001/insert/to_do', {
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
