const login = async (email: string, password: string) => {
	const response = await fetch("server://server:8080/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	return response;
};

export default login;
