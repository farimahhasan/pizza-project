import { GiFullPizza } from "react-icons/gi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { TbShoppingCartCopy } from "react-icons/tb";
import { FiGift } from "react-icons/fi";

const serivicesList =[
    {id:1 , title:"پذیرایی" , des:"مهمانان خود را با طعم و ارائه ما خوشحال کنید." , icon:<GiFullPizza size={100} className="mx-auto" />},
    {id:2 , title:"تحویل سریع" , des:"ما سفارش شما را به سرعت درب منزل تحویل می دهیم." , icon:<MdOutlineDeliveryDining size={100} className="mx-auto" />},
    {id:3 , title:"سفارش آنلاین" , des:"منو را جستجو کنید و به صورت آنلاین به راحتی سفارش دهید." , icon:<TbShoppingCartCopy size={100} className="mx-auto"/>},
    {id:4 , title:"هدیه" , des:"برای سفارش های بالای 1 میلیون تومان ارسال رایگان داریم." , icon:<FiGift size={100} className="mx-auto" />}
]


const OurServices = () => {
    return (
        <div className="section-container py-20 dark:bg-gray-800 dark:text-white">
            <div className="flex flex-col md:flex-row items-center justify-between ">
                <div className="md:w-1/2 w-full">
                    <h2 className="text-2xl md:text-4xl font-bold md:leading-sung leading-sung ">
                        سفر و خدمات آشپزی ما
                    </h2>
                    <p className="my-5 text-secondary  dark:text-gray-500 text-xl leading-[30px]">
                        طعمی که به یاد خواهید آورد.
                        هر روز، یک تجربه مزه جدید.<br/>
                        طعم تازه گی،
                        تجربه ای که فراموش نخواهید کرد.
                    </p>
                </div>
                <div className="md:w-1/2 w-full md:mt-0 mt-10">
                     <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 sm:px-0 px-16 items-center">
                        {serivicesList.map((item)=>(
                           <div key={item.id} className="shadow-md rounded-sm py-5 px-4 
                           text-center space-y-2
                            cursor-pointer text-orange hover:scale-105 transition-all 
                            duration-200  dark:bg-gray-900 "> 
                              <div className="">
                                {item.icon}
                              </div>
                              <h5 className="pt-3 font-semibold ">
                                {item.title}
                              </h5>
                              <p className="text-secondary  dark:text-white">
                                {item.des}
                              </p>
                           </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

export default OurServices;