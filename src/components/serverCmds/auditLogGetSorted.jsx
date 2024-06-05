export const AuditLogGetSorted = async (date) => {
    try {
      const response = await fetch(`http://localhost:3001/get/auditlog/${date}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else {
        console.error('Failed to fetch data.');
        return []; 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  