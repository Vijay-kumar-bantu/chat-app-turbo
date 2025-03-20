import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { ThemeToggle } from "../common/ThemeToggle";
import { useNavigate } from "react-router-dom";

export function Header() {
	const navigate = useNavigate();
	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<motion.div
						initial={{ x: -20, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						className="flex items-center space-x-2"
					>
						<MessageSquare className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
						<span className="text-xl font-bold text-gray-900 dark:text-white">
							ChatSpace
						</span>
					</motion.div>
					<nav className="flex items-center space-x-8">
						<motion.a
							whileHover={{ scale: 1.05 }}
							href="#features"
							className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
						>
							Features
						</motion.a>
						<ThemeToggle />
						<motion.button
							onClick={() => navigate("/login")}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
						>
							Get Started
						</motion.button>
					</nav>
				</div>
			</div>
		</motion.header>
	);
}
