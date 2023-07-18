"use client";

import {
	DetailedHTMLProps,
	InputHTMLAttributes,
	forwardRef,
	ReactElement,
} from "react";
import clsx from "clsx";

interface TextInputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	isFullWidth?: boolean;
	label: string;
	name: string;
	errorMessage?: string;
	className?: string;
	Icon?: ReactElement;
	iconLabel?: string;
	onIconClick?: () => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
	(
		{
			className,
			isFullWidth = false,
			label,
			name,
			errorMessage,
			Icon,
			iconLabel,
			onIconClick,
			...restProps
		},
		ref,
	) => (
		<div
			className={clsx(
				isFullWidth ? "w-full" : "w-auto",
				"relative",
				"max-w-[320px]",
				className,
			)}
		>
			<input
				ref={ref}
				className="peer h-14 w-full border-b-2 border-gray-300 bg-transparent pr-11 pt-4 align-text-bottom text-gray-700 transition-all delay-200 duration-100 ease-out placeholder:text-transparent focus:border-indigo-400 focus:outline-none peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:text-sm peer-focus:text-slate-500"
				id={name}
				name={name}
				placeholder={label}
				type="text"
				{...restProps}
			/>
			<label
				className="absolute left-0 top-2 -translate-y-1/2 text-sm font-medium text-slate-700 transition-all peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#829697]"
				htmlFor={name}
			>
				{label}
			</label>
			{Icon && (
				<button
					type="button"
					onClick={onIconClick}
					className="absolute right-2 top-1/2 -translate-y-1/2"
					aria-label={iconLabel}
				>
					{Icon}
				</button>
			)}

			<p
				className={clsx([
					"text-sm",
					"text-red-700",
					errorMessage ? "visible" : "hidden",
				])}
			>
				{errorMessage}
			</p>
		</div>
	),
);

TextInput.displayName = "TextInput";
