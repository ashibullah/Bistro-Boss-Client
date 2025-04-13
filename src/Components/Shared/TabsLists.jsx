import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';

import MenuCard from './MenuCard';

export const TabsLists = () => {
    const [menu, loading] = useMenu();
    const [categories, setCategories] = useState([]);
    

    useEffect(() => {
        if (!loading) {
            const uniqueCategories = [...new Set(menu.map(item => item.category))];
            setCategories(uniqueCategories);
        }
    }, [menu, loading]);

    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="my-10 p-20">
            <Tabs>
                <TabList>
                    {categories.map(category => (
                        <Tab key={category}>{category}</Tab>
                    ))}
                </TabList>

                {categories.map(category => (
                    <TabPanel key={category}>
                        <MenuCard menu={menu.filter(item => item.category === category)} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};
