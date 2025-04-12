
import MenuBox from './MenuBox';
import useMenu from '../../Hooks/useMenu';

const CategoryMenu = ({ category }) => {
    const [menu, loading] = useMenu({ category });
    if (loading) {
        return <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
        </div>
    }
    return (
        <div className='py-15'>
            <MenuBox menu={menu} />
        </div>
    );
};

export default CategoryMenu;