// // Get collections data from the Admin Dashboard (as Backend API)
export const getCollections = async () => {
	const collections = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/collections`
	);
	return await collections.json();
};

// // Get a single collection via collection Id
export const getCollectionDetails = async (collectionId: string) => {
	const collection = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`
	);
	return await collection.json();
};

// // get all products
export const getProducts = async () => {
	const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
	return await products.json();
};

// // get a single product via product Id
export const getProductDetails = async (productId: string) => {
	const product = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
	);
	return await product.json();
};

export const getOrders = async (customerId: string) => {
	const orders = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`
	);
	return await orders.json();
};

export const getRelatedProducts = async (productId: string) => {
	const relatedProducts = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
	);
	return await relatedProducts.json();
};
