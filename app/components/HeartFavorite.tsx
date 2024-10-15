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

	const getUser = async () => {
		try {
			setLoading(true);
			const res = await fetch("/api/users");
			const data = await res.json();
			setIsLiked(data.wishlist.includes(product._id));
			setLoading(false);
		} catch (error) {
			console.log("[users_GET]", error);
		}
	};

	useEffect(() => {
		if (user) {
			getUser();
		}
	}, [user]);

	const handleLike = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			if (!user) {
				router.push("/sign-in");
				return;
			} else {
				setLoading(true);
				const res = await fetch("/api/users/wishlist", {
					method: "POST",
					body: JSON.stringify({ productId: product._id }),
				});

				const updatedUser = await res.json();
				setIsLiked(updatedUser.wishlist.includes(product._id));

				updateSignedInUser ? updateSignedInUser(updatedUser) : null;
			}
		} catch (error) {
			console.log("[wishlist_POST]", error);
		}
	};
	return loading ? (
		<Loader />
	) : (
		<button onClick={handleLike}>
			<Heart fill={`${isLiked ? "red" : "white"}`} />
		</button>
	);
};

export default HeartFavorite;
