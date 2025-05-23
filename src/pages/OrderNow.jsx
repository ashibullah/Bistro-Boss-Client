import React from 'react';
import Cover from '../Components/Shared/Cover';
import { TabsLists } from '../Components/Shared/TabsLists';
import coverImage from '../assets/shop/banner2.jpg';

const OrderNow = () => {
    return (
        <div>
            <Cover img={coverImage} tittle={'Order Now'} description={'This is the order now section where you can place your orders.'} />
            <TabsLists  />
        </div>
    );
};

export default OrderNow;