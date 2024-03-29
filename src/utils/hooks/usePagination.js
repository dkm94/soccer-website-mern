/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

function usePagination(data, itemsPerPage, competition) {
	if(!Array.isArray(data)){
		throw new Error('data should be an array');
	}

	if(typeof itemsPerPage != 'number' || itemsPerPage === 0){
		throw new Error('itemsPerPage should be a valid number');
	}

	if(typeof competition != 'string'){
		throw new Error('competition\'s value is invalid');
	}

	const [ currentPage, setCurrentPage ] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [ competition ]);

	const maxPage = Math.ceil(data?.length / itemsPerPage);

	function dataByCompetition() {
		return data?.filter((match) =>
			competition === '' ? match : match?.competition?.code === competition
		);
	}

	function currentData() {
		const begin = (currentPage - 1) * itemsPerPage;
		const end = begin + itemsPerPage;
		const filterdData = data?.filter((match) =>
			competition === '' ? match : match?.competition?.code === competition
		);
		return filterdData?.slice(begin, end);
	}

	function next() {
		setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
	}

	function prev() {
		setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
	}

	function jump(page) {
		const pageNumber = Math.max(1, page);
		setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
	}

	return {
		next,
		prev,
		jump,
		currentData,
		currentPage,
		maxPage,
		dataByCompetition, 
	};
}

export default usePagination;
