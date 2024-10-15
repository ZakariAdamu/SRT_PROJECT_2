"use client";
export const dynamic = "force-dynamic";

import useCart from "@/app/lib/hooks/useCart";
import Link from "next/link";
import  { useEffect } from "react";

const SuccessfulPayment = () => {
	// clear cart on successful payment
	const cart = useCart();

	useEffect(() => {
		cart.clearCart();
	}, []);
	return (
		<div className="h-screen flex flex-col justify-center items-center gap-5">
			<p className="text-heading4-bold text-green-500">Payment Successful!</p>
			<p>Thank you for your purchase🎉</p>
			<Link
				className="p-4 border-2 text-base-bold uppercase hover:bg-black hover:text-white"
				href="/"
			>
				Continue Shopping...
			</Link>
		</div>
	);
};

export default SuccessfulPayment;


