"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useCart from "../lib/hooks/useCart";
import { useRouter } from "next/navigation";

const Navbar = () => {
	// get clerk authenticated user
	const { user } = useUser();
	const cart = useCart();
	const [dropDownMenu, setDropDownMenu] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	return (
		<div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-[#fff] max-sm:px-2 ">
			<Link href="/">
				<Image src="/logo-beta.png" alt="site logo" width={130} height={100} />
			</Link>
			<div className="flex gap-4 text-base-bold max-lg:hidden">
				<Link href="/" className="hover:text-red-600">
					Home
				</Link>
				<Link
					href={user ? "/wishlist" : "/sign-in"}
					className="hover:text-red-600"
				>
					Wishlist
				</Link>
				<Link
					href={user ? "/orders" : "/sign-in"}
					className="hover:text-red-600"
				>
					Orders
				</Link>
			</div>

			{/* Search input */}
			<div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
				<input
					className="outline-none max-sm:max-w-[120px]"
					placeholder="Search.."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button
					disabled={searchQuery === ""}
					onClick={() => router.push(`/search/${searchQuery}`)}
				>
					<Search className="cursor-pointer h-4 w-4 hover:text-red-600" />
				</button>
			</div>

			<div className="relative flex gap-3 items-center">
				<Link
					href="/cart"
					className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
				>
					<ShoppingCart />
					<p className="text-base-bold">Cart ({cart.cartItems.length})</p>
				</Link>

				<Menu
					className="cursor-pointer lg:hidden"
					onClick={() => setDropDownMenu(!dropDownMenu)}
				/>
				{dropDownMenu && (
					<div className="absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">
						<Link href="/" className="hover:text-red-600">
							Home
						</Link>
						<Link
							href={user ? "/wishlist" : "/sign-in"}
							className="hover:text-red-600"
						>
							Wishlist
						</Link>
						<Link
							href={user ? "/orders" : "/sign-in"}
							className="hover:text-red-600"
						>
							Orders
						</Link>
						<Link
							href="/cart"
							className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white"
						>
							<ShoppingCart />
							<p className="text-base-bold">Cart ({cart.cartItems.length})</p>
						</Link>
					</div>
				)}

				{user ? (
					<UserButton />
				) : (
					<Link href="/sign-in">
						<CircleUserRound />
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
