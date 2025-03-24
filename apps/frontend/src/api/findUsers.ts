const findUsers = async (id: string) => {
	const response = await fetch("http://localhost:8080/friend/all-users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id }),
	});
	const data = await response.json();

	return data.users;
};

export default findUsers;
