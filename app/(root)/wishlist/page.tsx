// "use client";

// import Loader from "@/app/components/Loader";
// import ProductCard from "@/app/components/ProductCard";
// import { getProductDetails } from "@/app/lib/actions/actions";
// import { useUser } from "@clerk/nextjs";
// import { useEffect, useState } from "react";

// const Wishlist = () => {
// 	const { user } = useUser();

// 	const [loading, setLoading] = useState(true);
// 	const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
// 	const [wishlist, setWishlist] = useState<ProductType[]>([]);

// 	const getUser = async () => {
// 		try {
// 			const res = await fetch("/api/users");
// 			const data = await res.json();
// 			setSignedInUser(data);
// 			setLoading(false);
// 		} catch (error) {
// 			console.error("[users_GET]", error);
// 		}
// 	};

// 	useEffect(() => {
// 		if (user) {
// 			getUser();
// 		}
// 	}, [user]);

// 	const getWishlistProducts = async () => {
// 		setLoading(true);

// 		if (!signedInUser) return;

// 		const wishlistProducts = await Promise.all(
// 			signedInUser.wishlist.map(async (productId) => {
// 				const res = await getProductDetails(productId);
// 				return res;
// 			})
// 		);
// 		setWishlist(wishlistProducts);
// 		setLoading(false);
// 	};

// 	useEffect(() => {
// 		getWishlistProducts();
// 	}, [signedInUser]);

// 	const updateSignedInUser = (updatedUser: UserType) => {
// 		setSignedInUser(updatedUser);
// 		// setWishlist(updatedUser.wishlist);
// 	};

// 	return loading ? (
// 		<Loader loading={loading} />
// 	) : (
// 		<div className="px-10 py-5">
// 			<p className="text-heading3-bold my-10">Your Wishlist</p>
// 			{wishlist.length === 0 && <p>No items in your wishlist</p>}

// 			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mx-auto">
// 				{wishlist.map((product) => (
// 					<ProductCard
// 						key={product._id}
// 						product={product}
// 						updateSignedInUser={updateSignedInUser}
// 					/>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export const dynamic = "force-dynamic";

// export default Wishlist;

"use client";

import Loader from "@/app/components/Loader";
import ProductCard from "@/app/components/ProductCard";
import { getProductDetails } from "@/app/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
	const { user } = useUser();
	const [loading, setLoading] = useState(true);
	const [wishlist, setWishlist] = useState<ProductType[]>([]);
	const [error, setError] = useState<string | null>(null);

	// Fetch user and wishlist products simultaneously
	const fetchUserAndWishlist = async () => {
		try {
			if (!user) return; // No need to fetch if the user isn't logged in

			const res = await fetch("/api/users");
			if (!res.ok) throw new Error("Failed to fetch user data");

			const signedInUser = await res.json();
			const wishlistProducts = await Promise.all(
				signedInUser.wishlist.map(async (productId: string) => {
					const product = await getProductDetails(productId);
					return product;
				})
			);

			setWishlist(wishlistProducts);
		} catch (error) {
			console.error("[fetchUserAndWishlist] Error:", error);
			setError("Failed to load wishlist data. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUserAndWishlist();
	}, [user]);

	const updateSignedInUser = (updatedUser: UserType) => {
		setWishlist(
			(prevWishlist) =>
				updatedUser.wishlist
					.map((productId) =>
						prevWishlist.find((product) => product._id === productId)
					)
					.filter(Boolean) as ProductType[] // Filter out any undefined results
		);
	};

	if (loading) return <Loader loading={loading} />;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<div className="px-10 py-5">
			<p className="text-heading3-bold my-10">Your Wishlist</p>
			{wishlist.length === 0 && <p className="text-body-semibold">No items in your wishlist</p>}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mx-auto">
				{wishlist.map((product) => (
					<ProductCard
						key={product._id}
						product={product}
						updateSignedInUser={updateSignedInUser}
					/>
				))}
			</div>
		</div>
	);
};

export const dynamic = "force-dynamic";

export default Wishlist;
