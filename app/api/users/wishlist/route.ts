import User from "@/app/lib/models/User";
import { connectToDB } from "@/app/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized, please sing in", { status: 401 });
		}

		await connectToDB();
		const user = await User.findOne({ clerkId: userId });

		if (!user) {
			return new NextResponse("User not found", { status: 404 });
		}

		const { productId } = await req.json();

		if (!productId) {
			return new NextResponse("Product Id required", { status: 400 });
		}

		const isLiked = user.wishlist.includes(productId);

		if (isLiked) {
			// Dislike a product
			user.wishlist = user.wishlist.filter((id: string) => id !== productId);
		} else {
			// Like a product
			user.wishlist.push(productId);
		}
		await user.save();
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		console.log("[wishlist_POST]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
};
