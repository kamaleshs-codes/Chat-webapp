import React, { useState, useRef, useEffect } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import { BsSend } from "react-icons/bs";
import { FiPaperclip, FiSmile } from "react-icons/fi";
import toast from "react-hot-toast";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [showEmojis, setShowEmojis] = useState(false);
	const { loading, sendMessage } = useSendMessage();
	
	const emojiRef = useRef(null);
	const inputRef = useRef(null);

	// Standard list of popular emojis to display in popover
	const emojis = [
		"😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", 
		"🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", 
		"😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", 
		"🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", 
		"😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
		"👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤝", "👏", "🙌",
		"🔥", "✨", "🎉", "❤️", "💖", "⚡", "💡", "🚀", "💯", "✅"
	];

	// Close emoji picker when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (emojiRef.current && !emojiRef.current.contains(event.target)) {
				setShowEmojis(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message.trim()) return;
		
		await sendMessage(message.trim());
		setMessage("");
		setShowEmojis(false);
		
		// Re-focus input after sending
		inputRef.current?.focus();
	};

	const handleAddEmoji = (emoji) => {
		setMessage((prev) => prev + emoji);
		inputRef.current?.focus();
	};

	const handleAttachmentClick = () => {
		// Mock attachment upload flow
		toast.promise(
			new Promise((resolve) => setTimeout(resolve, 1500)),
			{
				loading: "Uploading attachment... 📎",
				success: "Attachment uploaded successfully!",
				error: "Failed to upload attachment.",
			}
		);
	};

	return (
		<div className="p-3 bg-white dark:bg-[#0E1424] border-t border-gray-100 dark:border-gray-850 transition-colors duration-300">
			<form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-full relative">
				
				{/* Attachment Button */}
				<button
					type="button"
					onClick={handleAttachmentClick}
					className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-850 transition-all duration-200 active:scale-90"
					title="Add attachment"
				>
					<FiPaperclip className="w-5 h-5" />
				</button>

				{/* Input and Emoji Button Container */}
				<div className="flex-1 relative flex items-center">
					<input
						ref={inputRef}
						type="text"
						placeholder="Write a message..."
						className="w-full text-sm pl-4 pr-11 py-3 rounded-2xl border border-gray-155 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/5 dark:focus:ring-cyan-500/5 transition-all duration-300"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						disabled={loading}
					/>

					{/* Emoji Trigger Button */}
					<button
						type="button"
						onClick={() => setShowEmojis(!showEmojis)}
						className={`absolute right-3 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-cyan-400 transition-colors duration-200`}
						title="Add emoji"
					>
						<FiSmile className="w-5 h-5" />
					</button>

					{/* Emoji Picker Popover */}
					{showEmojis && (
						<div 
							ref={emojiRef}
							className="absolute bottom-[115%] right-0 z-50 w-64 p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 shadow-2xl scale-100 fade-in"
						>
							<h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
								Popular Emojis
							</h4>
							<div className="grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto pr-1">
								{emojis.map((emoji, index) => (
									<button
										key={index}
										type="button"
										onClick={() => handleAddEmoji(emoji)}
										className="text-lg hover:bg-gray-100 dark:hover:bg-gray-800 p-1.5 rounded-lg transition-colors active:scale-90 select-none"
									>
										{emoji}
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Send Message Button */}
				<button
					type="submit"
					disabled={!message.trim() || loading}
					className={`
						p-3 rounded-2xl flex items-center justify-center text-white dark:text-gray-950 shadow-md transition-all duration-300 active:scale-95
						${message.trim() && !loading
							? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/15 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-cyan-500/15" 
							: "bg-gray-200 dark:bg-gray-850 text-gray-400 dark:text-gray-600 pointer-events-none shadow-none"
						}
					`}
					title="Send Message"
				>
					{loading ? (
						<span className="loading loading-spinner loading-xs" />
					) : (
						<BsSend className="w-4 h-4" />
					)}
				</button>
			</form>
		</div>
	);
};

export default MessageInput;
