import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { extractTime } from "../../utils/extractTime";
import { IoCloseOutline } from "react-icons/io5";
import { FiMail, FiInfo, FiCalendar, FiUser } from "react-icons/fi";

const ProfileCard = ({ user, isSelf = false, onCloseProfile }) => {
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(user?._id);

	// Get local email/about or defaults
	const localEmail = localStorage.getItem(`chat-user-email-${user?._id}`) || `${user?.username || "user"}@example.com`;
	const localAbout = localStorage.getItem(`chat-user-about-${user?._id}`) || "Hey there! I am using ChatApp.";

	// Format member since date
	const memberSince = user?.createdAt 
		? new Date(user.createdAt).toLocaleDateString("en-US", {
				month: "long",
				year: "numeric",
		  })
		: "June 2026";

	if (!user) return null;

	return (
		<div className="flex flex-col h-full bg-white dark:bg-[#0E1424] transition-colors duration-300">
			{/* Profile Header */}
			<div className="p-4 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between">
				<h3 className="text-lg font-bold text-gray-900 dark:text-white">
					{isSelf ? "My Profile" : "Contact Details"}
				</h3>
				{onCloseProfile && (
					<button
						onClick={onCloseProfile}
						className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
					>
						<IoCloseOutline className="w-5 h-5" />
					</button>
				)}
			</div>

			{/* Profile Scroll Area */}
			<div className="flex-1 overflow-y-auto p-6 space-y-6">
				{/* Large Profile Image & Status Badge */}
				<div className="flex flex-col items-center text-center space-y-4">
					<div className="relative">
						<div className="w-28 h-28 rounded-3xl overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800/60 shadow-lg">
							<img
								src={user.profilePic}
								alt={user.fullName}
								className="w-full h-full object-cover"
							/>
						</div>
						{/* Online indicator */}
						<span
							className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-4 border-white dark:border-[#0E1424] shadow-md
								${isOnline || isSelf ? "bg-green-500 animate-pulse" : "bg-gray-400"}
							`}
						/>
					</div>

					<div>
						<h4 className="text-xl font-bold text-gray-900 dark:text-white">
							{user.fullName}
						</h4>
						<p className="text-xs text-gray-400 dark:text-cyan-500/80 font-medium tracking-wide">
							@{user.username}
						</p>
						<span
							className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mt-2
								${isOnline || isSelf 
									? "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400" 
									: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
								}
							`}
						>
							{isOnline || isSelf ? "Online" : "Offline"}
						</span>
					</div>
				</div>

				<div className="divider my-0 opacity-50" />

				{/* User Information details */}
				<div className="space-y-4">
					<h5 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
						About User
					</h5>

					{/* Username Detail */}
					<div className="flex items-start gap-3">
						<FiUser className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
						<div>
							<p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Username</p>
							<p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
								{user.username}
							</p>
						</div>
					</div>

					{/* Email Detail */}
					<div className="flex items-start gap-3">
						<FiMail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
						<div>
							<p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Email Address</p>
							<p className="text-sm font-semibold text-gray-800 dark:text-gray-200 break-all">
								{localEmail}
							</p>
						</div>
					</div>

					{/* About Detail */}
					<div className="flex items-start gap-3">
						<FiInfo className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
						<div>
							<p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Bio</p>
							<p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
								{localAbout}
							</p>
						</div>
					</div>

					{/* Member Since Detail */}
					<div className="flex items-start gap-3">
						<FiCalendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
						<div>
							<p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Member Since</p>
							<p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
								{memberSince}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
