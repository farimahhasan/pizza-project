import { FaStar } from "react-icons/fa";
import pizzaSharing from "../assets/images/pizza-sharing.svg"
import testimonials1 from "../assets/images/testimonial1.png"
import testimonials2 from "../assets/images/testimonial2.png"
import testimonials3 from "../assets/images/testimonial3.png"

const Testimonials = () => {
    return (
        <div className="section-container my-[100px]">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
                <div className="md:w-1/2 w-full md:mt-0 mt-10">
                    <img src={pizzaSharing} alt="مشتریان" className="w-full" />
                </div>
                <div className="md:w-1/2 w-full">
                    <h2 className="text-2xl md:text-4xl font-bold md:leading-sung leading-sung ">
                        مشتریان در مورد ما چه میگویند ؟
                    </h2>
                    <blockquote className="my-5 text-secondary leading-[30px]">
                        ”
                        من عاشق غذام و همه میدونن که با خوردن غذا چه قدر خوشحال میشم . حالا فک کن اون غذا پیتزاهای شما باشه ...
                        “
                    </blockquote>
                    <div className="flex items-center md:justify-start justify-center gap-4 flex-wrap" >
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src={testimonials1} alt="مشتری" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src={testimonials2} alt="مشتری" />
                                </div>
                            </div>
                            <div className="avatar">
                                <div className="w-12">
                                    <img src={testimonials3} alt="مشتری" />
                                </div>
                            </div>
                            <div className="avatar placeholder">
                                <div className="w-12 bg-neutral text-neutral-content">
                                    <span>+99</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h5 className="text-lg font-semibold">بازخورد مشتریان</h5>
                            <div className="flex items-center gap-2">
                                
                                <span className="font-medium">4.9</span>
                                <FaStar className="text-yellow-400" />
                                 <span className="text-[#807E7E]">(18.6k بازدید)</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Testimonials;