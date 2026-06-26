import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import ConversationList from "./ConversationList";
import { FiSettings, FiMessageSquare } from "react-icons/fi";
import useConversation from "../../zustand/useConversation";

const Sidebar = ({ onOpenOwnSettings }) => {
	const { authUser } = useAuthContext();
	const { setSelectedConversation } = useConversation();
	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] = useState("chats"); // 'chats' | 'contacts' | 'online'

	const handleLogoClick = () => {
		// Clear selection to return to welcome dashboard
		setSelectedConversation(null);
	};

	return (
		<div className="flex flex-col h-full bg-white dark:bg-[#0E1424] transition-colors duration-300">
			{/* Sidebar Header (App Branding) */}
			<div className="p-4 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between bg-white dark:bg-[#0E1424]">
				<div 
					onClick={handleLogoClick}
					className="flex items-center gap-2 cursor-pointer active:scale-95 transition-transform duration-200 select-none"
				>
					<div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-teal-500 flex items-center justify-center text-white dark:text-gray-950 shadow-md shadow-blue-500/10 dark:shadow-cyan-500/10">
						<FiMessageSquare className="w-5.5 h-5.5" />
					</div>
					<div>
						<h1 className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
							Chat<span className="text-blue-600 dark:text-cyan-400">Sync</span>
						</h1>
						<p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold tracking-widest uppercase">
							WORKSPACE
						</p>
					</div>
				</div>
			</div>

			{/* Search & Filter Tabs */}
			<SearchBar 
				search={search} 
				setSearch={setSearch} 
				activeTab={activeTab} 
				setActiveTab={setActiveTab} 
			/>

			{/* Scrollable Conversation/User Feed */}
			<ConversationList 
				search={search} 
				activeTab={activeTab} 
			/>

			{/* Sidebar User Status Footer Bar (Slack/Discord style) */}
			<div className="p-3.5 border-t border-gray-100 dark:border-gray-850 bg-gray-50/60 dark:bg-gray-900/15 flex items-center justify-between">
				<div className="flex items-center gap-3 min-w-0">
					{/* Current User Avatar with green pulse */}
					<div className="relative flex-shrink-0">
						<div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-gray-200 dark:ring-gray-800">
							<img 
								src={authUser?.profilePic} 
								alt={authUser?.fullName} 
								className="w-full h-full object-cover"
							/>
						</div>
						<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#0E1424] shadow-sm animate-pulse" />
					</div>

					{/* Current User Info */}
					<div className="min-w-0">
						<p className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">
							{authUser?.fullName}
						</p>
						<p className="text-[10px] text-gray-400 dark:text-cyan-600/70 font-medium truncate">
							@{authUser?.username}
						</p>
					</div>
				</div>

				{/* Settings Gear Button */}
				<button
					onClick={onOpenOwnSettings}
					className="p-2 rounded-xl text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-gray-850 border border-transparent hover:border-gray-150 dark:hover:border-gray-800 transition-all duration-250 active:scale-90"
					title="Open Settings"
				>
					<FiSettings className="w-4.5 h-4.5" />
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
