export const AccountAddServer = (mail,name,password,status,wc,salary) => {

    const handle = async () => {
        const formData = new FormData();
        formData.append('title', mail);
        formData.append('amount', name);
        formData.append('password', password);
        formData.append('status', status);
        formData.append('wc', wc);
        formData.append('salary', salary);
      
        try {
          const response = await fetch(`http://localhost:3001/insert/account`, {
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
