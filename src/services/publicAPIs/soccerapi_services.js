import axios from 'axios';

const apiVersion = 'v4';
// const BASE_URL = 'https://api.football-data.org';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
// eslint-disable-next-line no-undef
const tokenAPI = process.env.REACT_APP_API_FOOTBALL_TOKEN;
const corsEveryhere = 'https://mycorsproxy-dkm.herokuapp.com';

export {
	BASE_URL,
	// getRessources,
	// getRessource,
	getMatches,
	// getCount,
	// getMatchesByCompetition,
	getScoreBoard,
	getMatchesOfTheDay,
	getCompetitions,
};

// async function getRessources(name) {
// 	try {
// 		const url = `${ corsEveryhere }/${ BASE_URL }/${ apiVersion }/${ name }`;
// 		const config = {
// 			method: 'get',
// 			url,
// 			headers: {
// 				'X-Auth-Token': `${ tokenAPI }`,
// 				'X-Response-Control': 'full',
// 			},
// 			// signal
// 		};
// 		const { data } = await axios(config);
// 		return data[ `${ name }` ];
// 	} catch (error) {
// 		throw new Error('Failed to fetch data from API Football data server', error);
// 	}
// }

const getMatchesOfTheDay = async () => {
	try {
		const { data } = await axios.get(`${ BASE_URL }/api/soccer/matches`);
		return data;
	} catch (error) {
		throw new Error('Failed to fetch data from API Football data server', error);
	}
};

// function getCount(name) {
// 	const url = `${ corsEveryhere }/${ BASE_URL }/${ name }`;
// 	return axios
// 		.get(url, { headers: { 'X-Auth-Token': `${ tokenAPI }` } })
// 		.then((response) => response.data.count);
// }

// function getRessource(name, id) {
// 	const url = `${ corsEveryhere }/${ BASE_URL }/${ name }/${ id }`;
// 	return axios
// 		.get(url, { headers: { 'X-Auth-Token': `${ tokenAPI }` } })
// 		.then((response) => response.data);
// }

const getCompetitions = async () => {
	try {
		const { data } = await axios.get(`${ BASE_URL }/api/soccer/competitions`);
		return data;
	} catch (error) {
		throw new Error('Failed to fetch data from API Football data server', error);
	}
};

// function getMatchesByCompetition(name, id) {
// 	const url = `${ corsEveryhere }/${ BASE_URL }/${ apiVersion }/${ name }/${ id }/teams`;
// 	return axios
// 		.get(url, { headers: { 'X-Auth-Token': `${ tokenAPI }` } })
// 		.then((response) => response.data)
// 		.catch((error) => console.log('Error', error));
// }

const getMatches = async (from, to) => {
	const config = {
		method: 'get',
		url: `${ BASE_URL }/api/soccer/matches/history/${ from }/${ to }`,
	};
	const { data } = await axios(config);
	return data;
};

async function getScoreBoard(name, code) {
	const url = `${ corsEveryhere }/${ BASE_URL }/${ apiVersion }/${ name }/${ code }/matches`;
	const config = {
		method: 'get',
		url,
		headers: { 'X-Auth-Token': `${ tokenAPI }` },
	};
	const { data } = await axios(config);
	return data;
}
