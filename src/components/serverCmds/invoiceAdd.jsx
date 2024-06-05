export const AddInvoice = (create,due,client,products, address) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('create', create);
        formData.append('due', due);
        formData.append('client', client);
        formData.append('products', products);
        formData.append('address', address);

        try {
            const response = await fetch('http://localhost:3001/insert/invoice', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              console.log('Invoice uploaded successfully!');
            } else {
              console.error('Failed to upload the invoice.');
            }
          } catch (error) {
            console.error('Error uploading:', error);
          }
        };
  
    return fetchData();
}
