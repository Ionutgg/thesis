export const CostsAdd = (salary,electricity,test,monthYear) => {

    const handle = async () => {
        const formData = new FormData();
        formData.append('salary', salary);
        formData.append('electricity', electricity);
        formData.append('test', test);
        formData.append('monthYear', monthYear);
      
        try {
          const response = await fetch(`http://localhost:3001/insert/costs`, {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            console.log('Data inserted successfully!');
          } else {
            console.error('Failed to insert data.');
          }
        } catch (error) {
          console.error('Error inserting data:', error);
        }
      };

  return handle();
}
