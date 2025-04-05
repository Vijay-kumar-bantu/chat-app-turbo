const sendRequest = async (id: string, friendId: string) => {
	console.log(id, friendId);
	const response = await fetch(import.meta.env.VITE_SEND_REQUEST_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${id}`,
		},
		body: JSON.stringify({ id: id, friendId: friendId }),
	});

	return response;
};

export default sendRequest;
