"use client";
import React from "react";
import { FloatingNavMobile } from "@components/ui/floating-mobile";

import { IconBrandLine, IconBrandFacebook } from "@tabler/icons-react";

const navItems = [
	{
		name: "LINE",
		link: "https://line.me/ti/p/xxxxxxxx", // ใส่ลิงก์ LINE ของคุณ
		icon: <IconBrandLine className="h-6 w-6 text-green-500 dark:text-white" />,
	},
	{
		name: "Facebook",
		link: "https://www.facebook.com/yourpage", // ใส่ลิงก์เพจ Facebook ของคุณ
		icon: (
			<IconBrandFacebook className="h-6 w-6 text-blue-600 dark:text-white" />
		),
	},
];

export default navItems;

export const NavMobile = () => (
	<div className="relative w-full">
		<FloatingNavMobile navItems={navItems} />
	</div>
);
