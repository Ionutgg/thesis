export const AuditLogAdd = (name,action,date,hour) => {

    const fetchData = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('action', action);
        formData.append('date', date);
        formData.append('hour', hour);

        try {
            const response = await fetch('http://localhost:3001/insert/auditLog', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              console.log('Picture uploaded successfully!');
              // Do something after successful upload, e.g., show a success message.
            } else {
              console.error('Failed to upload.');
              // Handle error, e.g., show an error message.
            }
          } catch (error) {
            console.error('Error uploading:', error);
            // Handle error, e.g., show an error message.
          }
        };
  
    return fetchData();
}
