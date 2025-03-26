import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function useSocket() {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const { user, addUserMessages, setOnlineUsers } = useAuth();

	useEffect(() => {
		if (user?.id) {
			const webSocket = new WebSocket("ws://localhost:8080");
			setSocket(webSocket);

			//connecting socket to clients data on open
			webSocket.onopen = () => {
				const data = JSON.stringify({ type: "connect", id: user?.id });
				webSocket.send(data);
			};

			//message event
			webSocket.onmessage = (event) => {
				const message = JSON.parse(String(event.data));

				if (message.type === "message") {
					addUserMessages(message.from, "receiver", message.message);
				}

				if (message.type === "onlineUsers") {
					message.users.forEach((user: string) => {
						setOnlineUsers((prev) => new Set([...prev, user]));
					});
				}

				if (message.type === "userStatus") {
					if (message.isOnline) {
						setOnlineUsers((prev) => new Set([...prev, message.userId]));
					} else {
						setOnlineUsers((prev) => {
							const newSet = new Set(prev);
							newSet.delete(message.userId);
							return newSet;
						});
					}
				}
			};
		}

		//closing socket on unmount
		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [user?.id]);

	return socket;
}
