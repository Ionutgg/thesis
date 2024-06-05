export const ToDoDelete = (title,client) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('client', client);
      
        try {
          const response = await fetch('http://localhost:3001/delete/to_do', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            console.log('Data inserted successfully!');
          } else {
            console.error('Failed to fetch data.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      return (fetchData());
      
}
