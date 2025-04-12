import React from 'react';

const SectionTittle = ({heading, subheading}) => {
    return (
        <div className='mx-auto text-center mt-15 '>
            <p className='text-yellow-600 text-xs font-semibold italic'>---{subheading}---</p>

            <hr className='w-56 mx-auto my-2 text-gray-300' />
            <h1 className='text-3xl font-bold'>{heading}</h1>          
            <hr className='w-56 mx-auto my-2 text-gray-300' />  
        </div>
    );
};

export default SectionTittle;