export const To_doOwnedAmount = (id) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('id', id);

        try {
            const response = await fetch('http://localhost:3001/update/to_do', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              console.log('Picture uploaded successfully!');
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
