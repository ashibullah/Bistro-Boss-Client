import { usePagination } from '../../Hooks/usePagination';
import { BsCart2 } from 'react-icons/bs';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { axiosInstance } from '../../axios/axiosInstance';

const MenuCard = ({ menu }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentPosts } = usePagination(menu);
    


    const { user , setCart ,cart} = useAuth();
    // console.log(user.email);
    const addToCart = (menuItem) => {
        // console.log(location.pathname);


        if (!user || !user.email) {
            toast.error("Please log in to add items to the cart.", { duration: 2000 });
            navigate('/login', { state: { from: location } });
            return;
        }
        else{
            const cartItem = { menuId: menuItem._id, userEmail: user.email}
            // console.log(cartItem);
            axiosInstance.post('/carts', cartItem)
            .then((res)=>{
                // console.log(res.data);
                if(res.data.insertedId){
                    // console.log("Added to cart successfully", res.data);
                        const newCart = [...cart, res.data];
                        setCart(newCart);
                        // console.log("Updated cart:", newCart);
                        toast.success("Added to cart successfully", { duration: 2000 });
                    }
                }).catch((error) => {
                    console.error("Error adding to cart:", error);
                    toast.error("Failed to add to cart", { duration: 2000 });
                })
        }

        // Handle adding the menu item to the cart here
        // console.log("Added to cart:", menuItem._id);

    }



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


                                <div className="flex items-center gap-2 px-1">
                                    <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none">
                                        Order Now
                                    </button>
                                    <div className="indicator">
                                        <button className="btn px-4 py-2 rounded-md text-lg hover:bg-green-600 hover:text-white focus:outline-none" onClick={() => addToCart(menuItem)}>
                                            <BsCart2 />
                                            <span className="indicator-item badge bg-green-500 border-none text-white">+</span>

                                        </button>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </>

    );
};

export default MenuCard;
