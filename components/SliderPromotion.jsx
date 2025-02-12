"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/ui/WorkSliderBtns";

const carModelsData = [
	{
		model: "BYD Seal",
		price: "62,495",
		description: "พิเศษเฉพาะช่วงเทศกาล รับส่วนลดพิเศษ 5%",
		features: [
			{ name: "ดอกเบี้ย 5%" },
			{ name: "ฟรีประกัน" },
			{ name: "ผ่อนนาน 84 เดือน" },
		],
		image: "/BYD/Valentine2025/BYD2.jpg",
		contact: "02-448-9999",
	},
	{
		model: "BYD Atto 3",
		price: "49,995",
		description: "พิเศษสุดในช่วงเทศกาล พร้อมของแถมมากมาย",
		features: [
			{ name: "ดอกเบี้ย 5%" },
			{ name: "ฟรีประกัน" },
			{ name: "ผ่อนนาน 84 เดือน" },
		],
		image: "/BYD/Valentine2025/BYD3.jpg",
		contact: "02-291-8889",
	},
	{
		model: "BYD Dolphin",
		price: "48,495",
		description: "โปรโมชั่นพิเศษสำหรับรถยนต์ไฟฟ้า BYD",
		features: [
			{ name: "ดอกเบี้ย 5%" },
			{ name: "ฟรีประกัน" },
			{ name: "ผ่อนนาน 84 เดือน" },
		],
		image: "/BYD/Valentine2025/BYD4.jpg",
		contact: "080-416-1888",
	},
];

const SliderPromotion = () => {
	const [selectedCar, setSelectedCar] = useState(carModelsData[0]);

	const handleSlideChange = (swiper) => {
		setSelectedCar(carModelsData[swiper.activeIndex]);
	};

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
			}}
			className="min-h-[80vh] flex flex-col justify-center py-6 bg-gradient-to-b from-pink-100/20 to-purple-100/20"
		>
			<div className="container mx-auto">
				<div className="flex flex-col xl:flex-row xl:gap-[30px]">
					<div className="w-full xl:w-[50%] flex flex-col justify-between order-2 xl:order-none">
						<div className="flex flex-col gap-[20px] h-full justify-between">
							<div className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">
								{selectedCar.model}
							</div>
							<h2 className="text-3xl font-bold">
								฿{selectedCar.price} /เดือน
							</h2>
							<p className="text-lg">{selectedCar.description}</p>
							<ul className="flex flex-wrap gap-2">
								{selectedCar.features.map((item, index) => (
									<li
										key={index}
										className="text-base bg-pink-100/30 px-4 py-2 rounded-full"
									>
										{item.name}
									</li>
								))}
							</ul>
							<div className="border border-pink-200/20"></div>
							<div className="flex items-center gap-4">
								<button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition">
									จองรถวันนี้
								</button>
								<p className="text-lg">โทร: {selectedCar.contact}</p>
							</div>
						</div>
					</div>
					<div className="w-full xl:w-[50%]">
						<Swiper
							spaceBetween={30}
							slidesPerView={1}
							className="h-[300px] sm:h-[620px] xl:h-[720px] mb-12" // เพิ่ม xl breakpoint
							onSlideChange={handleSlideChange}
						>
							{carModelsData.map((car, index) => (
								<SwiperSlide key={index}>
									<div className="h-full relative group">
										{/* แยก div ของ gradient ออกจาก Image */}
										<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
										<Image
											src={car.image}
											fill
											className="object-contain rounded-lg"
											alt={car.model}
										/>
									</div>
								</SwiperSlide>
							))}
							<WorkSliderBtns
								containerStyles="flex gap-2 absolute right-0 top-1/2 -translate-y-1/2 z-20 w-full justify-between xl:w-max"
								btnStyles="bg-white/80 hover:bg-white text-pink-500 text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-full"
							/>
						</Swiper>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default SliderPromotion;
