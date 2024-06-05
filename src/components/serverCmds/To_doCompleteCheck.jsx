export const ToDoCompletationCheck = (title,client) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('client', client);
      
        try {
          const response = await fetch('http://localhost:3001/get/to_doSelected', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            const jsonData = await response.json(); // se asteapta raspunsul metodei 

            return (jsonData.result[0].length);
          } else {
            console.error('Failed to fetch data.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      const fetchData1 = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('client', client);
      
        try {
          const response = await fetch('http://localhost:3001/get/to_doSelectedAmount', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            const jsonData = await response.json();

            return ([jsonData.result[0].length,jsonData.result[0]]);
          } else {
            console.error('Failed to fetch data.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      return ([fetchData(), fetchData1()]); // se returneaza valorile din ambele functii
      
}
