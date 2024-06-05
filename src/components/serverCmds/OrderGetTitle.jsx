export const OrderGetTitle = (title) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('title', title);

        try {
            const response = await fetch('http://localhost:3001/get/manufacturing/time', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
                const jsonData = await response.json();
                return jsonData.data;
            } else {
              console.error('Failed to upload.');
            }
          } catch (error) {
            console.error('Error uploading:', error);
          }
        };
  
    return fetchData();
}
