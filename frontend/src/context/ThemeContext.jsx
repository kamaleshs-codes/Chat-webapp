import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
	return useContext(ThemeContext);
};

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(localStorage.getItem("chat-theme") || "dark");

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
			root.setAttribute("data-theme", "dark");
		} else {
			root.classList.remove("dark");
			root.setAttribute("data-theme", "light");
		}
		localStorage.setItem("chat-theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
