import React, { useState, useEffect } from "react";
import useConversation from "../../zustand/useConversation";

const MainLayout = ({ sidebar, chat, profile }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const [isProfileOpen, setIsProfileOpen] = useState(true); // default open on desktop
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

	// Track window resize
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 1024;
			setIsMobile(mobile);
			
			// Auto close profile on small screens, auto open on large screens
			if (mobile) {
				setIsProfileOpen(false);
			} else {
				setIsProfileOpen(true);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // run initially

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Force close profile drawer on mobile if chat changes, etc.
	useEffect(() => {
		if (isMobile) {
			setIsProfileOpen(false);
		}
	}, [selectedConversation?._id, isMobile]);

	return (
		<div className="flex w-screen h-screen overflow-hidden bg-white dark:bg-[#0B0F19] text-gray-900 dark:text-gray-100 transition-colors duration-300">
			{/* MOBILE DRAWER OR LAPTOP/DESKTOP GRID */}
			
			{/* Left Sidebar Pane (30% on desktop) */}
			<div
				className={`
					h-full border-r border-gray-100 dark:border-gray-850 flex-shrink-0 transition-all duration-300 ease-in-out z-20
					${isMobile 
						? `fixed inset-y-0 left-0 w-[290px] bg-white dark:bg-[#0E1424] shadow-2xl drawer-transition ${selectedConversation ? "-translate-x-full" : "translate-x-0"}` 
						: "w-[30%]"
					}
				`}
			>
				{sidebar}
			</div>

			{/* Middle Chat Pane (45% on desktop with profile open, 70% with profile closed) */}
			<div
				className={`
					h-full flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out bg-[#F5F7FA] dark:bg-[#0B0F19] z-10
					${isMobile && !selectedConversation ? "hidden" : "flex"}
				`}
			>
				{React.cloneElement(chat, { 
					isMobile,
					onBackToSidebar: () => setSelectedConversation(null),
					isProfileOpen,
					onToggleProfile: () => setIsProfileOpen(!isProfileOpen)
				})}
			</div>

			{/* Right Profile Pane (25% on desktop) */}
			<div
				className={`
					h-full border-l border-gray-100 dark:border-gray-850 flex-shrink-0 transition-all duration-300 ease-in-out z-30 bg-white dark:bg-[#0E1424]
					${isMobile 
						? `fixed inset-y-0 right-0 w-[290px] shadow-2xl drawer-transition ${isProfileOpen ? "translate-x-0" : "translate-x-full"}` 
						: `${isProfileOpen ? "w-[25%]" : "w-0 overflow-hidden border-l-0"}`
					}
				`}
			>
				{/* Drawer Backdrop overlay on mobile */}
				{isMobile && isProfileOpen && (
					<div 
						className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10"
						onClick={() => setIsProfileOpen(false)}
					/>
				)}
				
				{/* Render profile component */}
				{React.cloneElement(profile, { 
					onCloseProfile: isMobile ? () => setIsProfileOpen(false) : null 
				})}
			</div>
		</div>
	);
};

export default MainLayout;
