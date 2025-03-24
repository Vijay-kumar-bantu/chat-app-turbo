const addFriend = async (id: string, friendId: string) => {
	const response = await fetch("http://localhost:8080/friend/add-friend", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: id, friendId: friendId }),
	});

	return response;
};

export default addFriend;
