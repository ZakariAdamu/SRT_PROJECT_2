// "use client";
// export const dynamic = "force-dynamic";

// import { useUser } from "@clerk/nextjs";
// import { Heart } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Loader from "./Loader";

// interface HeartFavoriteProps {
// 	product: ProductType;
// 	updateSignedInUser?: (updatedUser: UserType) => void;
// }

// const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
// 	const { user } = useUser();
// 	const router = useRouter();

// 	const [loading, setLoading] = useState(false);
// 	const [isLiked, setIsLiked] = useState(false);

// 	const getUser = async () => {
// 		try {
// 			setLoading(true);
// 			const res = await fetch("/api/users");
// 			const data = await res.json();
// 			setIsLiked(data.wishlist.includes(product._id));
// 			setLoading(false);
// 		} catch (error) {
// 			console.log("[users_GET]", error);
// 		}
// 	};

// 	useEffect(() => {
// 		if (user) {
// 			getUser();
// 		}
// 	}, [user]);

// 	const handleLike = async (
// 		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
// 	) => {
// 		e.preventDefault();
// 		try {
// 			if (!user) {
// 				router.push("/sign-in");
// 				return;
// 			} else {
// 				setLoading(true);
// 				const res = await fetch("/api/users/wishlist", {
// 					method: "POST",
// 					body: JSON.stringify({ productId: product._id }),
// 				});

// 				const updatedUser = await res.json();
// 				setIsLiked(updatedUser.wishlist.includes(product._id));

// 				updateSignedInUser ? updateSignedInUser(updatedUser) : null;
// 			}
// 		} catch (error) {
// 			console.log("[wishlist_POST]", error);
// 		}
// 	};
// 	return loading ? (
// 		<Loader />
// 	) : (
// 		<button onClick={handleLike}>
// 			<Heart fill={`${isLiked ? "red" : "white"}`} />
// 		</button>
// 	);
// };

// export default HeartFavorite;

"use client";
export const dynamic = "force-dynamic";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";

interface HeartFavoriteProps {
	product: ProductType;
	updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
	const { user } = useUser();
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [isLiked, setIsLiked] = useState(false);

	// Fetch user's wishlist data
	const getUser = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users");
			if (!res.ok) throw new Error("Failed to fetch user data");
			const data = await res.json();
			setIsLiked(data.wishlist.includes(product._id));
		} catch (error) {
			console.error("[users_GET] Error fetching user data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			getUser();
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

		setLoading(true);
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

			if (updateSignedInUser) {
				updateSignedInUser(updatedUser);
			}
		} catch (error) {
			console.error("[wishlist_POST] Error updating wishlist:", error);
		} finally {
			setLoading(false);
		}
	};

	return loading ? (
		<Loader />
	) : (
		<button onClick={handleLike}>
			<Heart fill={isLiked ? "red" : "white"} />
		</button>
	);
};

export default HeartFavorite;
