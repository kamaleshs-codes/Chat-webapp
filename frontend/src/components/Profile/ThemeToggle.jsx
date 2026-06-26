import React from "react";
import { useThemeContext } from "../../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = ({ className = "" }) => {
	const { theme, toggleTheme } = useThemeContext();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={`p-2.5 rounded-xl border border-gray-100 hover:bg-gray-150 text-gray-500 hover:text-gray-850 dark:border-gray-800 dark:hover:bg-gray-850 dark:text-cyan-400 dark:hover:text-cyan-300 transition-all duration-300 active:scale-95 shadow-sm
				${className}
			`}
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				<FiMoon className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-[15deg]" />
			) : (
				<FiSun className="w-5 h-5 transition-transform duration-500 rotate-0 hover:rotate-[45deg]" />
			)}
		</button>
	);
};

export default ThemeToggle;
