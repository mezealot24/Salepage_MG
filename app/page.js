"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Nav } from "@/components/NavContainer";
import Image from "next/image";
import { NavMobile } from "@/components/NavMobileContainer";

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
	// ปรับค่า margin เป็น "-100px" เพื่อให้ trigger ใกล้กว่าเดิม
	const isInView = useInView(ref, {
		once: true,
		margin: "-100px",
		amount: 0.3, // เพิ่ม amount เพื่อกำหนดว่าต้องเห็น element กี่เปอร์เซ็นต์ถึงจะ trigger
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
		<div className="min-h-[450vh]">
			{/* Hero Section */}
			<FadeInSection className="pt-20 pb-16 px-4 text-center" variant="scaleIn">
				<h1 className="text-4xl font-bold mb-8">
					โปรโมชั่น MG ทุกรุ่น มาพร้อมข้อเสนอสุดพิเศษ
				</h1>
				<Image
					src="/MG1.jpeg"
					width={800}
					height={600}
					alt="MG Promotion"
					className="rounded-lg shadow-xl mx-auto"
				/>
			</FadeInSection>

			{/* Features Section */}
			<FadeInSection className="py-16 bg-gray-50 dark:bg-zinc-800/50">
				<div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
					<motion.div
						variants={slideInLeft}
						initial="hidden"
						whileInView="visible"
						viewport={{
							once: true,
							amount: 0.3, // ต้องเห็น element 30% ถึงจะ trigger
							margin: "-100px",
						}}
						className="p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-lg"
					>
						<h3 className="text-xl font-semibold mb-4">จองรถ MG ทุกรุ่น</h3>
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
				<h2 className="text-3xl font-bold mb-6">สู้ทุกคัน ดันทุกเคส</h2>
				<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
					ติดต่อฝ่ายขายเพื่อรับข้อเสนอพิเศษ
				</p>
				<motion.a
					href="tel:092-259-2626"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors inline-block"
				>
					โทร. 092-259-2626
				</motion.a>
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

			<div className="hidden">
				<Nav />
			</div>
			<div className="lg:hidden">
				<NavMobile />
			</div>
		</div>
	);
}
