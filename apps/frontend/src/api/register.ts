const register = async (name: string, email: string, password: string) => {
	const response = await fetch("http://localhost:8080/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, password }),
	});

	return response;
};

export default register;
