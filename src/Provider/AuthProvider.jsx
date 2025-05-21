import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import { axiosInstance } from "../axios/axiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [groupedCart, setGroupedCart] = useState([]);
    const [isAdmin, setAdmin] = useState(false);


    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        setTotalAmount(total.toFixed(2));
    }, [cart]);


   const adminCheck = () => {
    const email = user?.email;
    if (!email) {
        console.log('No user email found');
        return;
    }
    axiosInstance.get(`/user/${email}`)
        .then(res => {
            const user = res.data; 
            if(user.role === 'admin'){
                setAdmin(true);
            }
        })
        .catch(error => {
            console.error('Error fetching user:', error);
        });
};



    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setAdmin(false);
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUserProfile = (currentUser) => {
        return updateProfile(auth.currentUser, currentUser);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (user) {
            axiosInstance.get(`/carts?email=${user?.email}`)
                .then(response => {
                    setCart(response.data);
                    // console.log("Cart fetched successfully:", response.data);
                })
                .catch(error => {
                    console.error("Failed to fetch cart:", error);
                });
        }
    }, [user, cart.length]);




    useEffect(() => {
        setTotalAmount(cart.reduce((acc, item) => acc + item.price, 0));

        const grouped = cart.reduce((acc, item) => {
            const existingItem = acc.find(i => i._id === item._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                acc.push({ ...item, quantity: 1 });
            }
            return acc;
        }, []);
        // console.log("Grouped:", grouped);
        grouped.sort((a, b) => a.name.localeCompare(b.name));

        setGroupedCart(grouped);
        // console.log(groupedCart);
    }, [cart]);

    const handleRemoveCartItem = (id) => {
        const updatedCart = [...cart];
        let found = false;
      
        for (let i = 0; i < updatedCart.length; i++) {
          if (updatedCart[i]._id === id) {
            found = true;
      
            if (updatedCart[i].quantity > 1) {
              updatedCart[i].quantity -= 1;
      
              axiosInstance.patch(`/carts/decrement/${id}`)
                .then(() => {
                  setCart(updatedCart);
                  toast.success("One item removed.");
                })
                .catch((error) => {
                  console.error("Decrement failed:", error);
                });
      
            } else {
              updatedCart.splice(i, 1);
      
              axiosInstance.delete(`/carts/${id}`)
                .then(() => {
                  setCart(updatedCart);
                  toast.success("Item removed from cart.");
                })
                .catch((error) => {
                  console.error("Delete failed:", error);
                });
            }
      
            break;
          }
        }
      
        if (!found) {
          toast.error("Item not found.");
        }
      };
      

    const handleCartClear = () => {
        if (cart.length === 0) {
            toast.error("Cart is already empty!");
            return;
        }
        setCart([]);
        axiosInstance.delete(`/carts/clear/${user?.email}`)
            .then(() => {
                toast.success("Cart cleared successfully!");
            })
            .catch(error => {
                toast.error("Failed to clear cart:", error);
            });
    };




    const [menu, setMenu] = useState([]);
    useEffect(() => {
        axiosInstance.get('/menu')
            .then(res =>{
                setMenu(res.data);
            })
            .catch(error => console.error('Error fetching menu:', error));

    }, []);

    const authInfo = {
        logOut,
        signInUser,
        createUser,
        user,
        setUser,
        loading,
        setLoading,
        googleSignIn,
        updateUserProfile,
        cart,
        setCart,
        axiosInstance,
        totalAmount,
        groupedCart,
        handleRemoveCartItem,
        setGroupedCart,
        handleCartClear,
        adminCheck,
        isAdmin,
        menu,
        setMenu
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;