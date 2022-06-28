async function sendRequest(url, init) {
	try {
		let response = await fetch(url, init);
		return response.json();
	} catch (error) {
		throw new Error(error.name);
	}
}
export { sendRequest };
