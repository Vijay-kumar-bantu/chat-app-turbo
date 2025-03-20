import React, { createContext, useContext, useState } from "react";
import { User, AuthContextType, UserMessages } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userMessages, setUserMessages] = useState<UserMessages | null>(null);

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
