const currentDate = new Date();
const currentDateFormat = `Current Date and Time: ${currentDate.toLocaleString('en-US', { weekday: 'short' })} ${currentDate.toLocaleString('en-US', { month: 'short' })} ${currentDate.getDate()} ${currentDate.getFullYear()} ${currentDate.getHours()}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')} ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

console.log(currentDateFormat); 
function formatDateMMDDYYYY(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `Formatted Date (MM/DD/YYYY): ${month}/${day}/${year}`;
}
const testDate = new Date("Fri Sep 27 2024 16:16:11 GMT+0500 (Pakistan Standard Time)");
console.log(formatDateMMDDYYYY(testDate));
function formatDateLong(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return `Formatted Date (Month Day, Year): ${date.toLocaleDateString('en-US', options)}`;
}

console.log(formatDateLong(testDate)); 

