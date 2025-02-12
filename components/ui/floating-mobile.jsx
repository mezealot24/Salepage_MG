"use client";
import React, { useState, useEffect } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
	stagger,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNavMobile = ({ navItems, className }) => {
	const { scrollYProgress } = useScroll();
	const [visible, setVisible] = useState(true);
	const [isTop, setIsTop] = useState(true);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (current) => {
		if (typeof current === "number") {
			let direction = current - scrollYProgress.getPrevious();
			setIsTop(scrollYProgress.get() < 0.05);

			// Show nav immediately when scrolling up, hide when scrolling down past 20%
			if (direction < 0) {
				setVisible(true);
			} else if (scrollYProgress.get() > 0.2) {
				setVisible(false);
			}
		}
	});

	const navVariants = {
		hidden: {
			transform: "translateY(-100%)",
			opacity: 0,
		},
		visible: {
			transform: "translateY(0%)",
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut",
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: -10,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	const buttonVariants = {
		hidden: {
			opacity: 0,
			scale: 0.5,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				delay: 0.3,
				ease: "easeOut",
			},
		},
	};

	if (!mounted) return null;

	return (
		<div className="fixed top-0 left-0 right-0 z-[5000]">
			<motion.div
				variants={navVariants}
				initial="hidden"
				animate={visible ? "visible" : "hidden"}
				style={{
					width: isTop ? "100%" : "80%",
					maxWidth: "100%",
					borderRadius: isTop ? "0px" : "50px",
				}}
				className={cn(
					"mx-auto shadow-lg pr-4 pl-10 py-3 flex items-center justify-center space-x-6 transition-all duration-300",
					isTop
						? "bg-white/95 backdrop-blur-sm py-5 border-b border-gray-200"
						: "bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900",
					isTop ? "text-gray-800" : "text-white",
					className
				)}
			>
				{navItems.map((navItem, idx) => (
					<motion.div key={`nav-${idx}`} variants={itemVariants}>
						<Link
							href={navItem.link}
							className="relative flex items-center space-x-2 text-lg font-semibold uppercase tracking-wide transition-all duration-300 hover:scale-110"
						>
							<span className="text-2xl">{navItem.icon}</span>
							<span className="hidden sm:block">{navItem.name}</span>
						</Link>
					</motion.div>
				))}

				<motion.button
					variants={buttonVariants}
					className="relative text-lg font-bold px-6 py-3 border-zinc-100 rounded-full bg-white text-blue-900 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-2xl hover:bg-blue-50"
				>
					<span>ติดต่อฝ่ายขาย</span>
					<span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-300 to-transparent h-px" />
				</motion.button>
			</motion.div>
		</div>
	);
};

export default FloatingNavMobile;
