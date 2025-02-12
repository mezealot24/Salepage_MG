"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Nav } from "@/components/NavContainer";
import Image from "next/image";
import { NavMobile } from "@/components/NavMobileContainer";
import { HeroSlider } from "@/components/HeroSlider";
import SliderPromotion from "@/components/SliderPromotion";

// Animation variants for different sections
const fadeInUp = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const slideInLeft = {
	hidden: { opacity: 0, x: -30 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FadeInSection = ({ children, className = "", variant = "fadeInUp" }) => {
	const ref = useRef(null);

	const isInView = useInView(ref, {
		once: true,
		margin: "-100px",
		amount: 0.3,
	});
	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start("visible");
		} else {
			controls.start("hidden"); // เพิ่มเงื่อนไขเมื่อไม่อยู่ใน view
		}
	}, [isInView, controls]);

	const variants = {
		fadeInUp,
		scaleIn,
		slideInLeft,
	}[variant];

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={variants}
			className={className}
		>
			{children}
		</motion.div>
	);
};

export default function Page() {
	return (
		<div className="min-h-[400vh] lg:min-h-[450]">
			{/* Hero Section */}
			<HeroSlider />

			{/* Features Section */}
			<FadeInSection className="py-16 bg-gray-50 dark:bg-zinc-800/50">
				<div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
					<motion.div
						variants={slideInLeft}
						initial="hidden"
						whileInView="visible"
						viewport={{
							once: true,
							amount: 0.3,
							margin: "-100px",
						}}
						className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg"
					>
						<h3 className="text-xl font-semibold mb-4">จองรถ BYD ทุกรุ่น</h3>
						<p className="text-gray-600 dark:text-gray-300">
							เริ่มต้นเพียง 1,000 บาท พร้อมบริการเจ้าหน้าที่สินเชื่อ
							วิ่งเซ็นเอกสารถึงหน้าบ้านลูกค้า ทั่วไทย
						</p>
					</motion.div>
					<motion.div
						variants={slideInLeft}
						initial="hidden"
						whileInView="visible"
						viewport={{
							once: true,
							amount: 0.3, // ต้องเห็น element 30% ถึงจะ trigger
							margin: "-100px",
						}}
						transition={{ delay: 0.2 }}
						className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg"
					>
						<h3 className="text-xl font-semibold mb-4">สิทธิประโยชน์พิเศษ</h3>
						<p className="text-gray-600 dark:text-gray-300">
							ฟรี ประกันภัยชั้น 1 และ พรบ. ทุกรุ่น
						</p>
					</motion.div>
					<motion.div
						variants={slideInLeft}
						initial="hidden"
						whileInView="visible"
						viewport={{
							once: true,
							amount: 0.3, // ต้องเห็น element 30% ถึงจะ trigger
							margin: "-100px",
						}}
						transition={{ delay: 0.4 }}
						className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg"
					>
						<h3 className="text-xl font-semibold mb-4">บริการครบวงจร</h3>
						<p className="text-gray-600 dark:text-gray-300">
							ยินดีให้บริการ ซื้อรถใหม่ ขายรถเก่าทุกรุ่น ทุกแบรนด์
						</p>
					</motion.div>
				</div>
			</FadeInSection>

			{/* CTA Section */}
			<FadeInSection
				className="py-16 px-4 text-center bg-blue-50 dark:bg-zinc-800/30"
				variant="scaleIn"
			>
				<SliderPromotion />
			</FadeInSection>

			{/* Additional Image Sections */}
			<FadeInSection
				className="pt-20 pb-16 px-4 text-center"
				variant="fadeInUp"
			>
				<Image
					src="/MG2.jpeg"
					width={800}
					height={400}
					alt="MG Best Sale Performance"
					className="rounded-lg shadow-xl mx-auto mb-16"
				/>
			</FadeInSection>

			<FadeInSection className="pb-16 px-4 text-center" variant="scaleIn">
				<h2 className="text-3xl font-bold">All New MG3 Hybrid +</h2>
				<Image
					src="/MG3.jpeg"
					width={800}
					height={400}
					alt="MG3 Hybrid Price"
					className="rounded-lg shadow-xl mx-auto mb-16"
				/>
			</FadeInSection>

			<FadeInSection className="pb-16 px-4 text-center" variant="fadeInUp">
				<Image
					src="/MG4.jpeg"
					width={800}
					height={400}
					alt="MG3 Hybrid Colors"
					className="rounded-lg shadow-xl mx-auto mb-16"
				/>
			</FadeInSection>

			<div className="hidden lg:block">
				<Nav />
			</div>

			<div className="lg:hidden">
				<NavMobile />
			</div>
		</div>
	);
}
