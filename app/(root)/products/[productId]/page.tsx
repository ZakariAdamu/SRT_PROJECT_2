export const dynamic = "force-dynamic";

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
	const productDetails = await getProductDetails(params.productId);
	const relatedProducts = await getRelatedProducts(params.productId);
	return (
		<>
			<div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
				<Gallery productMedia={productDetails.media} />
				<ProductInfo productInfo={productDetails} />
			</div>

			<div className="flex flex-col items-center px-10 py-5 max-md:px-3">
				<p className="text-heading3-bold">Related Products</p>
				<div className="flex flex-wrap gap-16 mx-auto mt-5">
					{relatedProducts.map((product: ProductType) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
			</div>
		</>
	);
};

export default ProductDetails;
