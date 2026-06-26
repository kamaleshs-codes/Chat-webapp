import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Sidebar from "../../components/Sidebar/Sidebar";
import ChatContainer from "../../components/Chat/ChatContainer";
import ProfilePanel from "../../components/Profile/ProfilePanel";

const Home = () => {
	// A state bridge to force the Profile Panel to open the personal settings tab
	const [forceSettings, setForceSettings] = useState(false);

	return (
		<MainLayout
			sidebar={
				<Sidebar 
					onOpenOwnSettings={() => setForceSettings(true)} 
				/>
			}
			chat={
				<ChatContainer />
			}
			profile={
				<ProfilePanel 
					forceSettings={forceSettings} 
					setForceSettings={setForceSettings} 
				/>
			}
		/>
	);
};

export default Home;
