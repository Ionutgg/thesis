export const CostsAlter = (title) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('title', title);

        try {
            const response = await fetch('http://localhost:3001/alter/costs', {
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
