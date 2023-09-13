const setLocalStorage = (key, value) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

export { setLocalStorage };