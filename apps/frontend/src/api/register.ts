const register = async (name: string, email: string, password: string) => {
	const response = await fetch("server://server:8080/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, password }),
	});

	return response;
};

export default register;
