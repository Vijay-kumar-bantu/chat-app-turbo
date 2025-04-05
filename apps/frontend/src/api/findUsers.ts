const findUsers = async (id: string) => {
	const response = await fetch(import.meta.env.VITE_ALL_FRIENDS_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${id}`,
		},
		body: JSON.stringify({ id }),
	});
	const data = await response.json();

	return data.users;
};

export default findUsers;
