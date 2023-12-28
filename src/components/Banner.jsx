import pizza from "../assets/images/pizza-banner.svg"

const Banner = () => {
    return (
        <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
            <div className="py-24 flex flex-col-reverse md:flex-row justify-between items-center gap-8">
                <div className="md:w-1/2 space-y-7 px-4 md:text-right text-center">
                    <h2 className="text-2xl md:text-4xl font-bold md:leading-sung leading-sung ">
                    لذتی که توی خوردن <span className="text-orange">پیتزا</span> هست … 
                    </h2>
                    <p className="text-xl text-[#4A4A4A]">
                    اولین تکه پیتزا ذهن شما را منفجر می کند. دومی شما را به بعد دیگری منتقل می کند.
                    </p>
                    <button className="btn bg-orange px-8 py-3 font-semibold text-white rounded-full">
                        همین الان سفارش بده
                    </button>
                </div>
                <div className="md:w-1/2">
                    <img src={pizza} alt="پیتزا" className="w-full"/>
                </div>
            </div>
        </div>
    );
};

export default Banner;