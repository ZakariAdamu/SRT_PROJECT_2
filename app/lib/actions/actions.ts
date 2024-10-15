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

// export const dynamic = "force-dynamic";


// Better: implementing the DRY principle: Don't Repeat Yourself
// Helper function to make API calls and handle errors
// const fetchData = async (endpoint: string) => {
// 	try {
// 		const response = await fetch(
// 			`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
// 		);

// 		if (!response.ok) {
// 			throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
// 		}

// 		return await response.json();
// 	} catch (error) {
// 		console.error(`Error fetching ${endpoint}:`, error);
// 		throw error; // Re-throw the error for further handling if needed
// 	}
// };

// // 1st api endpoint: Get collections
// export const getCollections = async () => {
// 	return await fetchData("/collections");
// };

// // 2nd api endpoint: Get all products
// export const getProducts = async () => {
// 	return await fetchData("/products");
// };

// // 3rd endpoint: Get a single product via product Id
// export const getProductDetails = async (productId: string) => {
// 	return await fetchData(`/products/${productId}`);
// };
