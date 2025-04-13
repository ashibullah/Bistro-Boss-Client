import React, { useState } from 'react';

export const usePagination = (item) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 

    const lastPostIndex = currentPage * itemsPerPage;
    const firstPostIndex = lastPostIndex - itemsPerPage;
    const currentPosts = item.slice(firstPostIndex, lastPostIndex);
    const pages =  PaginationIndex(item, itemsPerPage)
    // console.log(pages);
    return {currentPosts, pages , currentPage, setCurrentPage};
};

export const PaginationIndex =(item , itemsPerPage) =>{
    let pages = [];

    for (let i = 1; i <= Math.ceil(item.length / itemsPerPage); i++) {
        pages.push(i);
        // console.log(pages);
    }
    return pages;

}

export const VisiblePagesIndex = ({ pages, currentPage, setCurrentPage }) => {

    return (
        <div className='flex justify-center mt-4 '>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 mx-1 rounded-full ${currentPage === page ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-orange-200'}`}
                >
                    {page}
                </button>
            ))}    
         </div>

    )
}
