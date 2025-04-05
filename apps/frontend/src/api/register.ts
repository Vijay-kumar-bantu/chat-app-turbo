const register = async (name: string, email: string, password: string) => {
	const response = await fetch(import.meta.env.VITE_REGISTER_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, password }),
	});

	return response;
};

export default register;
