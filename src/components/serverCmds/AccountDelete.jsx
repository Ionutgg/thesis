export const AccountDelete = (mail) => {

    const handle = async () => {
        const formData = new FormData();
        formData.append('title', mail);
      
        try {
          const response = await fetch(`http://localhost:3001/delete/account`, {
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
