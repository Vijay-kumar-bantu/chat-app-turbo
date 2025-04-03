import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, UserPlus, Check, X as XMark } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import findUsers from "../../api/findUsers";
import sendRequest from "../../api/send-request";
import addFriend from "../../api/add-friend";
interface FriendRequestsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function FriendRequestsModal({
	isOpen,
	onClose,
}: FriendRequestsModalProps) {
	const [activeTab, setActiveTab] = useState<"requests" | "search">("requests");
	const [searchQuery, setSearchQuery] = useState("");
	const { user, addUserFriend } = useAuth();
	const [users, setUsers] = useState<any[]>([]);
	useEffect(() => {
		const fetchUsers = async () => {
			const users = await findUsers(user?.id || "");
			setUsers(users);
		};
		if (user?.id) {
			fetchUsers();
		}
	}, []);

	const modalVariants = {
		hidden: { opacity: 0, scale: 0.95 },
		visible: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	const overlayVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const handleAddfriend = async (id: string, friendId: string) => {
		const response = await addFriend(id, friendId);
		if (response.ok) {
			const data = await response.json();
			addUserFriend(data);
			onClose();
			alert("Friend added successfully");
		} else {
			alert("Error adding friend");
		}
	};

	const handleSendRequest = async (id: string, friendId: string) => {
		const response = await sendRequest(id, friendId);
		if (response.ok) {
			// const data = await response.json();
			onClose();
			alert("Friend request sent successfully");
		} else {
			alert("Error sending friend request");
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 z-40"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={onClose}
					/>
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center p-4"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
							<div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
								<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
									Friend Requests
								</h2>
								<button
									onClick={onClose}
									className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
								>
									<X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
								</button>
							</div>

							<div className="border-b border-gray-200 dark:border-gray-700">
								<div className="flex">
									<button
										className={`flex-1 py-3 text-sm font-medium ${
											activeTab === "requests"
												? "text-indigo-600 border-b-2 border-indigo-600"
												: "text-gray-500 dark:text-gray-400"
										}`}
										onClick={() => setActiveTab("requests")}
									>
										Pending Requests
									</button>
									<button
										className={`flex-1 py-3 text-sm font-medium ${
											activeTab === "search"
												? "text-indigo-600 border-b-2 border-indigo-600"
												: "text-gray-500 dark:text-gray-400"
										}`}
										onClick={() => setActiveTab("search")}
									>
										Find Friends
									</button>
								</div>
							</div>

							<div className="p-4">
								{activeTab === "requests" ? (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="space-y-4"
									>
										{user?.requests?.length ? (
											user?.requests.map((request) => (
												<motion.div
													key={request._id}
													initial={{ x: -20, opacity: 0 }}
													animate={{ x: 0, opacity: 1 }}
													className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
												>
													<div className="flex items-center space-x-3">
														<img
															src={request.avatar}
															alt={request.name}
															className="w-10 h-10 rounded-full"
														/>
														<div>
															<h3 className="font-medium text-gray-900 dark:text-white">
																{request.name}
															</h3>
															{/* <p className="text-sm text-gray-500 dark:text-gray-400">
															Sent{" "}
															{new Date(request.timestamp).toLocaleDateString()}
														</p> */}
														</div>
													</div>
													<div className="flex space-x-2">
														<button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full">
															<Check
																className="w-5 h-5"
																onClick={() =>
																	handleAddfriend(user?.id || "", request._id)
																}
															/>
														</button>
														<button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full">
															<XMark className="w-5 h-5" />
														</button>
													</div>
												</motion.div>
											))
										) : (
											<div className="h-10 flex items-center justify-center">
												<p className="text-gray-500 dark:text-gray-400">
													No pending requests
												</p>
											</div>
										)}
									</motion.div>
								) : (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="space-y-4"
									>
										<div className="relative">
											<input
												type="text"
												placeholder="Search for friends..."
												value={searchQuery}
												onChange={(e) => setSearchQuery(e.target.value)}
												className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
											/>
											<Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
										</div>
										{users.map((result) => (
											<motion.div
												key={result.id}
												initial={{ x: -20, opacity: 0 }}
												animate={{ x: 0, opacity: 1 }}
												className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
											>
												<div className="flex items-center space-x-3">
													<img
														src={result.avatar}
														alt={result.name}
														className="w-10 h-10 rounded-full"
													/>
													<div>
														<h3 className="font-medium text-gray-900 dark:text-white">
															{result.name}
														</h3>
														{/* <p className="text-sm text-gray-500 dark:text-gray-400">
															{result.status === "online" ? (
																<span className="flex items-center">
																	<span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
																	Online
																</span>
															) : (
																`Last seen ${result.lastSeen}`
															)}
														</p> */}
													</div>
												</div>
												<button className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full">
													<UserPlus
														className="w-5 h-5"
														onClick={() =>
															handleSendRequest(user?.id || "", result.id)
														}
													/>
												</button>
											</motion.div>
										))}
									</motion.div>
								)}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
