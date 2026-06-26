import React, { useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { FiPhone, FiVideo, FiInfo, FiChevronLeft, FiPhoneOff, FiMic, FiMicOff } from "react-icons/fi";
import toast from "react-hot-toast";

const ChatHeader = ({ 
	selectedConversation, 
	isMobile, 
	onBackToSidebar,
	isProfileOpen,
	onToggleProfile 
}) => {
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(selectedConversation?._id);

	// Mock call states
	const [activeCall, setActiveCall] = useState(null); // 'voice' | 'video' | null
	const [isMuted, setIsMuted] = useState(false);

	const triggerCall = (type) => {
		setActiveCall(type);
		toast.success(`Starting ${type} call with ${selectedConversation?.fullName}...`);
	};

	const endCall = () => {
		setActiveCall(null);
		setIsMuted(false);
		toast.error("Call ended");
	};

	if (!selectedConversation) return null;

	return (
		<div className="relative">
			{/* Top Header Navbar */}
			<div className="px-4 py-3 bg-white dark:bg-[#0E1424] border-b border-gray-105 dark:border-gray-850 flex items-center justify-between shadow-sm transition-colors duration-300">
				
				{/* Colleague Profile Info */}
				<div className="flex items-center gap-3 min-w-0">
					{/* Back button for Mobile */}
					{isMobile && (
						<button 
							onClick={onBackToSidebar}
							className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-850 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mr-1"
						>
							<FiChevronLeft className="w-6 h-6" />
						</button>
					)}

					{/* Avatar click toggles profile drawer */}
					<div 
						onClick={onToggleProfile}
						className="relative cursor-pointer hover:opacity-90 active:scale-95 transition-all flex-shrink-0"
					>
						<div className="w-10.5 h-10.5 rounded-xl overflow-hidden ring-2 ring-gray-100 dark:ring-gray-800">
							<img 
								src={selectedConversation.profilePic} 
								alt={selectedConversation.fullName} 
								className="w-full h-full object-cover"
							/>
						</div>
						{isOnline && (
							<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#0E1424] shadow-sm animate-pulse" />
						)}
					</div>

					<div className="min-w-0 cursor-pointer" onClick={onToggleProfile}>
						<h3 className="text-sm font-extrabold text-gray-900 dark:text-white truncate leading-tight hover:underline">
							{selectedConversation.fullName}
						</h3>
						<p className="text-[11px] text-gray-450 dark:text-cyan-500/80 font-medium">
							{isOnline ? "Active now" : "Offline"}
						</p>
					</div>
				</div>

				{/* Call & Profile Actions */}
				<div className="flex items-center gap-1">
					<button
						onClick={() => triggerCall("voice")}
						className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-850 border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all active:scale-90"
						title="Voice Call"
					>
						<FiPhone className="w-4.5 h-4.5" />
					</button>
					<button
						onClick={() => triggerCall("video")}
						className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-850 border border-transparent hover:border-gray-100 dark:hover:border-gray-800 transition-all active:scale-90"
						title="Video Call"
					>
						<FiVideo className="w-4.5 h-4.5" />
					</button>
					
					<div className="w-px h-6 bg-gray-100 dark:bg-gray-850 mx-1.5" />

					<button
						onClick={onToggleProfile}
						className={`
							p-2.5 rounded-xl border transition-all active:scale-90
							${isProfileOpen 
								? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-[#1C2C4E]/40 dark:text-cyan-400 dark:border-cyan-500/30" 
								: "text-gray-400 border-transparent hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-850 hover:border-gray-100 dark:hover:border-gray-800"
							}
						`}
						title="Toggle Details"
					>
						<FiInfo className="w-4.5 h-4.5" />
					</button>
				</div>
			</div>

			{/* HIGH-FIDELITY CALLING INTERFACE OVERLAY */}
			{activeCall && (
				<div className="absolute inset-x-0 top-[100%] z-50 p-4 bg-white/80 dark:bg-[#0E1424]/80 backdrop-blur-md border-b border-blue-100/50 dark:border-cyan-500/10 shadow-lg flex items-center justify-between fade-in mx-4 mt-2 rounded-2xl border">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full overflow-hidden animate-pulse ring-2 ring-blue-500 dark:ring-cyan-450">
							<img src={selectedConversation.profilePic} alt="" />
						</div>
						<div>
							<p className="text-xs font-bold text-gray-900 dark:text-white">
								{activeCall === "voice" ? "Voice Calling..." : "Video Connection Dialing..."}
							</p>
							<p className="text-[10px] text-gray-400 dark:text-gray-500">
								{selectedConversation.fullName}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setIsMuted(!isMuted)}
							className={`p-2 rounded-xl text-xs font-bold border transition-colors
								${isMuted 
									? "bg-amber-500 text-white border-transparent" 
									: "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-800 hover:bg-gray-100"
								}
							`}
						>
							{isMuted ? <FiMicOff className="w-4 h-4" /> : <FiMic className="w-4 h-4" />}
						</button>
						<button
							onClick={endCall}
							className="p-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-colors"
						>
							<FiPhoneOff className="w-4.5 h-4.5" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatHeader;
