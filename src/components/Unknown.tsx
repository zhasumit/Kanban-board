import { useParams } from "react-router-dom";

function Unknown() {
	const { unknown } = useParams();
	return (
		<div className="text-center py-[14vh] text-2xl ">
			<img
				src="./images/404.gif"
				className=" mx-auto my-auto flex justify-center items-center  mb-0  rounded-[100px]"
			/>
			<div className="py-[2vh]">
				Nothing like{" "}
				<span className="text-red-500 font-semibold">{unknown}</span>{" "}
				😕...
			</div>
		</div>
	);
}

export default Unknown;
