
import SectionTittle from './Shared/SectionTittle';
import MenuBox from './Shared/MenuBox';

import useAuth from '../Hooks/useAuth';

const PopularMenu = () => {
    const { menu } = useAuth();
    const popularItems = menu.filter(item => item.category === 'popular');
                
    return (
        <div className='mb-20'>
            <SectionTittle heading="Popular Menu" subheading="Check out our favorites!" />

            <div>
                <MenuBox menu={popularItems} />
            </div>
            {/* <p>Total items: {menu.length}</p> */}
        </div>
    );
};

export default PopularMenu;