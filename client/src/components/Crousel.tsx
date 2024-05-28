import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles.css";
import { FaLongArrowAltRight } from "react-icons/fa";

import slide1 from "../assets/Slide1.webp";
import slide2 from "../assets/slide2.webp";
import slide3 from "../assets/slide3.jpeg";
import slide4 from "../assets/slide4.webp";

const Crousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="h-auto w-[80vw]">
            <img src={slide2} className="object-contain rounded-2xl" alt="poster" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" h-auto w-[80vw]">
            <img src={slide1} className="object-contain rounded-2xl" alt="poster" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-auto w-[80vw]">
            <img src={slide3} className="object-contain  rounded-2xl" alt="poster" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="h-auto w-[80vw]">
            <img src={slide4} className="object-contain rounded-2xl" alt="poster" />
          </div>
        </SwiperSlide>
      </Swiper>
      <section className="flex items-center justify-center flex-row mt-1">
        <button className="bg-orange-600 hover:opacity-70 w-[200px] flex gap-2 items-center justify-center text-white font-bold p-4">
          <span>Buy Furniture</span>
          <FaLongArrowAltRight />
        </button>

        <button className="bg-sky-700 hover:opacity-70 w-[200px] flex gap-2 items-center justify-center text-white font-bold p-4">
          <span>See Furniture</span>
          <FaLongArrowAltRight />
        </button>

        <button className="bg-blue-600 hover:opacity-70 w-[200px] flex gap-2 items-center justify-center text-white font-bold p-4">
          <span>Rent Furniture</span>
          <FaLongArrowAltRight />
        </button>

      </section>
    </>
  );
};

export default Crousel;
