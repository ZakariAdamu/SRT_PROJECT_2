"use server";

import { getProducts } from "../lib/actions/actions";
import ProductCard from "./ProductCard";

const ProductList = async () => {
	const products = await getProducts();
	// console.log(products.length);

	return (
		<div className="flex flex-col items-center mx-auto gap-10 py-8 px-5">
			<p className="text-heading1-bold">Product</p>
			{products.length === 0 ? (
				<p className="text-body-bold">No products found</p>
			) : (
				<div
					// className = "flex flex-wrap mx-auto gap-16"
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mx-auto"
				>
					{products.map((product: ProductType) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

// export const dynamic = "force-dynamic";
export default ProductList;

// import { getProducts } from "../lib/actions/actions";
// import ProductCard from "./ProductCard";

// const ProductList = async () => {
// 	const products = await getProducts();
// 	// console.log(products.length);

// 	return (
// 		<div className="flex flex-col items-center mx-auto gap-10 py-8 px-5">
// 			<p className="text-heading1-bold">Product</p>
// 			{products.length === 0 ? (
// 				<p className="text-body-bold">No products found</p>
// 			) : (
// 				<div
// 					// className = "flex flex-wrap mx-auto gap-16"
// 					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 mx-auto"
// 				>
// 					{products.map((product: ProductType) => (
// 						<ProductCard key={product._id} product={product} />
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export const dynamic = "force-dynamic";
// export default ProductList;
