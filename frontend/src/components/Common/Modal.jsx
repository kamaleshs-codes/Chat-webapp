import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = "md", // 'sm' | 'md' | 'lg' | 'xl'
}) => {
	// Close on Escape key press
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			document.body.style.overflow = "hidden";
			window.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.body.style.overflow = "unset";
			window.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const sizeClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
			{/* Backdrop Overlay */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
				onClick={onClose}
			/>

			{/* Modal Container */}
			<div
				className={`relative w-full ${sizeClasses[size]} rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl p-6 transform transition-all duration-300 scale-100 fade-in`}
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">
						{title}
					</h3>
					<button
						onClick={onClose}
						className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
					>
						<IoClose className="w-5 h-5" />
					</button>
				</div>

				{/* Modal Content */}
				<div className="max-h-[70vh] overflow-y-auto pr-1">
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
