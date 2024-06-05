export const OrderUpdateOwnedAmount = (title,clientsName,wc) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('clientsName', clientsName);
        formData.append('wc', wc);

        try {
            const response = await fetch('http://localhost:3001/update/orderAmountOwned', {
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
