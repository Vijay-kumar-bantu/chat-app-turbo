const sendRequest = async (id: string, friendId: string) => {
	console.log(id, friendId);
	const response = await fetch("http://localhost:8080/friend/send-request", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: id, friendId: friendId }),
	});

	return response;
};

export default sendRequest;
