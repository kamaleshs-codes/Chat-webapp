import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useThemeContext } from "../../context/ThemeContext";
import useLogout from "../../hooks/useLogout";
import Button from "../Common/Button";
import toast from "react-hot-toast";
import { 
	FiSettings, FiEye, FiEyeOff, FiBell, FiShield, 
	FiLock, FiSlash, FiLogOut, FiSun, FiMoon 
} from "react-icons/fi";

const ProfileSettings = () => {
	const { authUser, setAuthUser } = useAuthContext();
	const { theme, toggleTheme, setTheme } = useThemeContext();
	const { loading: logoutLoading, logout } = useLogout();

	// Local states for inputs
	const [fullName, setFullName] = useState(authUser?.fullName || "");
	const [username, setUsername] = useState(authUser?.username || "");
	const [email, setEmail] = useState(
		localStorage.getItem(`chat-user-email-${authUser?._id}`) || `${authUser?.username || "user"}@example.com`
	);
	const [about, setAbout] = useState(
		localStorage.getItem(`chat-user-about-${authUser?._id}`) || "Hey there! I am using ChatApp."
	);

	// Password change states
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPasswords, setShowPasswords] = useState(false);

	// Panel states
	const [activeSection, setActiveSection] = useState(null); // 'profile' | 'password' | 'future'
	const [saving, setSaving] = useState(false);

	const toggleSection = (section) => {
		setActiveSection(activeSection === section ? null : section);
	};

	// Save profile settings
	const handleSaveProfile = async (e) => {
		e.preventDefault();
		if (!fullName || !username || !email) {
			return toast.error("Please fill in all required fields");
		}

		setSaving(true);
		try {
			// Simulate API save delay
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Update Context State
			const updatedUser = {
				...authUser,
				fullName,
				username,
			};
			
			localStorage.setItem("chat-user", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);

			// Persist email/about locally per user
			localStorage.setItem(`chat-user-email-${authUser?._id}`, email);
			localStorage.setItem(`chat-user-about-${authUser?._id}`, about);

			toast.success("Profile updated successfully");
			setActiveSection(null);
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			setSaving(false);
		}
	};

	// Save password
	const handleSavePassword = async (e) => {
		e.preventDefault();
		if (!currentPassword || !newPassword || !confirmPassword) {
			return toast.error("Please fill in all password fields");
		}
		if (newPassword.length < 6) {
			return toast.error("New password must be at least 6 characters");
		}
		if (newPassword !== confirmPassword) {
			return toast.error("Passwords do not match");
		}

		setSaving(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success("Password changed successfully");
			// Clear fields
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
			setActiveSection(null);
		} catch (error) {
			toast.error("Failed to change password");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="flex flex-col h-full bg-white dark:bg-[#0E1424] transition-colors duration-300">
			{/* Settings Title */}
			<div className="p-4 border-b border-gray-100 dark:border-gray-850 flex items-center gap-2">
				<FiSettings className="w-5 h-5 text-blue-500 dark:text-cyan-400" />
				<h3 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h3>
			</div>

			{/* Scrollable Panel Area */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				
				{/* 1. Theme Settings Panel */}
				<div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-850 space-y-3">
					<h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
						Theme Settings
					</h4>
					<div className="grid grid-cols-2 gap-2">
						<button
							onClick={() => setTheme("light")}
							className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border font-medium text-sm transition-all duration-200
								${theme === "light" 
									? "bg-white text-blue-600 border-blue-500 shadow-sm" 
									: "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
								}
							`}
						>
							<FiSun className="w-4 h-4" /> Light
						</button>
						<button
							onClick={() => setTheme("dark")}
							className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border font-medium text-sm transition-all duration-200
								${theme === "dark" 
									? "bg-gray-950 text-cyan-400 border-cyan-500/60 shadow-md shadow-cyan-500/5" 
									: "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
								}
							`}
						>
							<FiMoon className="w-4 h-4" /> Dark
						</button>
					</div>
				</div>

				{/* 2. Edit Profile Settings Accordion */}
				<div className="rounded-2xl border border-gray-100 dark:border-gray-850 overflow-hidden">
					<button
						onClick={() => toggleSection("profile")}
						className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-900/50 text-left font-semibold text-sm text-gray-800 dark:text-gray-200"
					>
						<span>Edit Profile Info</span>
						<span className={`transition-transform duration-200 ${activeSection === "profile" ? "rotate-180" : ""}`}>▼</span>
					</button>
					
					{activeSection === "profile" && (
						<form onSubmit={handleSaveProfile} className="p-4 space-y-4 border-t border-gray-100 dark:border-gray-850 bg-white dark:bg-[#0E1424]">
							<div>
								<label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">Full Name</label>
								<input
									type="text"
									className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
									value={fullName}
									onChange={(e) => setFullName(e.target.value)}
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">Username</label>
								<input
									type="text"
									className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">Email</label>
								<input
									type="email"
									className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">About</label>
								<textarea
									rows={2}
									className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors resize-none"
									value={about}
									onChange={(e) => setAbout(e.target.value)}
								/>
							</div>
							<Button type="submit" variant="gradient" size="sm" className="w-full" loading={saving}>
								Save Profile
							</Button>
						</form>
					)}
				</div>

				{/* 3. Change Password Accordion */}
				<div className="rounded-2xl border border-gray-100 dark:border-gray-850 overflow-hidden">
					<button
						onClick={() => toggleSection("password")}
						className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-900/50 text-left font-semibold text-sm text-gray-800 dark:text-gray-200"
					>
						<span>Change Password</span>
						<span className={`transition-transform duration-200 ${activeSection === "password" ? "rotate-180" : ""}`}>▼</span>
					</button>

					{activeSection === "password" && (
						<form onSubmit={handleSavePassword} className="p-4 space-y-3 border-t border-gray-100 dark:border-gray-850 bg-white dark:bg-[#0E1424]">
							<div className="relative">
								<label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">Current Password</label>
								<input
									type={showPasswords ? "text" : "password"}
									className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
								/>
							</div>
							<div className="relative">
								<label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">New Password</label>
								<input
									type={showPasswords ? "text" : "password"}
									className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
								/>
							</div>
							<div className="relative">
								<label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1">Confirm Password</label>
								<input
									type={showPasswords ? "text" : "password"}
									className="w-full text-sm p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</div>
							
							<div className="flex items-center justify-between pt-1">
								<button
									type="button"
									onClick={() => setShowPasswords(!showPasswords)}
									className="text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1"
								>
									{showPasswords ? <FiEyeOff /> : <FiEye />} {showPasswords ? "Hide" : "Show"} passwords
								</button>
							</div>

							<Button type="submit" variant="gradient" size="sm" className="w-full" loading={saving}>
								Update Password
							</Button>
						</form>
					)}
				</div>

				{/* 4. Future Ready Collapsible Accordions */}
				<div className="space-y-2">
					<h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-1">
						Preferences & Future Ready
					</h4>

					{/* Accordion List */}
					<div className="rounded-2xl border border-gray-100 dark:border-gray-850 divide-y divide-gray-100 dark:divide-gray-850 overflow-hidden">
						{/* Notifications */}
						<details className="group">
							<summary className="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-gray-900/30 font-medium text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none">
								<span className="flex items-center gap-2"><FiBell className="text-amber-500" /> Notifications</span>
								<span className="transition-transform group-open:rotate-180 text-[10px]">▼</span>
							</summary>
							<div className="p-3 bg-white dark:bg-[#0E1424] text-xs text-gray-500 dark:text-gray-400 space-y-2">
								<label className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-primary" />
									Desktop Notifications
								</label>
								<label className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-primary" />
									Play Sound on Message
								</label>
							</div>
						</details>

						{/* Privacy & Security */}
						<details className="group">
							<summary className="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-gray-900/30 font-medium text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none">
								<span className="flex items-center gap-2"><FiShield className="text-emerald-500" /> Privacy & Security</span>
								<span className="transition-transform group-open:rotate-180 text-[10px]">▼</span>
							</summary>
							<div className="p-3 bg-white dark:bg-[#0E1424] text-xs text-gray-500 dark:text-gray-400 space-y-2">
								<label className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-primary" />
									Show Online Presence
								</label>
								<label className="flex items-center gap-2 cursor-pointer">
									<input type="checkbox" defaultChecked className="checkbox checkbox-xs checkbox-primary" />
									Read Receipts (Blue checks)
								</label>
							</div>
						</details>

						{/* Blocked Users */}
						<details className="group">
							<summary className="flex items-center justify-between p-3.5 bg-gray-50/50 dark:bg-gray-900/30 font-medium text-xs text-gray-700 dark:text-gray-300 cursor-pointer select-none">
								<span className="flex items-center gap-2"><FiSlash className="text-rose-500" /> Blocked Users</span>
								<span className="transition-transform group-open:rotate-180 text-[10px]">▼</span>
							</summary>
							<div className="p-3 bg-white dark:bg-[#0E1424] text-xs text-gray-500 dark:text-gray-400">
								<p className="italic">No blocked users on your account.</p>
							</div>
						</details>
					</div>
				</div>
			</div>

			{/* Logout Section */}
			<div className="p-4 border-t border-gray-100 dark:border-gray-850 bg-gray-50 dark:bg-gray-900/20">
				<Button
					onClick={logout}
					loading={logoutLoading}
					variant="danger"
					icon={<FiLogOut />}
					className="w-full shadow-lg shadow-red-500/10 hover:shadow-red-500/20 py-3 text-sm font-semibold rounded-2xl"
				>
					Log Out Account
				</Button>
			</div>
		</div>
	);
};

export default ProfileSettings;
