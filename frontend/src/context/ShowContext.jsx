import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({})
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addToCart = async  (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    
    const removeFromCart = async (itemId) => {
        
        setCartItems((prev)=>{
            const updatedCartItems = {...prev};
            //Decrease the cartItem
            updatedCartItems[itemId]--;
            
            //If the cartItem value becomes zero, remove it from the state
            if(updatedCartItems[itemId]===0){
                delete updatedCartItems[itemId]
            }
            return updatedCartItems

        })
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        
    }       

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for( const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id===item)
                totalAmount += itemInfo.price*cartItems[item]
            }
        }

        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.get(url+"/api/cart/get",{headers:{token}})
        setCartItems(response.data.userCartData);
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"))
                console.log("Context running")
            }
        }
        loadData()
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider