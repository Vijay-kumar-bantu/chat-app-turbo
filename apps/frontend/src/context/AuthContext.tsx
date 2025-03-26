import React, { createContext, useContext, useState } from "react";
import { User, AuthContextType, UserMessages } from "../types/auth";
// import useSocket from "../hooks/useSocket";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userMessages, setUserMessages] = useState<UserMessages | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
	// const socket = useSocket();

	const addUser = (user: User) => {
		setUser(user);
	};

	const addUserMessages = (
		from: string,
		type: "sender" | "receiver",
		message: string
	) => {
		setUserMessages((prev) => ({
			...prev,
			[from]: [...(prev?.[from] || []), { type, message }],
		}));
	};

	const logout = () => {
		setUser(null);
		setUserMessages(null);
		// if (socket) {
		// 	socket.close();
		// }
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				addUser,
				userMessages,
				addUserMessages,
				logout,
				isAuthenticated: !!user,
				onlineUsers,
				setOnlineUsers,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
