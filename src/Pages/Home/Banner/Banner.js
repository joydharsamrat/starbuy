import React from "react";
import { EffectFade } from 'swiper';
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import 'swiper/css/effect-fade';
import './Banner.css'
const Banner = () => {
    SwiperCore.use(Autoplay)
    return (
        <div className=' bg-white text-white mb-12'>
            <Swiper
                slidesPerView={1}
                modules={[EffectFade]} effect="fade"
                loop={true}
                autoplay={{
                    delay: 3000
                }}>
                <SwiperSlide>
                    <div className="flex justify-around items-center h-screen slide1">
                        <div data-aos="fade-down">
                            <h1 className="text-4xl lg:text-9xl">Sell A Car</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex justify-around items-center h-screen slide2">
                        <div data-aos="fade-down">
                            <h1 className="text-4xl lg:text-9xl">Buy Your Dream</h1>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex justify-around items-center h-screen slide3">
                        <div data-aos="fade-down">
                            <h1 className="text-4xl lg:text-9xl">Everything You Need</h1>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;