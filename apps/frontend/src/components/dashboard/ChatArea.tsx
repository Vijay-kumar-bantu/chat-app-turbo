import { useEffect, useState } from "react";
import { Friend, message } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import useSocket from "../../hooks/useSocket";

interface ChatAreaProps {
	selectedChat: Friend | null;
}

export function ChatArea({ selectedChat }: ChatAreaProps) {
	const { user, addUserMessages, userMessages, onlineUsers } = useAuth();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState<message[]>([]);
	const socket = useSocket();

	useEffect(() => {
		if (userMessages?.[selectedChat?._id || ""]) {
			setMessages(userMessages[selectedChat?._id || ""]);
		} else {
			setMessages([]);
		}
	}, [userMessages, selectedChat]);

	const handleSend = () => {
		if (message.trim() && selectedChat?._id) {
			if (!onlineUsers.has(selectedChat._id)) {
				alert("User is offline");
				return;
			}
			user?.friends?.map((friend) => {
				if (friend._id === selectedChat?._id) {
					friend.lastMessage = message;
				}
			});
			socket?.send(
				JSON.stringify({
					type: "message",
					from: user?.id,
					to: selectedChat?._id,
					message,
				})
			);
			addUserMessages(selectedChat?._id, "sender", message);
			setMessage("");
		}
	};

	if (!selectedChat) {
		return (
			<div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
				<p className="text-gray-500 dark:text-gray-400">
					Select a chat to start messaging
				</p>
			</div>
		);
	}

	return (
		<div className="flex-1 flex flex-col">
			<div className="p-4 border-b flex justify-start gap-3 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
				<div>
					<img
						src={selectedChat.avatar}
						alt={selectedChat.name}
						className="w-10 h-10 rounded-full"
					/>
				</div>
				<div className="flex flex-col">
					<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
						{selectedChat.name}
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						{onlineUsers.has(selectedChat._id) ? (
							<span className="flex items-center">
								<span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
								Online
							</span>
						) : (
							<span className="flex items-center">
								<span className="w-2 h-2 bg-gray-500 rounded-full mr-1"></span>
								Offline
							</span>
						)}
					</p>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
				{/* Messages will be implemented later */}
				{messages.map((message, index) => (
					<div key={index} className="my-2">
						<h3
							className={`text-gray-900 dark:text-white flex max-w-1/6 ${
								message.type === "sender" ? "justify-end" : "justify-start"
							}`}
						>
							<span className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
								{message.message}
							</span>
						</h3>
					</div>
				))}
			</div>

			<div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
				<div className="flex space-x-2">
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Type a message..."
						className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
						onKeyUp={(e) => e.key === "Enter" && handleSend()}
					/>
					<button
						onClick={handleSend}
						className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
