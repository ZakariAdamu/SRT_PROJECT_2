export const dynamic = "force-dynamic";

import Image from "next/image";
import Collections from "../components/Collections";
import ProductList from "../components/ProductList";

export default function Home() {
	// this route group (root) folder having this page.tsx file is the home/landing page of our app
	return (
		<>
			<Image
				src="/banner.png"
				alt="banner"
				width={2000}
				height={1000}
				className="w-screen"
			/>
			<Collections />
			<ProductList />
		</>
	);
}
