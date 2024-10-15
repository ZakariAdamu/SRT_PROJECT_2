export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import Navbar from "../components/Navbar";
import ToasterProvider from "../lib/providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Ruqiza Store",
	description: "Ruqiza Ecommerce Store",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<ToasterProvider />
					<Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
