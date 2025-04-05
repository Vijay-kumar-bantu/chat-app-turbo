const login = async (email: string, password: string) => {
	const response = await fetch(import.meta.env.VITE_LOGIN_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	return response;
};

export default login;
