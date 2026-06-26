import React from "react";

// Full Screen Page Loader
export const PageLoader = () => (
	<div className="flex items-center justify-center w-full h-full min-h-screen bg-[#F5F7FA] dark:bg-[#0B0F19]">
		<div className="flex flex-col items-center gap-4">
			<div className="relative w-16 h-16">
				<div className="absolute inset-0 border-4 border-blue-200 dark:border-cyan-950 rounded-full" />
				<div className="absolute inset-0 border-4 border-t-blue-600 dark:border-t-cyan-400 rounded-full animate-spin" />
			</div>
			<p className="text-sm font-medium text-gray-500 dark:text-cyan-600/60 animate-pulse tracking-wide">
				SECURELY CONNECTING...
			</p>
		</div>
	</div>
);

// Sidebar Conversation Skeleton Loader
export const ConversationSkeleton = () => (
	<div className="space-y-4 w-full p-2">
		{[...Array(5)].map((_, i) => (
			<div key={i} className="flex items-center gap-3 w-full animate-pulse p-2 rounded-xl">
				<div className="w-12 h-12 bg-gray-200 dark:bg-gray-850 rounded-full flex-shrink-0" />
				<div className="flex-1 space-y-2 py-1">
					<div className="h-4 bg-gray-200 dark:bg-gray-850 rounded w-1/3" />
					<div className="h-3 bg-gray-255/10 dark:bg-gray-850/60 rounded w-3/4" />
				</div>
			</div>
		))}
	</div>
);

// Message Bubble Skeleton Loader
export const MessageSkeleton = () => (
	<div className="flex flex-col gap-6 p-4 w-full h-full overflow-y-hidden">
		{/* Left (Receiver) Skeleton */}
		<div className="flex gap-3 items-start animate-pulse max-w-[70%]">
			<div className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0" />
			<div className="space-y-2">
				<div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-2xl rounded-tl-none w-48" />
				<div className="h-3 bg-gray-150 dark:bg-gray-850/40 rounded w-12" />
			</div>
		</div>

		{/* Right (Sender) Skeleton */}
		<div className="flex gap-3 items-start justify-end animate-pulse max-w-[70%] self-end">
			<div className="space-y-2 flex flex-col items-end">
				<div className="h-12 bg-blue-100 dark:bg-cyan-950/40 rounded-2xl rounded-tr-none w-64" />
				<div className="h-3 bg-gray-150 dark:bg-gray-850/40 rounded w-12" />
			</div>
			<div className="w-9 h-9 bg-blue-200 dark:bg-cyan-900 rounded-full flex-shrink-0" />
		</div>

		{/* Left Skeleton */}
		<div className="flex gap-3 items-start animate-pulse max-w-[70%]">
			<div className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0" />
			<div className="space-y-2">
				<div className="h-14 bg-gray-200 dark:bg-gray-800 rounded-2xl rounded-tl-none w-56" />
				<div className="h-3 bg-gray-150 dark:bg-gray-850/40 rounded w-12" />
			</div>
		</div>
	</div>
);

// Circular Avatar mini-spinner
export const MiniSpinner = ({ className = "" }) => (
	<span className={`loading loading-spinner text-blue-600 dark:text-cyan-400 ${className}`}></span>
);

const Loader = {
	Page: PageLoader,
	Conversation: ConversationSkeleton,
	Message: MessageSkeleton,
	Mini: MiniSpinner,
};

export default Loader;
