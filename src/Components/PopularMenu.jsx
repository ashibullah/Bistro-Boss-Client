import { useEffect, useState } from 'react';
import SectionTittle from './Shared/SectionTittle';
import MenuBox from './Shared/MenuBox';

const PopularMenu = () => {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItems = data.filter(item => item.category === 'popular');
                setMenu(popularItems);
            })
            .catch(error => console.error('Error fetching menu:', error));

    }, []);
    return (
        <div className='mb-20'>
            <SectionTittle heading="Popular Menu" subheading="Check out our favorites!" />

            <div>
                <MenuBox menu={menu} />
            </div>
            {/* <p>Total items: {menu.length}</p> */}
        </div>
    );
};

export default PopularMenu;