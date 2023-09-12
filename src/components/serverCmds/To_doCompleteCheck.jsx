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
            const jsonData = await response.json(); // Await the response.json() method
            return (jsonData.result[0].length);
            // Do something with jsonData
          } else {
            console.error('Failed to fetch data.');
            // Handle error, e.g., show an error message.
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error, e.g., show an error message.
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
            const jsonData = await response.json(); // Await the response.json() method
            return (jsonData.result[0].length);
            // Do something with jsonData
          } else {
            console.error('Failed to fetch data.');
            // Handle error, e.g., show an error message.
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle error, e.g., show an error message.
        }
      };
      
      return ([fetchData(), fetchData1()]); // Use Promise.all to run both fetch calls concurrently
      
}
