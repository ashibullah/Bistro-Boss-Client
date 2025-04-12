import React from 'react';
import { Parallax } from 'react-parallax';

const Cover = ({ img, tittle, description }) => {
    return (
        <Parallax blur={{ min: -20, max: 20 }} bgImage={img}  strength={200}>
            <div>
                <div
                    className="hero min-h-[70vh]"
                   >
                    <div className=""></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="min-w-lg hero-overlay px-80 py-20">
                            <div className="max-w-lg ">
                                <h1 className="mb-5 text-5xl font-bold">{tittle}</h1>
                                <p className="mb-5">{description}</p>
                                {/* <button className="btn btn-primary">Get Started</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;