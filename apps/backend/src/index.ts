import { WebSocketServer, WebSocket } from "ws";
import client from "./types";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/authRoute";
import friendRouter from "./routes/friendRoute";
import protectedRoute from "./middlewares/protectedRoute";
import limiter from "./middlewares/rateLimiter";

const app = express();

//connecting to mongodb
mongoose
	.connect(process.env.MONGODB_URL || "mongodb://mongodb123:27017/chatapp")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

//middlewares for express server
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(limiter); // Apply rate limiting middleware

//routes
app.use("/auth", authRouter);
app.use("/friend", protectedRoute, friendRouter);

//express routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});

//setting up the websocket server with express server
const wss = new WebSocketServer({
	server: app.listen(process.env.SERVER_PORT || 8080, () =>
		console.log(`Listening on port ${process.env.SERVER_PORT || 8080}`)
	),
});

const clients: client = {};
const onlineUsers: Set<string> = new Set();

//websocket events
wss.on("connection", function connection(ws: WebSocket) {
	ws.on("error", (err) => {
		console.log(err);
	});

	ws.on("message", function message(data) {
		const message = JSON.parse(String(data));
		switch (message.type) {
			case "connect":
				clients[message.id] = ws;
				onlineUsers.add(message.id);
				// Broadcast to all clients that this user is online
				broadcastUserStatus(message.id, true);
				// Send current online users to the new connection
				ws.send(
					JSON.stringify({
						type: "onlineUsers",
						users: Array.from(onlineUsers),
					})
				);
				break;
			case "message":
				if (clients[message.to]) {
					clients[message.to]?.send(JSON.stringify(message));
				} else {
					ws.send("user is offline");
				}
				break;
			default:
				console.log("Error");
		}
	});

	ws.on("close", () => {
		let disconnectedUserId: string | null = null;
		Object.keys(clients).forEach((key: string) => {
			if (clients[key] === ws) {
				disconnectedUserId = key;
				delete clients[key];
				onlineUsers.delete(key);
			}
		});

		if (disconnectedUserId) {
			// Broadcast to all clients that this user is offline
			broadcastUserStatus(disconnectedUserId, false);
		}
	});
});

// Helper function to broadcast user status changes
function broadcastUserStatus(userId: string, isOnline: boolean) {
	const statusMessage = JSON.stringify({
		type: "userStatus",
		userId,
		isOnline,
	});

	Object.values(clients).forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(statusMessage);
		}
	});
}
