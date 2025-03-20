import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import login from "../../api/login";
import { useAuth } from "../../context/AuthContext";

export function LoginForm() {
	const [email, setEmail] = useState("demo@example.com");
	const [password, setPassword] = useState("demo123");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { addUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await login(email, password);
			if (res.status === 200) {
				const user = await res.json();
				localStorage.setItem("user", JSON.stringify(user));
				addUser(user);
				navigate("/dashboard");
			} else {
				setError(await res.text());
			}
		} catch (err) {
			setError("Invalid credentials");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
			<div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
				<div className="text-center">
					<div className="flex justify-center" onClick={() => navigate("/")}>
						<MessageSquare className="h-12 w-12 text-indigo-600 dark:text-indigo-400 cursor-pointer" />
					</div>
					<h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
						Welcome to ChatSpace
					</h2>
					<p className="mt-2 text-gray-600 dark:text-gray-300">
						Sign in to start chatting
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="text-red-500 text-sm text-center">{error}</div>
					)}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
						/>
					</div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
					>
						Sign in
					</button>
				</form>

				<p className="mt-2 text-gray-600 dark:text-gray-300">
					New User?{" "}
					<a href="/register" className="text-indigo-400">
						Create an account
					</a>
				</p>
			</div>
		</div>
	);
}
