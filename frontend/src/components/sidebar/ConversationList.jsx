import React from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { useSocketContext } from "../../context/SocketContext";
import ConversationCard from "./ConversationCard";
import { ConversationSkeleton } from "../Common/Loader";
import { HiOutlineUserGroup, HiOutlineSearch } from "react-icons/hi";

const ConversationList = ({ search, activeTab }) => {
	const { loading, conversations } = useGetConversations();
	const { onlineUsers } = useSocketContext();

	// Filter logic
	const filteredConversations = conversations.filter((user) => {
		const matchesSearch = 
			user.fullName.toLowerCase().includes(search.toLowerCase()) ||
			user.username.toLowerCase().includes(search.toLowerCase());

		if (!matchesSearch) return false;

		if (activeTab === "online") {
			return onlineUsers.includes(user._id);
		}
		
		// In a real app, 'chats' would filter by users with active conversation history.
		// For this stack, all users act as contacts. We show all for 'chats' and 'contacts'
		// but simulate a different sort or layout, or simulate unread badges on 'chats'.
		return true;
	});

	if (loading) {
		return (
			<div className="flex-1 overflow-y-auto px-2">
				<ConversationSkeleton />
			</div>
		);
	}

	return (
		<div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
			{filteredConversations.length > 0 ? (
				filteredConversations.map((conversation) => {
					// Simulate unread counts for 2 particular users to demonstrate the beautiful UI badge!
					const shouldMockUnread = conversation.fullName.length % 7 === 0;
					const mockUnreadCount = shouldMockUnread ? (conversation.fullName.length % 3) + 1 : 0;

					return (
						<ConversationCard
							key={conversation._id}
							conversation={conversation}
							unreadCount={mockUnreadCount}
						/>
					);
				})
			) : (
				// Empty Filter State
				<div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
					<div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-cyan-500/30 border border-gray-100 dark:border-gray-850">
						{activeTab === "online" ? (
							<HiOutlineUserGroup className="w-10 h-10" />
						) : (
							<HiOutlineSearch className="w-10 h-10" />
						)}
					</div>
					<div className="space-y-1">
						<h5 className="text-sm font-bold text-gray-700 dark:text-gray-300">
							{activeTab === "online" ? "No colleagues online" : "No results found"}
						</h5>
						<p className="text-xs text-gray-400 dark:text-gray-500 max-w-[200px]">
							{activeTab === "online" 
								? "All colleagues are currently offline. Check back later." 
								: "Double check your spelling or search another contact."
							}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ConversationList;
