import PuffLoader from "react-spinners/PuffLoader";

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center dark:bg-gray-800">
        <PuffLoader color="#FFBE00b7" />
       </div>
    );
};

export default Loading;