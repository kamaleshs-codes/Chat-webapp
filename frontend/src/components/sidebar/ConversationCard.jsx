import React from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const ConversationCard = ({ conversation, lastMessage, unreadCount = 0 }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	const isSelected = selectedConversation?._id === conversation._id;
	const isOnline = onlineUsers.includes(conversation._id);

	// Fallback mock last messages if none exists to keep UI highly premium
	const defaultMessages = [
		"Sounds good, let's catch up later! 👍",
		"Let's review the MERN stack redesign today.",
		"Can you send over the updated repository link? 📎",
		"Awesome job on the UI transitions! Looks premium.",
		"Hey! Are we meeting for the standup soon?",
	];
	
	const mockIndex = (conversation.fullName.length) % defaultMessages.length;
	const displayMessage = lastMessage || defaultMessages[mockIndex];

	// Generate a realistic mock timestamp
	const mockTime = ["10:42 AM", "Yesterday", "2:15 PM", "Monday", "June 24"][conversation.fullName.length % 5];

	return (
		<div
			onClick={() => setSelectedConversation(conversation)}
			className={`
				group flex gap-3.5 items-center p-3 rounded-2xl cursor-pointer transition-all duration-300 select-none mx-2 my-1
				${isSelected 
					? "bg-blue-600 text-white shadow-md shadow-blue-500/25 dark:bg-[#1C2C4E] dark:text-cyan-400 dark:border dark:border-cyan-500/45 dark:shadow-cyan-500/5" 
					: "bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900/40 text-gray-700 dark:text-gray-300"
				}
			`}
		>
			{/* Avatar Container */}
			<div className="relative flex-shrink-0">
				<div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-gray-100/80 dark:ring-gray-800/80 group-hover:scale-105 transition-transform duration-300">
					<img 
						src={conversation.profilePic} 
						alt={conversation.fullName} 
						className="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
				{/* Online Ring Indicator */}
				{isOnline && (
					<span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-[#0E1424] shadow-sm animate-pulse" />
				)}
			</div>

			{/* Conversation Info */}
			<div className="flex flex-col flex-1 min-w-0">
				<div className="flex items-center justify-between">
					<h4 className={`text-sm font-bold truncate ${isSelected ? "text-white dark:text-cyan-300" : "text-gray-900 dark:text-gray-100"}`}>
						{conversation.fullName}
					</h4>
					<span className={`text-[10px] ${isSelected ? "text-blue-200 dark:text-cyan-500/70" : "text-gray-400 dark:text-gray-500"} font-medium`}>
						{mockTime}
					</span>
				</div>
				
				<div className="flex items-center justify-between mt-1">
					<p className={`text-xs truncate max-w-[180px] ${isSelected ? "text-blue-100 dark:text-gray-300" : "text-gray-400 dark:text-gray-400"}`}>
						{displayMessage}
					</p>
					
					{/* Unread message badge */}
					{unreadCount > 0 && !isSelected && (
						<span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-blue-600 dark:bg-cyan-500 text-[10px] font-extrabold text-white dark:text-gray-950 shadow-sm animate-bounce">
							{unreadCount}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default ConversationCard;
