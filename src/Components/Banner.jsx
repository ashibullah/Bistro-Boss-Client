import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../App.css'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div className='' >
            
            <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false} >
                <div>
                    <img src="src\assets\home\01.jpg" />
                
                </div>
                <div>
                    <img src="src\assets\home\02.jpg" />
                
                </div>
                <div>
                    <img src="src\assets\home\03.png" />
                    
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;