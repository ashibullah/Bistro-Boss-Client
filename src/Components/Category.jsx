import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import SectionTittle from './Shared/SectionTittle';
// Import slide images
import slide1 from '../assets/home/slide1.jpg';
import slide2 from '../assets/home/slide2.jpg';
import slide3 from '../assets/home/slide3.jpg';
import slide4 from '../assets/home/slide4.jpg';

const Category = () => {
    return (
        <>
            <SectionTittle heading="Our Categories" subheading="Explore the best dishes" ></SectionTittle>
            <div className='lg:w-4xl mx-auto py-10 sm:px-10 px-2'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper "
                >
                    <SwiperSlide>
                        <img src={slide1} alt="Salads" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Salads</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide2} alt="Pizzas" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Pizzas</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide3} alt="Soups" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Soups</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide4} alt="Deserts" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Deserts</p>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default Category;