export const GetClient = async (title) => {
    const formData = new FormData();
    formData.append('title', title);
  
    try {
      const response = await fetch('http://localhost:3001/get/client', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        console.error('Failed to fetch client.');
      }
    } catch (error) {
      console.error('Error fetching client:', error);
    }
  };
  