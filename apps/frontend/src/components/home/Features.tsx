import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Video, Image, Lock, Globe, Clock } from "lucide-react";

export function Features() {
	return (
		<div className="bg-gray-50 dark:bg-gray-800 py-20" id="features">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					whileInView={{ y: 0, opacity: 1 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
						Everything You Need to Connect
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Discover all the powerful features that make ChatSpace the perfect
						platform for your conversations.
					</p>
				</motion.div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<FeatureCard
						icon={
							<MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
						}
						title="Rich Messaging"
						description="Send text, emojis, and files with full formatting support"
					/>
					<FeatureCard
						icon={
							<Video className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
						}
						title="Video Calls"
						description="Start HD video calls with just one click"
					/>
					<FeatureCard
						icon={
							<Image className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
						}
						title="Media Sharing"
						description="Share photos and videos instantly in high quality"
					/>
					<FeatureCard
						icon={
							<Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
						}
						title="Private Chats"
						description="End-to-end encrypted private conversations"
					/>
					<FeatureCard
						icon={
							<Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
						}
						title="Cross Platform"
						description="Available on web, mobile, and desktop"
					/>
					<FeatureCard
						icon={
							<Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
						}
						title="Message History"
						description="Access your chat history anytime, anywhere"
					/>
				</div>
			</div>
		</div>
	);
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
}) {
	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			whileInView={{ y: 0, opacity: 1 }}
			viewport={{ once: true }}
			whileHover={{ y: -5 }}
			className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition"
		>
			<div className="flex items-center mb-4">
				<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
					{icon}
				</div>
				<h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
					{title}
				</h3>
			</div>
			<p className="text-gray-600 dark:text-gray-300">{description}</p>
		</motion.div>
	);
}
