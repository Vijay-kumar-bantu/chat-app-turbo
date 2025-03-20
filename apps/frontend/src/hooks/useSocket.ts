import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function useSocket() {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const { user, addUserMessages } = useAuth();

	useEffect(() => {
		if (user?.id) {
			const webSocket = new WebSocket("ws://localhost:8080");
			setSocket(webSocket);

			//connecting socket to clients data on open
			webSocket.onopen = () => {
				const data = JSON.stringify({ type: "connect", id: user?.id });
				webSocket.send(data);
				console.log("WebSocket connection opened");
			};

			//message event
			webSocket.onmessage = (event) => {
				const message = JSON.parse(String(event.data));

				if (message.type === "message") {
					addUserMessages(message.from, "receiver", message.message);
				}
			};
		}

		//closing socket on unmount
		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, []);

	return socket;
}
