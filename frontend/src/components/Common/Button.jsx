import React from "react";

const Button = ({
	children,
	onClick,
	type = "button",
	variant = "primary", // 'primary' | 'secondary' | 'ghost' | 'danger' | 'gradient'
	size = "md", // 'xs' | 'sm' | 'md' | 'lg'
	disabled = false,
	loading = false,
	className = "",
	icon,
	...props
}) => {
	const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none gap-2 select-none";
	
	const sizeStyles = {
		xs: "px-3 py-1 text-xs rounded-lg",
		sm: "px-4 py-2 text-sm",
		md: "px-5 py-2.5 text-sm",
		lg: "px-6 py-3 text-base rounded-2xl",
	};

	const variantStyles = {
		primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-gray-900 dark:shadow-cyan-500/10",
		secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200",
		ghost: "bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
		danger: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/10",
		gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 dark:from-cyan-500 dark:to-teal-500 dark:hover:from-cyan-400 dark:hover:to-teal-400 dark:text-gray-950 dark:shadow-cyan-500/25",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{loading ? (
				<span className="loading loading-spinner loading-xs"></span>
			) : (
				icon && <span className="text-lg">{icon}</span>
			)}
			{children}
		</button>
	);
};

export default Button;
