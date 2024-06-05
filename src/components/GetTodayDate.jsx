// functie pentru formatarea datei ca "dd/mm/yyyy"
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  // se obtine data de azi
  const todayDate = () => {
    const today = new Date();
    return formatDate(today);
  };
  
  export default todayDate;
  