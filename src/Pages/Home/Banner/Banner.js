import React from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
const Banner = () => {


    return (
        <div className=' dark:text-gray-100 my-12 dark:bg-gray-600 rounded-3xl mx-12 py-5'>
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                }}
                modules={[Autoplay]}
                spaceBetween={30}
                className="mySwiper">
                <SwiperSlide>
                    <div className="flex justify-around items-center">
                        <div>
                            <h1 className="text-6xl">Sell A Car</h1>
                        </div>
                        <div className="h-[50vh]">
                            <img className="h-full rounded-3xl" src="https://i.ibb.co/YkzmmBZ/car.jpg" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex justify-around items-center">
                        <div>
                            <h1 className="text-6xl">Buy Your Dream</h1>
                        </div>
                        <div className="h-[50vh]">
                            <img className="h-full rounded-3xl" src="https://i.ibb.co/bWGf8yH/dream.jpg" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex justify-around items-center">
                        <div>
                            <h1 className="text-6xl">Everything You Need</h1>
                        </div>
                        <div className="h-[50vh]">
                            <img className="h-full rounded-3xl" src="https://i.ibb.co/rcvkZKr/shoping.jpg" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;