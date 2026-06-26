import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import ProfileCard from "./ProfileCard";
import ProfileSettings from "./ProfileSettings";
import { FiUser, FiSettings } from "react-icons/fi";

const ProfilePanel = ({ onCloseProfile, forceSettings = false, setForceSettings }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const [activeTab, setActiveTab] = useState("contact"); // 'contact' | 'settings'

	// Sync tabs with selected conversation changes
	useEffect(() => {
		if (selectedConversation) {
			setActiveTab("contact");
		} else {
			setActiveTab("settings");
		}
	}, [selectedConversation?._id]);

	// Listen to force setting signals from footer
	useEffect(() => {
		if (forceSettings) {
			setActiveTab("settings");
			if (setForceSettings) setForceSettings(false);
		}
	}, [forceSettings, setForceSettings]);

	return (
		<div className="flex flex-col h-full bg-white dark:bg-[#0E1424] transition-colors duration-300">
			{/* Tab Switcher (Only visible if a conversation is selected) */}
			{selectedConversation && (
				<div className="flex border-b border-gray-100 dark:border-gray-850 p-2 gap-1 bg-gray-50/50 dark:bg-gray-900/10">
					<button
						onClick={() => setActiveTab("contact")}
						className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all
							${activeTab === "contact"
								? "bg-white dark:bg-[#1A2336] text-blue-650 dark:text-cyan-400 shadow-sm"
								: "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
							}
						`}
					>
						<FiUser className="w-3.5 h-3.5" /> Contact Card
					</button>
					<button
						onClick={() => setActiveTab("settings")}
						className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all
							${activeTab === "settings"
								? "bg-white dark:bg-[#1A2336] text-blue-650 dark:text-cyan-400 shadow-sm"
								: "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
							}
						`}
					>
						<FiSettings className="w-3.5 h-3.5" /> My Settings
					</button>
				</div>
			)}

			{/* Active View Content */}
			<div className="flex-1 overflow-hidden">
				{activeTab === "contact" && selectedConversation ? (
					<ProfileCard 
						user={selectedConversation} 
						isSelf={false} 
						onCloseProfile={onCloseProfile} 
					/>
				) : (
					<ProfileSettings />
				)}
			</div>
		</div>
	);
};

export default ProfilePanel;
