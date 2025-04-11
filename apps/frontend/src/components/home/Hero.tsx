import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
    const navigate = useNavigate();
    return (
        <div className="pt-24 pb-16 text-center bg-white dark:bg-gray-900">
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
                Connect and Chat <span className="text-indigo-600 dark:text-indigo-400">Seamlessly</span>
            </motion.h1>
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            >
                Experience real-time messaging with a beautiful, intuitive interface. Connect with friends, family, and
                colleagues instantly.
            </motion.p>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center space-x-4 mb-16"
            >
                <motion.button
                    onClick={() => navigate("/login")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition flex items-center"
                >
                    Start Chatting <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:border-indigo-600 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                    Learn More
                </motion.button>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <FeatureCard
                    icon={<Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
                    title="Group Chats"
                    description="Create and manage multiple group conversations with ease"
                />
                <FeatureCard
                    icon={<Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
                    title="Secure"
                    description="End-to-end encryption keeps your messages private and safe"
                />
                <FeatureCard
                    icon={<Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
                    title="Fast"
                    description="Lightning-fast message delivery and real-time updates"
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
        >
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
    );
}
