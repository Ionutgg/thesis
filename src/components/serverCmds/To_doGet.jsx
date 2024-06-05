export const To_doGet = async () => {
    try {
      const response = await fetch('http://localhost:3001/get/to_do', {
        method: 'GET',
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else {
        console.error('Failed to fetch data:', response.statusText);
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  