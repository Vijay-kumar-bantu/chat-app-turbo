import React from "react";
import { ChatSidebar } from "./ChatSidebar";
import { ChatArea } from "./ChatArea";
import { Friend } from "../../types/auth";

export function Dashboard() {
	const [selectedChat, setSelectedChat] = React.useState<Friend | null>(null);

	return (
		<div className="h-screen flex bg-gray-50 dark:bg-gray-900">
			<ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
			<ChatArea selectedChat={selectedChat} />
		</div>
	);
}
