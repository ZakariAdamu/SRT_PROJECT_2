import { getProducts } from "../lib/actions/actions";
import ProductCard from "./ProductCard";

const ProductList = async () => {
	const products = await getProducts();
	console.log(products);

	return (
		<div className="flex flex-col items-center gap-10 py-8 px-5">
			<p className="text-heading1-bold">Product</p>
			{products.length === 0 ? (
				<p className="text-body-bold">No products found</p>
			) : (
				<div className="flex flex-wrap mx-auto gap-16">
					{products.map((product: ProductType) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	);
};

export default ProductList;
