function getFormattedDate(format, date) {
  let options;
  const newDate = new Date(date);
  if (format === 'long') {
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  }
  if (format === 'short') {
    options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  }
  return newDate.toLocaleDateString('en-UK', options);
}

export default getFormattedDate;
