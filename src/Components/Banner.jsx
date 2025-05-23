import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../App.css'
import { Carousel } from 'react-responsive-carousel';

// Import banner images
import banner1 from '../assets/home/01.jpg';
import banner2 from '../assets/home/02.jpg';
import banner3 from '../assets/home/03.png';
import banner4 from '../assets/home/04.jpg';

const Banner = () => {
    return (
        <div className='' >
              <Carousel 
                autoPlay 
                infiniteLoop 
                showStatus={false} 
                showThumbs={false}
            >
                <div>
                    <img src={banner1} alt="Banner 1" />
                </div>
                <div>
                    <img src={banner2} alt="Banner 2" />
                </div>
                <div>
                    <img src={banner3} alt="Banner 3" />
                </div>
                <div>
                    <img src={banner4} alt="Banner 4" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;