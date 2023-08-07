import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL } from "../Reducers/Actions";
import { ToastErrorSettings } from '../Services/ToastErrorSettings';

export const addToCartHandler = async (product,cartItems,ctxDispatch) => {

    //Find if the item is already in the cart if so up its quantity by 1 or if its new set quantity to 1
    const existingItem = cartItems.find((item) => item._id === product._id);
    console.log(existingItem);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    try {
        //Get the selected prtoduct from server
        const { data } = await axios.get('/products/id/'+ product._id);
        if (data.countInStock < quantity) { 
            toast.error("Sorry, we don't have more in stock", ToastErrorSettings);
            return;
        }
        //user a passed dispatch function to add the item to the cart via storeReducer hook
        ctxDispatch({
            type: ADD_TO_CART,
            payload: {...product, quantity }
        })

    } catch (error) {
        ctxDispatch({
            type: GET_FAIL,
            payload: error.message
        })
    }
};