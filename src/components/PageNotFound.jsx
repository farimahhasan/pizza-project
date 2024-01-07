import img404 from "../assets/images/404.svg"

const PageNotFound = () => {
    return (
        <div className="section-container h-screen dark:bg-gray-800 dark:text-white">
             <div className="py-16 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
             <div className="md:w-1/2">
                    <img src={img404} alt="ارور 404" className="w-full"/>
                </div>
                <div className="md:w-1/2 space-y-7 px-4 ">
                    <h2 className="text-2xl md:pt-0 pt-12 md:text-4xl font-bold md:leading-sung leading-sung ">
                        صفحه مورد نظر شما یافت نشد .
                    </h2>
                    <p className="text-xl text-[#4A4A4A] dark:text-[#bfbfbf]">
                        ارور 404
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default PageNotFound;