
import { Navigate, useNavigate } from 'react-router-dom';
import useMenu from '../../hooks/useMenu';
import MenuBox from './MenuBox';


const CategoryMenu = ({category}) => {
    const [menu, loading] = useMenu(category);
    const navigate = useNavigate();
    
    if (loading) {
        return <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
        </div>
    }
    return (
        <div className='py-15 flex flex-col items-center justify-center'>
            <MenuBox menu={menu} />
            <button className='btn btn-outline border-1 mt-4 text-orange-500 hover:bg-orange-500 hover:text-white' onClick={() => navigate(`/order/${category}`)}>Order Now</button>
        </div>
    );
};

export default CategoryMenu;