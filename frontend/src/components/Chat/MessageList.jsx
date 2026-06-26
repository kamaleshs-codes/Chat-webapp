import React, { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import MessageBubble from "./MessageBubble";
import { MessageSkeleton } from "../Common/Loader";
import { FiMessageSquare } from "react-icons/fi";

const MessageList = ({ selectedConversation }) => {
	const { messages, loading } = useGetMessages();
	useListenMessages(); // Enable live socket listening

	const messagesEndRef = useRef(null);

	// Smooth scroll to bottom when messages list changes
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		// Small delay to allow layout to settle
		const timer = setTimeout(scrollToBottom, 150);
		return () => clearTimeout(timer);
	}, [messages, selectedConversation?._id]);

	if (loading) {
		return (
			<div className="flex-1 overflow-y-auto px-4 py-2 bg-[#F5F7FA] dark:bg-[#0B0F19] transition-colors duration-300">
				<MessageSkeleton />
			</div>
		);
	}

	return (
		<div className="flex-1 overflow-y-auto px-4 py-4 bg-[#F5F7FA] dark:bg-[#0B0F19] transition-colors duration-300">
			{messages.length > 0 ? (
				<>
					{/* Message Bubble Feed */}
					{messages.map((msg) => (
						<MessageBubble 
							key={msg._id} 
							message={{
								...msg,
								profilePic: msg.senderId === selectedConversation._id 
									? selectedConversation.profilePic 
									: null
							}} 
						/>
					))}
					
					{/* Scroll anchor */}
					<div ref={messagesEndRef} className="h-2" />
				</>
			) : (
				// Empty Conversation Greeting
				<div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
					<div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-cyan-950/20 text-blue-600 dark:text-cyan-400 border border-blue-100/50 dark:border-cyan-800/10 flex items-center justify-center shadow-sm">
						<FiMessageSquare className="w-8 h-8" />
					</div>
					<div className="space-y-1.5">
						<h4 className="text-sm font-extrabold text-gray-800 dark:text-gray-200">
							No Messages Yet
						</h4>
						<p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs mx-auto leading-relaxed">
							Say hello to <span className="font-bold text-gray-700 dark:text-cyan-400">@{selectedConversation?.username}</span> and start your conversation. Your messages are secured.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MessageList;
