import { useEffect, useState } from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import Card from "./Card";


const PopularPizzas = () => {

    const [popularPizza, setPopularPizza] = useState([])

    useEffect(() => {
        const fetchPopularPizza = async () => {
            const response = await axios.get('/menu.json');
            const popular = response.data.filter((item) => item.category === "popular")
            setPopularPizza(popular)
        }
        fetchPopularPizza()
    }, [])


    return (
        <div className="section-container my-20">
            <div className="px-4">
                <h2 className="text-2xl md:text-4xl font-bold md:leading-sung leading-sung">پیتزاهای پرطرفدار</h2>
            </div>

            <div className="mt-24">
                <Swiper
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 100},
                        768: { slidesPerView: 2, spaceBetween: 30},
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper text-center"
                >
                    {
                        popularPizza.map((item) => (
                            <SwiperSlide key={item.id} className="w-1/2">
                                <Card data={item} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default PopularPizzas;