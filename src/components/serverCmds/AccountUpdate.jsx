export const AccountUpdate = async (nume, mail, password, job, wc, mailOg, salary) => {
    const formData = new FormData();
    formData.append('mail', mail);
    formData.append('nume', nume);
    formData.append('password', password);
    formData.append('job', job);
    formData.append('wc', wc);
    formData.append('mailOg', mailOg);
    formData.append('salary', salary);
  
    try {
      const response = await fetch(`http://localhost:3001/update/account`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Data Updated!');
      } else {
        console.error('Failed to update data.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  