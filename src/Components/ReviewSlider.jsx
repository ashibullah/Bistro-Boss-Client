import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';

import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'



const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {/* <SwiperSlide>{reviews.length}</SwiperSlide> */}
                {
                    reviews.map(review => <SwiperSlide key={review._id}>

                        <div className='p-20 lg:px-40 sm:px-20 text-center'>
                            <div className='flex justify-center mb-5 '>
                                <Rating style={{ maxWidth: 250 }} value={review.rating} readOnly />

                            </div>
                            <p className='lg:px-20 text-lg text-gray-600'>{review.details}</p>
                            <h3 className=' text-2xl text-orange-400'>{review.name}</h3>
                        </div>

                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default ReviewSlider;