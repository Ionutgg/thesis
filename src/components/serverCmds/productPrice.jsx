export const SetProductPrice = (name,price) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);

        try {
            const response = await fetch('http://localhost:3001/update/product_price', {
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
