"use client";
export const dynamic = "force-dynamic";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeartFavoriteProps {
	product: ProductType;
	updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
	const { user } = useUser();
	const router = useRouter();
	const [isLiked, setIsLiked] = useState(false);

	// Fetch user's wishlist data
	const fetchUserWishlist = async () => {
		try {
			const res = await fetch("/api/users");
			if (!res.ok) throw new Error("Failed to fetch user data");

			const data = await res.json();
			setIsLiked(data.wishlist.includes(product._id));
		} catch (error) {
			console.error("[users_GET] Error fetching user data:", error);
		}
	};

	useEffect(() => {
		if (user) {
			fetchUserWishlist();
		}
	}, [user]);

	// Handle adding/removing item from wishlist
	const handleLike = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		if (!user) {
			router.push("/sign-in");
			return;
		}

		try {
			const res = await fetch("/api/users/wishlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ productId: product._id }),
			});

			if (!res.ok) throw new Error("Failed to update wishlist");

			const updatedUser = await res.json();
			setIsLiked(updatedUser.wishlist.includes(product._id));

			updateSignedInUser?.(updatedUser); // Use nullish coalescing for safety
		} catch (error) {
			console.error("[wishlist_POST] Error updating wishlist:", error);
		}
	};

	return (
		<button onClick={handleLike}>
			<Heart fill={isLiked ? "red" : "white"} />
		</button>
	);
};

export default HeartFavorite;
