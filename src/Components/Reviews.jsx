import React from 'react';
import SectionTittle from './Shared/SectionTittle';
import ReviewSlider from './ReviewSlider';

const Reviews = () => {
    return (
        <div>
            <SectionTittle heading="What Our Clients Say" subheading="Testimonials" />
            <ReviewSlider/>
        </div>
    );
};

export default Reviews;