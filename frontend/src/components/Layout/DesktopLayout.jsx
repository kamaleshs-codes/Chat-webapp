import React from "react";
import MainLayout from "./MainLayout";

const DesktopLayout = ({ sidebar, chat, profile }) => {
	return (
		<MainLayout 
			sidebar={sidebar} 
			chat={chat} 
			profile={profile} 
		/>
	);
};

export default DesktopLayout;
