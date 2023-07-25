import getFormattedDate from 'utils/getFormattedDate/getFormattedDate';

describe('getFormattedDate() function tests', () => {
	it('should throw error if first argument is not \'long\' or \'short\' ', () => {
		expect(() => getFormattedDate('something', 123)).toThrow('Invalid format');
	});

	it('should throw error if the second argument is not type string or empty string', () => {
		expect(() => getFormattedDate('long', 123)).toThrow('Invalid date type');
	});
});