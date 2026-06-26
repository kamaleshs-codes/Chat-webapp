import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ 
	search, 
	setSearch, 
	activeTab, 
	setActiveTab 
}) => {
	return (
		<div className="p-4 space-y-3 bg-white dark:bg-[#0E1424] transition-colors duration-300">
			{/* Search Input Container */}
			<div className="relative">
				<IoSearch className="absolute inset-y-0 left-3.5 my-auto w-5 h-5 text-gray-400 dark:text-cyan-600/70" />
				<input
					type="text"
					placeholder="Search colleague, chats..."
					className="w-full text-sm pl-11 pr-4 py-2.5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/10 dark:focus:ring-cyan-500/10 transition-all duration-300"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			{/* Filter Tab buttons */}
			<div className="flex gap-1.5 p-1 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-850">
				{["chats", "contacts", "online"].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`
							flex-1 py-1.5 px-2 text-xs font-bold rounded-lg capitalize transition-all duration-200
							${activeTab === tab 
								? "bg-white dark:bg-[#1A2336] text-blue-600 dark:text-cyan-400 shadow-sm" 
								: "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
							}
						`}
					>
						{tab}
					</button>
				))}
			</div>
		</div>
	);
};

export default SearchBar;
