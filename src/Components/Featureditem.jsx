import React from 'react';
import SectionTittle from './Shared/SectionTittle';

const Featureditem = () => {
    return (
        <div
            className="p-5 pb-20 text-white mb-10 bg-black/50"
            style={{
                backgroundImage: "url('src/assets/home/featured.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
                backgroundAttachment: 'fixed',
            }}
        >
            <SectionTittle heading="Featured Item" subheading="Check it out!" />
            <div className='flex md:flex-row items-center gap-4 justify-center p-10 sm:flex-col'>
                <div className='w-1/3'>
                    <img src="src\assets\home\featured.jpg" alt="Featured Item" />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <h3 className="text-2xl font-bold  uppercase">Where can I get some?</h3>
                    <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, cumque!</p>

                    <p className=" btn  bg-amber-300 ">Order Now!</p>
                </div>
            </div>
        </div>
    );
};

export default Featureditem;