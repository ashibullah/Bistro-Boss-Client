import React from 'react';
import Cover from '../Components/Shared/Cover';
import { TabsLists } from '../Components/Shared/TabsLists';
import useMenu from '../hooks/useMenu';
import { usePagination, VisiblePagesIndex } from '../Hooks/usePagination';

const OrderNow = () => {
    const [menu, loading] = useMenu();
    const { pages, currentPage, setCurrentPage } = usePagination(menu);
    // console.log(menu,loading);
    return (
        <div>

            <Cover img={'src/assets/shop/banner2.jpg'} tittle={'Order Now'} description={'This is the order now section where you can place your orders.'} />
            <TabsLists />

            {/* <VisiblePagesIndex pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}

        </div>
    );
};

export default OrderNow;