import { WebSocketServer, WebSocket } from "ws";
import client from "./types";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/authRoute";
import friendRouter from "./routes/friendRoute";

const app = express();

//connecting to mongodb
mongoose
	.connect(process.env.MONGODB_URL || "mongodb://mongodb123:27017/chatapp")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(err));

//middlewares for express server
app.use(express.json());
app.use(cors({ origin: "*" }));

//routes
app.use("/auth", authRouter);
app.use("/friend", friendRouter);

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
				ws.send("user added");
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
		Object.keys(clients).forEach((key: any) => {
			if (clients[key] === ws) {
				delete clients[key];
				console.log("Client disconnected");
			}
		});
	});
});
