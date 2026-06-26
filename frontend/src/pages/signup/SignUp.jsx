import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import GenderCheckbox from "./GenderCheckbox";
import Button from "../../components/Common/Button";
import { FiUser, FiLock, FiEye, FiEyeOff, FiFileText, FiMessageSquare } from "react-icons/fi";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className="flex w-screen h-screen overflow-hidden bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300">
			{/* SPLIT SCREEN LAYOUT */}
			
			{/* Left Side: Premium Branding Hero (Hidden on Mobile) */}
			<div className="hidden lg:flex lg:w-1/2 h-full bg-gradient-to-tr from-blue-700 via-indigo-800 to-slate-950 dark:from-[#0B1528] dark:via-[#092244] dark:to-[#020813] p-12 flex-col justify-between relative overflow-hidden">
				
				{/* Glowing background circles */}
				<div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-blue-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-1/4 left-1/4 w-[280px] h-[280px] bg-indigo-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

				{/* Logo */}
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
						CREATING ACCOUNT
					</span>
					<h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
						Join the workspace of tomorrow.
					</h1>
					<p className="text-sm text-gray-300 leading-relaxed">
						Sign up in under 10 seconds to chat in real-time, customize your profile, collaborate with peers, and adjust your dark or light setups effortlessly.
					</p>
				</div>

				{/* Footer Info */}
				<div className="z-10 text-xs text-gray-400">
					<p>© 2026 ChatSync Corporation. All rights reserved.</p>
				</div>
			</div>

			{/* Right Side: Glassmorphism Form Container */}
			<div className="w-full lg:w-1/2 h-full flex items-center justify-center p-6 bg-white dark:bg-[#0B0F19] transition-colors duration-300 overflow-y-auto">
				<div className="w-full max-w-md space-y-6 py-6 fade-in">
					
					{/* Header titles */}
					<div className="text-center space-y-2 lg:text-left">
						<div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-teal-500 flex items-center justify-center text-white dark:text-gray-950 shadow-md shadow-blue-500/10 dark:shadow-cyan-500/10 mx-auto lg:mx-0 lg:hidden mb-4">
							<FiMessageSquare className="w-6 h-6" />
						</div>
						<h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
							Get started
						</h2>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Create a free account to start chatting with your colleagues.
						</p>
					</div>

					{/* Form Card */}
					<div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0E1424] border border-gray-100 dark:border-gray-850/60 shadow-xl">
						<form onSubmit={handleSubmit} className="space-y-4">
							
							{/* Full Name input */}
							<div className="space-y-1">
								<label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-0.5">
									Full Name
								</label>
								<div className="relative">
									<FiFileText className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400 dark:text-cyan-600/70" />
									<input
										type="text"
										placeholder="John Doe"
										className="w-full text-sm pl-11 pr-4 py-2.5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/5 dark:focus:ring-cyan-500/5 transition-all duration-300"
										value={inputs.fullName}
										onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
										required
									/>
								</div>
							</div>

							{/* Username input */}
							<div className="space-y-1">
								<label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-0.5">
									Username
								</label>
								<div className="relative">
									<FiUser className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400 dark:text-cyan-600/70" />
									<input
										type="text"
										placeholder="johndoe"
										className="w-full text-sm pl-11 pr-4 py-2.5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/5 dark:focus:ring-cyan-500/5 transition-all duration-300"
										value={inputs.username}
										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
										required
									/>
								</div>
							</div>

							{/* Password input */}
							<div className="space-y-1">
								<label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-0.5">
									Password
								</label>
								<div className="relative">
									<FiLock className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400 dark:text-cyan-600/70" />
									<input
										type={showPassword ? "text" : "password"}
										placeholder="••••••••"
										className="w-full text-sm pl-11 pr-11 py-2.5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/5 dark:focus:ring-cyan-500/5 transition-all duration-300"
										value={inputs.password}
										onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3.5 inset-y-0 my-auto p-1 text-gray-400 hover:text-gray-600 dark:hover:text-cyan-400 transition-colors"
									>
										{showPassword ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
									</button>
								</div>
							</div>

							{/* Confirm Password input */}
							<div className="space-y-1">
								<label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-0.5">
									Confirm Password
								</label>
								<div className="relative">
									<FiLock className="absolute inset-y-0 left-3.5 my-auto w-4.5 h-4.5 text-gray-400 dark:text-cyan-600/70" />
									<input
										type={showConfirmPassword ? "text" : "password"}
										placeholder="••••••••"
										className="w-full text-sm pl-11 pr-11 py-2.5 rounded-2xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-[#151D30] text-gray-850 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-blue-500/5 dark:focus:ring-cyan-500/5 transition-all duration-300"
										value={inputs.confirmPassword}
										onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3.5 inset-y-0 my-auto p-1 text-gray-400 hover:text-gray-600 dark:hover:text-cyan-400 transition-colors"
									>
										{showConfirmPassword ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
									</button>
								</div>
							</div>

							{/* Gender selection */}
							<div className="pt-1.5">
								<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
							</div>

							{/* Submit Action */}
							<Button
								type="submit"
								variant="gradient"
								loading={loading}
								className="w-full py-2.5 text-sm font-semibold rounded-2xl shadow-lg shadow-blue-500/10 dark:shadow-cyan-500/10 mt-3"
							>
								Create Account
							</Button>
						</form>
					</div>

					{/* Sign In Redirect Link */}
					<p className="text-center text-sm text-gray-500 dark:text-gray-450">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-bold text-blue-600 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 hover:underline transition-colors"
						>
							Sign In
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
