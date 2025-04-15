import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({ img, tittle, description }) => {
    return (
        <Parallax blur={{ min: -20, max: 20 }} bgImage={img} strength={200}>
            <div className="relative w-full min-h-[70vh] flex items-center justify-center">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 z-0"></div>

                {/* Text content */}
                <div className="relative z-10 text-center text-white px-4 sm:px-8 md:px-20 py-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{tittle}</h1>
                    <p className="text-sm sm:text-base md:text-lg">{description}</p>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;
