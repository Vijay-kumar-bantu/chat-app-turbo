import { WebSocket } from "ws";

interface client {
	[key: string]: WebSocket;
}

export default client;
