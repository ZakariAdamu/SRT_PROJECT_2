// const Loader = () => {
// 	return (
// 		<div className="flex items-center justify-center h-screen">
// 			<div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
// 		</div>
// 	);
// };

// export default Loader;

// export const dynamic = "force-dynamic";

// import { React } from "react";
// import ClipLoader from "react-lLoaders/ClipLoader";

import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "100px auto",
};

interface LoaderProps {
	loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => {
	return (
		<PropagateLoader
			color="#60608b"
			loading={loading}
			cssOverride={override}
			size={20}
		/>
	);
};

export default Loader;
