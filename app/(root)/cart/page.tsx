"use client";
import useCart from "@/app/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Cart = () => {
	const cart = useCart();

	const { user } = useUser();
	const router = useRouter();

	const total = cart.cartItems.reduce(
		(acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
		0
	);
	const totalRounded = parseFloat(total.toFixed(2));

	// console.log(user);

	const customer = {
		clerkId: user?.id,
		email: user?.emailAddresses[0].emailAddress,
		name: user?.fullName,
	};

	const handleCheckout = async () => {
		try {
			if (!user) {
				router.push("/sign-in");
				return;
			}

			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
				method: "POST",
				body: JSON.stringify({ cartItems: cart.cartItems, customer }),
			});
			const data = await res.json();
			// navigate to payment success or failure page
			window.location.href = data.url;
			console.log(data);

			const session = await res.json();
			router.push(session.url);
		} catch (error) {
			console.log("[checkout_POST]", error);
		}
	};

	return (
		// from small to max-lg screens(1024px) = col: max-lg:flex-col
		<div className="flex gap-20 py-16 px-10 max-lg:flex-col">
			<div className="w-2/3 max-lg:w-full">
				<p className="text-heading3-bold">Shopping Cart</p>
				<hr className="my-6" />

				{cart.cartItems.length === 0 ? (
					<p className="text-body-bold">Your cart is empty </p>
				) : (
					<div>
						{cart.cartItems.map((cartItem, index) => (
							<div
								key={index}
								className="w-full flex max-sm:flex-col max-sm:gap-3 max-sm:items-start hover:bg-grey-1 px-6 py-5 items-center justify-between"
							>
								<div className="flex items-center">
									<Image
										src={cartItem.item.media[0]}
										width={100}
										height={100}
										alt="product image"
										className="rounded-lg w-32 h-32 object-cover"
									/>
									<div className="flex flex-col gap-3 ml-4">
										<p className="text-body-bold">{cartItem.item.title}</p>
										{cartItem.color && (
											<p className="text-small-medium">
												Color: {cartItem.color}
											</p>
										)}
										{cartItem.size && (
											<p className="text-small-medium">Size: {cartItem.size}</p>
										)}
										<p className="text-small-medium">${cartItem.item.price}</p>
									</div>
								</div>
								<div className="flex gap-4 items-center">
									<MinusCircle
										className="hover:text-red-1 cursor-pointer"
										onClick={() => cart.decreaseQuantity(cartItem.item._id)}
									/>
									<p className="text-body-bold">{cartItem.quantity}</p>
									<PlusCircle
										className="hover:text-red-1 cursor-pointer"
										onClick={() => cart.increaseQuantity(cartItem.item._id)}
									/>
								</div>
								<Trash
									className="hover:text-red-1 cursor-pointer "
									onClick={() => cart.removeItem(cartItem.item._id)}
								/>
							</div>
						))}
					</div>
				)}
			</div>

			<div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
				<p className="text-heading4-bold pb-4">
					Summary{" "}
					<span>{`(${cart.cartItems.length} ${
						cart.cartItems.length > 1 ? "items" : "item"
					})`}</span>
				</p>
				<div className="flex justify-between text-body-semibold">
					<span className="text-body-medium">Total Amount</span>
					<span className="text-body-medium">${totalRounded}</span>
				</div>
				<button
					onClick={handleCheckout}
					className="border text-body-bold py-3 w-full rounded-lg hover:bg-black hover:text-white"
				>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
};

export default Cart;
