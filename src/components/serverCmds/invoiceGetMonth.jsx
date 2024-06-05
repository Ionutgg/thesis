export const InvoicesGetByMonthYear = async (monthYear) => {
    try {
      const response = await fetch(`http://localhost:3001/get/invoice/${monthYear}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else {
        console.error('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  