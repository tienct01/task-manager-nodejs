async function sendRequest(url, init) {
	try {
		let response = await fetch(url, init);
		return response.json();
	} catch (error) {
		throw new Error(error.name);
	}
}
const displayNotify = (div) => {
	div.style.display = "block";
	setTimeout(() => {
		div.style.display = "none";
	}, 2000);
};
export { sendRequest, displayNotify };
