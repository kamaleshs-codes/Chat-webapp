import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Button from "../../components/Common/Button";
import { FiUser, FiLock, FiEye, FiEyeOff, FiMessageSquare } from "react-icons/fi";
import { useThemeContext } from "../../context/ThemeContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { loading, login } = useLogin();
	const { theme } = useThemeContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className="flex w-screen h-screen overflow-hidden bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
			{/* SPLIT SCREEN LAYOUT */}
			
			{/* Left Side: Premium Branding Hero (Hidden on Mobile) */}
			<div className="hidden lg:flex lg:w-1/2 h-full bg-gradient-to-tr from-blue-700 via-indigo-800 to-slate-950 dark:from-[#0B1528] dark:via-[#092244] dark:to-[#020813] p-12 flex-col justify-between relative overflow-hidden">
				
				{/* Glowing background circles for modern look */}
				<div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-blue-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-1/4 left-1/4 w-[280px] h-[280px] bg-indigo-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

				{/* Logo / Brand Name */}
				<div className="flex items-center gap-2.5 z-10">
					<div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
						<FiMessageSquare className="w-6 h-6" />
					</div>
					<h2 className="text-xl font-extrabold text-white tracking-tight">
						Chat<span className="text-blue-400 dark:text-cyan-400">Sync</span>
					</h2>
				</div>

				{/* Hero Center Catchphrase */}
				<div className="my-auto max-w-md space-y-4 z-10">
					<span className="px-3 py-1 text-xs font-bold text-blue-300 dark:text-cyan-400 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 uppercase tracking-widest">
						VERSION 2.0 REDESIGN
					</span>
					<h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
						Connect with colleagues in real-time, beautifully.
					</h1>
					<p className="text-sm text-gray-300 leading-relaxed">
						Experience a secure MERN stack chat workspace designed for peak performance, carrying fluid interfaces, light/dark themes, and micro-interactions.
					</p>
				</div>

				{/* Footer Info */}
				<div className="z-10 text-xs text-gray-400">
					<p>© 2026 ChatSync Corporation. All rights reserved.</p>
				</div>
			</div>

			{/* Right Side: Glassmorphism Form Container (Take 100% on small screens) */}
			<div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 bg-white dark:bg-[#0B0F19] transition-colors duration-300">
				<div className="w-full max-w-md space-y-8 fade-in">
					
					{/* Header titles for Mobile / Tablet */}
					<div className="text-center space-y-2 lg:text-left">
						<div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-teal-500 flex items-center justify-center text-white dark:text-gray-950 shadow-md shadow-blue-500/10 dark:shadow-cyan-500/10 mx-auto lg:mx-0 lg:hidden mb-4">
							<FiMessageSquare className="w-6 h-6" />
						</div>
						<h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
							Welcome back
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Please enter your credentials to access the workspace.
						</p>
					</div>

					{/* Form Card */}
					<div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0E1424] border border-gray-100 dark:border-gray-850/60 shadow-xl dark:shadow-cyan-500/2">
						<form onSubmit={handleSubmit} className="space-y-5">
							
							{/* Username input */}
							<div className="space-y-1.5">
								<label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-0.5">
									Username
								</label>
								<div className="relative">
									<FiUser className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400 dark:text-cyan-600/70" />
									<input
										type="text"
										placeholder="johndoe"
										className="w-full text-sm pl-11 pr-4 py-3 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/5 dark:focus:ring-cyan-500/5 transition-all duration-300"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</div>
							</div>

							{/* Password input */}
							<div className="space-y-1.5">
								<label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-0.5">
									Password
								</label>
								<div className="relative">
									<FiLock className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400 dark:text-cyan-600/70" />
									<input
										type={showPassword ? "text" : "password"}
										placeholder="••••••••"
										className="w-full text-sm pl-11 pr-11 py-3 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/5 dark:focus:ring-cyan-500/5 transition-all duration-300"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
									{/* Password Toggle */}
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3.5 inset-y-0 my-auto p-1 text-gray-400 hover:text-gray-600 dark:hover:text-cyan-400 transition-colors"
									>
										{showPassword ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
									</button>
								</div>
							</div>

							{/* Submit Action */}
							<Button
								type="submit"
								variant="gradient"
								loading={loading}
								className="w-full py-3 text-sm font-semibold rounded-2xl shadow-lg shadow-blue-500/10 dark:shadow-cyan-500/10 mt-2"
							>
								Sign In
							</Button>
						</form>
					</div>

					{/* Sign Up Redirect link */}
					<p className="text-center text-sm text-gray-500 dark:text-gray-450">
						New to the workspace?{" "}
						<Link
							to="/signup"
							className="font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline transition-colors"
						>
							Create an account
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
