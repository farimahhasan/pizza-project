
const LoadingBtn = () => {

    return (
        <div >
               <button disabled className="btn bg-orange text-white ">
                    <span className="loading loading-spinner dark:text-white"></span>
                </button>
        </div>
    );
};

export default LoadingBtn;