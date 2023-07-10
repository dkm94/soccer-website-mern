import axios from 'axios';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';

export {
	BASE_URL,
	getMatches,
	getScoreBoard,
	getMatchesOfTheDay,
	getCompetitions,
};

const getMatchesOfTheDay = async () => {
	try {
		const { data } = await axios.get(`${ BASE_URL }/api/soccer/matches`);
		return data;
	} catch (error) {
		throw new Error('Failed to fetch data from API Football data server', error);
	}
};

const getCompetitions = async () => {
	try {
		const { data } = await axios.get(`${ BASE_URL }/api/soccer/competitions`);
		return data;
	} catch (error) {
		throw new Error('Failed to fetch data from API Football data server', error);
	}
};

const getMatches = async (from, to) => {
	const config = {
		method: 'get',
		url: `${ BASE_URL }/api/soccer/matches/history/${ from }/${ to }`,
	};
	const { data } = await axios(config);
	return data;
};

const getScoreBoard = async (code) => {
	const config = {
		method: 'get',
		url: `${ BASE_URL }/api/soccer/scoreboard/${ code }`,
	};
	const { data } = await axios(config);
	return data;
};
