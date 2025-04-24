import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import { axiosInstance } from "../axios/axiosInstance";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [groupedCart, setGroupedCart] = useState([]);





    useEffect(() => {
        const total = cart.reduce((acc, item) => acc + item.price, 0);
        setTotalAmount(total);
    }, [cart]);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
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
        setGroupedCart(grouped);
        // console.log(groupedCart);
      }, [cart]); 


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
        
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default AuthProvider;