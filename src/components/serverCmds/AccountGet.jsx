export const GetAccount = async (mail) => {
    const fetchData = async () => {
      const params = new URLSearchParams();
      params.append('mail', mail);
  
      try {
        const response = await fetch(`http://localhost:3001/get/account?${params.toString()}`);
  
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
  
    return await fetchData(); 
  };
  