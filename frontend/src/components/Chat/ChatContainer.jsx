import React from "react";
import useConversation from "../../zustand/useConversation";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyState from "../Common/EmptyState";

const ChatContainer = ({ 
	isMobile, 
	onBackToSidebar, 
	isProfileOpen, 
	onToggleProfile 
}) => {
	const { selectedConversation } = useConversation();

	return (
		<div className="flex flex-col h-full bg-[#F5F7FA] dark:bg-[#0B0F19] transition-colors duration-300">
			{!selectedConversation ? (
				// Premium Welcome Dashboard when no chat is active
				<EmptyState />
			) : (
				// Active Chat Area
				<>
					{/* Chat Navbar Header */}
					<ChatHeader
						selectedConversation={selectedConversation}
						isMobile={isMobile}
						onBackToSidebar={onBackToSidebar}
						isProfileOpen={isProfileOpen}
						onToggleProfile={onToggleProfile}
					/>

					{/* Message Bubble Feed */}
					<MessageList 
						selectedConversation={selectedConversation} 
					/>

					{/* Send Message Form bar */}
					<MessageInput />
				</>
			)}
		</div>
	);
};

export default ChatContainer;
