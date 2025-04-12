import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import SectionTittle from './Shared/SectionTittle';

const Category = () => {
    return (
        <>
            <SectionTittle heading="Our Categories" subheading="Explore the best dishes" ></SectionTittle>
            <div className='lg:w-4xl mx-auto py-10'>
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
                        <img src="src\assets\home\slide1.jpg" alt="" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Salads</p>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="src\assets\home\slide2.jpg" alt="" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Pizzas</p>

                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="src\assets\home\slide3.jpg" alt="" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Soups</p>

                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="src\assets\home\slide4.jpg" alt="" />
                        <p className='text-3xl uppercase -mt-10 text-center text-white text-shadow'>Deserts</p>

                    </SwiperSlide>
                    

                </Swiper>
            </div>

        </>
    );
};

export default Category;