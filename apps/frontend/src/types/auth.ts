export interface Friend {
	_id: string;
	name: string;
	email: string;
	avatar: string;
	lastMessage?: string;
	status?: "online" | "offline";
}

export interface User {
	id: string;
	name: string;
	email: string;
	avatar: string;
	friends: Friend[];
	requests: Friend[];
}

export interface AuthContextType {
	user: User | null;
	onlineUsers: Set<string>;
	setOnlineUsers: React.Dispatch<React.SetStateAction<Set<string>>>;
	userMessages: UserMessages | null;
	addUserMessages: (
		from: string,
		type: "sender" | "receiver",
		message: string
	) => void;
	addUser: (user: User) => void;
	addUserFriend: (friend: Friend) => void;
	logout: () => void;
	isAuthenticated: boolean;
}

export interface message {
	type: "sender" | "receiver";
	message: string;
}

export interface UserMessages {
	[id: string]: message[];
}
