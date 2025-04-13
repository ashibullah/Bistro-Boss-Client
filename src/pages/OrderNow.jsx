import React from 'react';
import Cover from '../Components/Shared/Cover';
import { TabsLists } from '../Components/Shared/TabsLists';
import useMenu from '../hooks/useMenu';

const OrderNow = () => {
    const [menu,loading] = useMenu();
    console.log(menu,loading);
    return (
        <div>
            
            <Cover img={'src/assets/shop/banner2.jpg'} tittle={'Order Now'} description={'This is the order now section where you can place your orders.'} />
            <TabsLists/>

        </div>
    );
};

export default OrderNow;