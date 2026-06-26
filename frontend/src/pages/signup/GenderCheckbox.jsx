import React from "react";
import { FiUser, FiUserCheck } from "react-icons/fi";

const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		<div className="space-y-1.5">
			<label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider pl-0.5">
				Select Gender
			</label>
			<div className="flex gap-3">
				{/* Male Option */}
				<button
					type="button"
					onClick={() => onCheckboxChange("male")}
					className={`
						flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border text-sm font-semibold transition-all duration-300 active:scale-[0.97]
						${selectedGender === "male"
							? "bg-blue-50/50 text-blue-600 border-blue-500 shadow-sm dark:bg-cyan-950/10 dark:text-cyan-400 dark:border-cyan-400"
							: "bg-gray-50 dark:bg-[#151D30] text-gray-500 dark:text-gray-400 border-gray-150 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-850"
						}
					`}
				>
					{selectedGender === "male" ? <FiUserCheck className="w-4.5 h-4.5" /> : <FiUser className="w-4.5 h-4.5" />}
					Male
				</button>

				{/* Female Option */}
				<button
					type="button"
					onClick={() => onCheckboxChange("female")}
					className={`
						flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl border text-sm font-semibold transition-all duration-300 active:scale-[0.97]
						${selectedGender === "female"
							? "bg-blue-50/50 text-blue-600 border-blue-500 shadow-sm dark:bg-cyan-950/10 dark:text-cyan-400 dark:border-cyan-400"
							: "bg-gray-50 dark:bg-[#151D30] text-gray-500 dark:text-gray-400 border-gray-150 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-850"
						}
					`}
				>
					{selectedGender === "female" ? <FiUserCheck className="w-4.5 h-4.5" /> : <FiUser className="w-4.5 h-4.5" />}
					Female
				</button>
			</div>
		</div>
	);
};

export default GenderCheckbox;
