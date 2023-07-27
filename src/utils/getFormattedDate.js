function getFormattedDate(format, date) {
	let options;
	if (format === 'long') {
		options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric', 
		};
	} else if (format === 'short'){
		options = {
			weekday: 'short',
			year: 'numeric',
			month: 'long',
			day: 'numeric', 
		};

	} else {
		throw new Error('Invalid format');
	}

	if(typeof date != 'string' || date == ''){
		throw new Error('Invalid date type');
	} 
	
	const newDate = new Date(date);

	return newDate.toLocaleDateString('en-UK', options);
}

export default getFormattedDate;
