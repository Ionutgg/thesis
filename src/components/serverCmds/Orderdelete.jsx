export const DeleteOrder = () => {
    const handle = async () => {
      try {
        const response = await fetch('http://localhost:3001/delete/order', {
          method: 'GET',
        });
  
        if (response.ok) {
          return;
        } else {
          console.error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return handle(); 
  };
  