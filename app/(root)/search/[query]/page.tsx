
import ProductCard from "@/app/components/ProductCard";

const SearchPage = async ({ params }: { params: { query: string } }) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/search/${params.query}`
	);
	const searchedProducts = await res.json();

	return (
		<div className="px-10 py-5">
			<p className="text-heading3-bold my-10">
				Search results for {params.query}
			</p>
			{!searchedProducts ||
				(searchedProducts.length === 0 && (
					<p className="text-body-bold my-5">No result found</p>
				))}

			<div className="flex flex-wrap justify-center gap-16">
				{searchedProducts?.map((product: any) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};
export const dynamic = "force-dynamic";


export default SearchPage;
