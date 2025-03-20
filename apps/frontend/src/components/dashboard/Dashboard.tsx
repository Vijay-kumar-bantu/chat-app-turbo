import React from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatArea } from "./ChatArea";
import { Friend } from "../../types/auth";
import useSocket from "../../hooks/useSocket";

export function Dashboard() {
	const [selectedChat, setSelectedChat] = React.useState<Friend | null>(null);
	const socket = useSocket();

	return (
		<div className="h-screen flex bg-gray-50 dark:bg-gray-900">
			<ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
			<ChatArea selectedChat={selectedChat} socket={socket} />
		</div>
	);
}
