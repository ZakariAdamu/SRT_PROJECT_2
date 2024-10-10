"use client";
import useCart from "@/app/lib/hooks/useCart";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";

const Cart = () => {
	const cart = useCart();

	return (
		<div className="flex gap-20 py-16 px-10">
			<div className="w-2/3">
				<p className="text-heading3-bold">Shopping Cart</p>
				<hr className="my-6" />

				{cart.cartItems.length === 0 ? (
					<p className="text-body-bold">Your cart is empty </p>
				) : (
					<div>
						{cart.cartItems.map((cartItem, index) => (
							<div
								key={index}
								className="w-full flex hover:bg-grey-1 px-6 py-5 items-center justify-between"
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
									</div>
								</div>
								<div className="flex gap-4 items-center ml-20">
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
									className="hover:text-red-1 cursor-pointer right-0"
									onClick={() => cart.removeItem(cartItem.item._id)}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
