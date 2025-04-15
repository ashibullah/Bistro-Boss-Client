import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import { usePagination, VisiblePagesIndex } from '../../Hooks/usePagination'; // Import pagination hook
import MenuCard from './MenuCard';
import { useParams } from 'react-router-dom';

export const TabsLists = () => {
    const { category } = useParams();
    // console.log('tablist.jsx category', category);
    const [menu, loading] = useMenu();
    const [tabIndex, setTabIndex] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!loading) {
            const uniqueCategories = [...new Set(menu.map(item => item.category))];
            setCategories(uniqueCategories);

            const initialIndex = uniqueCategories.indexOf(category);
            if (initialIndex !== -1) setTabIndex(initialIndex);
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
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="flex justify-center mb-4">
                    {categories.map(category => (
                        <Tab key={category} className={'btn mx-1 rounded hover:bg-amber-300 active:bg-amber-500 bg-gray-200  focus:outline-none focus:ring-amber-500'}>{category}</Tab>
                    ))}
                </TabList>

                {categories.map(category => (
                    <TabPanel key={category} >
                        {/* {console.log(category)} */}
                        <CategoryWithPagination menu={menu.filter(item => item.category === category)} />
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

// New component to handle pagination for each category
const CategoryWithPagination = ({ menu }) => {
    const { currentPosts, pages, currentPage, setCurrentPage } = usePagination(menu);

    return (
        <div>
            <MenuCard menu={currentPosts} />
            <VisiblePagesIndex pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    );
};
