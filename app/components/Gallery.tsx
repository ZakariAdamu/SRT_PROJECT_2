"use client";
import Image from "next/image";
import React, { useState } from "react";

const Gallery = ({ productMedia }: { productMedia: string[] }) => {
	const [mainImage, setMainImage] = useState(productMedia[0]);

	return (
		<div className="flex flex-col gap-3 max-w-[500px]">
			<Image
				className="w-96 h-96 rounded-lg shadow-xl object-cover"
				src={mainImage}
				width={500}
				height={500}
				alt="product"
			/>
			<div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
				{productMedia.map((image, index) => (
					<Image
						key={index}
						src={image}
						width={100}
						height={100}
						className={`w-20 h20 rounded-lg object-cover cursor-pointer ${
							mainImage === image ? "border-2 border-black" : ""
						}`}
						alt="product"
						onClick={() => setMainImage(image)}
					/>
				))}
			</div>
		</div>
	);
};

export default Gallery;
