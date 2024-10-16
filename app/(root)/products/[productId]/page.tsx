import Gallery from "@/app/components/Gallery";
import ProductCard from "@/app/components/ProductCard";
import ProductInfo from "@/app/components/ProductInfo";
import {
	getProductDetails,
	getRelatedProducts,
} from "@/app/lib/actions/actions";

const ProductDetails = async ({
	params,
}: {
	params: { productId: string };
}) => {
	// Fetch product details and related products concurrently
	const [productDetails, relatedProducts] = await Promise.all([
		getProductDetails(params.productId),
		getRelatedProducts(params.productId),
	]);

	return (
		<>
			{/* Product Gallery and Info */}
			<div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
				{productDetails ? (
					<>
						<Gallery productMedia={productDetails.media} />
						<ProductInfo productInfo={productDetails} />
					</>
				) : (
					<p>Product details not available.</p>
				)}
			</div>

			{/* Related Products Section */}
			<div className="flex flex-col items-center px-10 py-5 max-md:px-3">
				<p className="text-heading3-bold">Related Products</p>
				<div className="flex flex-wrap gap-16 mx-auto mt-5">
					{relatedProducts && relatedProducts.length > 0 ? (
						relatedProducts.map((product: ProductType) => (
							<ProductCard key={product._id} product={product} />
						))
					) : (
						<p>No related products found</p>
					)}
				</div>
			</div>
		</>
	);
};

export default ProductDetails;
