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
		if(error){
			throw new Error(error);
		}
	}
};

const getCompetitions = async () => {
	try {
		const { data } = await axios.get(`${ BASE_URL }/api/soccer/competitions`);
		return data;
	} catch (error) {
		if(error){
			throw new Error(error);
		}
	}
};

const getMatches = async (from, to) => {
	try {
		const { data } = await axios.get(`${ BASE_URL }/api/soccer/matches/history/${ from }/${ to }`);
		return data;
	} catch (error) {
		if(error){
			throw new Error(error);
		}
	}
};

const getScoreBoard = async (code) => {
	try {
		const { data } = await axios.get(`${ BASE_URL }/api/soccer/scoreboard/${ code }`);
		return data;
	} catch (error) {
		if(error){
			throw new Error(error);
		}
	}
};
