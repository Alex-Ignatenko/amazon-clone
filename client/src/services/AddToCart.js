import axios from "axios";
import { toast } from "react-toastify";
import { ADD_TO_CART, GET_FAIL } from "../reducers/Actions";

export const addToCartHandler = async (product,cartItems,ctxDispatch) => {

    const existingItem = cartItems.find((item) => item._id === product._id);
    console.log(existingItem);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    try {
        const { data } = await axios.get('/products/id/'+ product._id);
        if (data.countInStock < quantity) { 
            toast.error("Sorry, we don't have enough in stock");
            return;
        }
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