
import { Pagination, VisiblePagesIndex } from './Pagination';

const MenuCard = ({ menu }) => {

    const { currentPosts, pages, currentPage, setCurrentPage } = Pagination(menu); // Fixed the bracket from ] to }



    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPosts.map((menuItem) => (
                <div key={menuItem._id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-xs mx-auto">
                    <img className="w-full h-40 object-cover" src={menuItem.image} alt={menuItem.name} />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800">{menuItem.name}</h3>
                        <p className="text-gray-600 text-sm">{menuItem.recipe}</p>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-orange-600">${menuItem.price}</span>
                            <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none">
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {/* <VisiblePagesIndex pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
        </>

    );
};

export default MenuCard;
