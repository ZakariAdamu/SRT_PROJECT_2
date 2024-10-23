
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
