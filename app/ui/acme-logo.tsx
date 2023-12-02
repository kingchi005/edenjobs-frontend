import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function EdenJobsLogo() {
	return (
		<div
			className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
		>
			<GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
			{/* <p className="text-[44px]">Eden Jons</p> */}
			<Image
				src="/logo.jpg"
				width={60}
				height={60}
				className="rounded"
				alt="edenjobs logo"
			/>{" "}
		</div>
	);
}
