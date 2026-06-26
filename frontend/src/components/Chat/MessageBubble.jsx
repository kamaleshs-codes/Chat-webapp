import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { HiCheck, HiCheckCircle } from "react-icons/hi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const MessageBubble = ({ message }) => {
	const { authUser } = useAuthContext();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`flex flex-col w-full mb-3.5 fade-in ${fromMe ? "items-end" : "items-start"}`}>
			<div className="flex gap-2 max-w-[75%] items-end">
				{/* Avatar for receiver (Optional, Slack/Discord usually groups, but WhatsApp/Teams shows them) */}
				{!fromMe && (
					<div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-100 dark:ring-gray-800 hidden md:block">
						<img src={message.profilePic || "https://avatar.iran.liara.run/public"} alt="" className="w-full h-full object-cover" />
					</div>
				)}

				{/* Chat Bubble Card */}
				<div className="space-y-1">
					<div
						className={`
							px-4 py-2.5 shadow-sm text-sm leading-relaxed ${shakeClass}
							${fromMe
								? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-none shadow-blue-500/5 dark:from-cyan-500 dark:to-teal-500 dark:text-gray-950 dark:shadow-cyan-500/5"
								: "bg-white text-gray-800 dark:bg-gray-850 dark:text-gray-200 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-800"
							}
						`}
					>
						<p className="whitespace-pre-wrap break-words">{message.message}</p>
					</div>

					{/* Timestamp & Delivery Receipt */}
					<div className={`flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 font-medium ${fromMe ? "justify-end" : "justify-start pl-1"}`}>
						<span>{formattedTime}</span>
						{fromMe && (
							// Double blue checkmark for read, double grey checkmark for delivered
							<IoCheckmarkDoneSharp className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400 animate-pulse" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageBubble;
