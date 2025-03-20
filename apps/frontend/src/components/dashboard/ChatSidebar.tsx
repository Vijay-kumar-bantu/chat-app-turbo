import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FriendRequestsModal } from "../friends/FriendRequestsModal";
import { Friend } from "../../types/auth";

interface ChatSidebarProps {
	selectedChat: Friend | null;
	onSelectChat: (friend: Friend) => void;
}

export function ChatSidebar({ selectedChat, onSelectChat }: ChatSidebarProps) {
	const { theme, toggleTheme } = useTheme();
	const { logout, user, userMessages } = useAuth();
	const navigate = useNavigate();
	const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<>
			<motion.div
				initial={{ x: -20, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
			>
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-xl font-bold text-gray-900 dark:text-white">
							Chats
						</h1>
						<div className="flex items-center space-x-2">
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								onClick={toggleTheme}
								className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								{theme === "light" ? (
									<Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
								) : (
									<Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
								)}
							</motion.button>
							<motion.button
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
								onClick={handleLogout}
								className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
							</motion.button>
						</div>
					</div>
					<div className="relative">
						<input
							type="text"
							placeholder="Search chats..."
							className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
						/>
						<Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
					</div>
				</div>
				<div className="overflow-y-auto h-[calc(100vh-180px)]">
					<div className="p-4 border-b border-gray-200 dark:border-gray-700">
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => setIsRequestsModalOpen(true)}
							className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400"
						>
							<UserPlus className="w-5 h-5" />
							<span>{`Friend Requests (${user?.requests?.length || 0})`}</span>
						</motion.button>
					</div>
					<div className="p-2">
						{user?.friends?.map((friend: Friend) => (
							<motion.button
								key={friend._id}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								onClick={() => onSelectChat(friend)}
								className={`w-full p-3 rounded-lg flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
									selectedChat?.name === friend.name
										? "bg-gray-100 dark:bg-gray-700"
										: ""
								}`}
							>
								<div>
									<img
										src={friend.avatar}
										alt={friend.name}
										className="w-10 h-10 rounded-full"
									/>
								</div>
								<div className="flex-1 text-left">
									<h3 className="font-medium text-gray-900 dark:text-white">
										{friend.name}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{userMessages?.[friend._id]?.[
											userMessages?.[friend._id]?.length - 1
										]?.message || "No messages yet"}
									</p>
								</div>
							</motion.button>
						))}
					</div>
				</div>
			</motion.div>
			<FriendRequestsModal
				isOpen={isRequestsModalOpen}
				onClose={() => setIsRequestsModalOpen(false)}
			/>
		</>
	);
}
