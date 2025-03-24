const login = async (email: string, password: string) => {
	const response = await fetch("http://localhost:8080/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	return response;
};

export default login;
