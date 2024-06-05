export default function GetInv() {

    let data = [];
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/get/pic', {
          method: 'GET',
        });

        if (response.ok) {
          data = await response.json();
          return fetchDataMaterials();
        } else {
          console.error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataMaterials = async () => {
      try {
        const response = await fetch('http://localhost:3001/get/materials', {
          method: 'GET',
        });

        if (response.ok) {
          const jsonData = await response.json();
          data = [...data, ...jsonData]; // corectare date
          return data;
        } else {
          console.error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
  return fetchData();
}
