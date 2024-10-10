import Gallery from "@/app/components/Gallery";
import ProductInfo from "@/app/components/ProductInfo";
import { getProductDetails } from "@/app/lib/actions";

const ProductDetails = async ({
	params,
}: {
	params: { productId: string };
}) => {
	const productDetails = await getProductDetails(params.productId);
	return (
        <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
			<Gallery productMedia={productDetails.media} />
			<ProductInfo productInfo={productDetails} />
        </div>
	);
};

export default ProductDetails;
