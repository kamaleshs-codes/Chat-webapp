import React from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { HiLightningBolt, HiOutlineGlobe, HiOutlineShieldCheck } from "react-icons/hi";

const EmptyState = () => {
	const { authUser } = useAuthContext();
	const fullName = authUser?.fullName || "User";

	return (
		<div className="flex flex-col items-center justify-center w-full h-full p-8 text-center bg-[#F5F7FA] dark:bg-[#0B0F19] transition-colors duration-300">
			<div className="max-w-md space-y-8 fade-in">
				{/* Visual Illustration Icon */}
				<div className="relative mx-auto w-28 h-28 flex items-center justify-center rounded-3xl bg-blue-50 dark:bg-cyan-950/20 text-blue-600 dark:text-cyan-400 border border-blue-100/50 dark:border-cyan-800/20 shadow-lg shadow-blue-500/5 dark:shadow-cyan-500/5">
					<TiMessages className="w-16 h-16 animate-bounce duration-[3000ms]" />
					
					{/* Glowing circles in dark mode */}
					<div className="absolute -inset-2 rounded-3xl border border-cyan-500/10 dark:opacity-100 opacity-0 blur-md pointer-events-none" />
				</div>

				{/* Welcome Headers */}
				<div className="space-y-3">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-400 dark:to-teal-400 font-extrabold">{fullName}</span> 👋
					</h2>
					<p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
						Select a colleague or conversation from the left sidebar to start collaborating in real-time.
					</p>
				</div>

				{/* Feature Cards Grid (Slack/Discord style) */}
				<div className="grid grid-cols-3 gap-4 pt-4 text-left">
					<div className="p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 shadow-sm space-y-1">
						<HiLightningBolt className="w-5 h-5 text-amber-500" />
						<h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Real-time</h4>
						<p className="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">Instant messaging via Socket.IO.</p>
					</div>
					
					<div className="p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 shadow-sm space-y-1">
						<HiOutlineShieldCheck className="w-5 h-5 text-green-500" />
						<h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Secure</h4>
						<p className="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">JWT authorization protected routes.</p>
					</div>

					<div className="p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 shadow-sm space-y-1">
						<HiOutlineGlobe className="w-5 h-5 text-blue-500" />
						<h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Online Badges</h4>
						<p className="text-[10px] text-gray-400 dark:text-gray-500 leading-snug">Live presence indicator states.</p>
					</div>
				</div>

				{/* Interactive Helper Hint */}
				<div className="pt-6 border-t border-gray-100 dark:border-gray-850">
					<div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 text-xs text-gray-400 dark:text-gray-500 font-medium">
						<span>Tip: Use</span>
						<kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold text-[10px]">Ctrl</kbd>
						<span>+</span>
						<kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold text-[10px]">F</kbd>
						<span>to search users quickly</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmptyState;
