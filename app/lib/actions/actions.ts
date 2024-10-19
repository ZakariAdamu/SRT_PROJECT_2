// later change all API calls / actions to use try catch block
export const getCollections = async () => {
	const collections = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/collections`
	);
	return await collections.json();
};

// // Get a single collection via collection Id
export const getCollectionDetails = async (collectionId: string) => {
	try {
		// Use fetch with options to control timeouts and caching
		const collection = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				cache: "force-cache", // You can also use 'no-store' or 'stale-while-revalidate'
			}
		);

		// Check if the collection response is OK (status 200)
		if (!collection.ok) {
			throw new Error(`Error: ${collection.status}`);
		}

		// Parse JSON response safely
		const collectionDetails = await collection.json();

		// Optional: Return only the necessary data (for performance)
		return collectionDetails;
	} catch (error) {
		// Log the error for debugging and handle the failure case
		console.error("Failed to fetch products:", error);
		return null;
	}
};

// // get all products
// export const getProducts = async () => {
// 	const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
// 	return await products.json();
// };

export const getProducts = async () => {
	try {
		// Use fetch with options to control timeouts and caching
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/products`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				cache: "force-cache", // You can also use 'no-store' or 'stale-while-revalidate'
			}
		);

		// Check if the response is OK (status 200)
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		// Parse JSON response safely
		const products = await response.json();

		// Optional: Return only the necessary data (for performance)
		return products;
	} catch (error) {
		// Log the error for debugging and handle the failure case
		console.error("Failed to fetch products:", error);
		return null;
	}
};

//  get a single product via product Id
export const getProductDetails = async (productId: string) => {
	const product = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
	);
	return await product.json();
};

export const getOrders = async (customerId: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				cache: "force-cache", // You can also use 'no-store' or 'stale-while-revalidate'
			}
		);
		// Check if the response is OK (status 200)
		if (!res.ok) {
			throw new Error(`Error: ${res.status}`);
		}
		const orders = await res.json();
		return await orders;
	} catch (error) {
		console.error(error);
	}
};

export const getRelatedProducts = async (productId: string) => {
	const relatedProducts = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
	);
	return await relatedProducts.json();
};
