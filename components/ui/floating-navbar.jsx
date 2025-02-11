"use client";
import React, { useState, useEffect } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({ navItems, className }) => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const [isTop, setIsTop] = useState(true);
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowButton(true);
		}, 500); // 0.5 seconds delay

		return () => clearTimeout(timer);
	}, []); // Run once after initial render

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (typeof current === "number") {
			let direction = current - scrollYProgress.getPrevious();
			setIsTop(scrollYProgress.get() < 0.05);

			if (scrollYProgress.get() > 0.02 || direction < 0) {
				setVisible(true);
				// Only show button after initial scroll
				setShowButton(true);
			} else {
				setVisible(false);
			}
		}
	});

	return (
		<div className="fixed top-0 left-0 right-0 z-[5000]">
			<motion.div
				initial={{ transform: "translateY(-100%)" }}
				animate={{
					transform: visible ? "translateY(0%)" : "translateY(-100%)",
					width: isTop ? "100%" : "40%",
					maxWidth: "100%",
					borderRadius: isTop ? "0px" : "50px",
				}}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className={cn(
					"mx-auto shadow-lg pr-4 pl-10 py-3 flex items-center justify-center space-x-6 transition-all duration-300",
					isTop
						? "bg-red-500/90 py-5"
						: "bg-gradient-to-r from-[#f07be6] via-[#f59d8d] to-[#ff4873]",
					"text-white",
					className
				)}
			>
				{navItems.map((navItem, idx) => (
					<Link
						key={`link-${idx}`}
						href={navItem.link}
						className="relative flex items-center space-x-2 text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-110"
					>
						<span className="text-2xl">{navItem.icon}</span>
						<span className="hidden sm:block">{navItem.name}</span>
					</Link>
				))}

				<AnimatePresence>
					{showButton && (
						<motion.button
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
							className="relative text-lg font-bold px-6 py-3 rounded-full bg-white text-[#ff416c] transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-2xl"
						>
							<span>ติดต่อฝ่ายขาย</span>
							<span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-[#ff4b2b] to-transparent h-px" />
						</motion.button>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	);
};
