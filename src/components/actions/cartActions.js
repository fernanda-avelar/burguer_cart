
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,EDIT_ITEM, CONFIRM_EDIT} from './action-types/cart-actions'

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
//Edit item
export const editCart= (id)=>{
    return{
        type: EDIT_ITEM,
        id
    }
}
//Confirm Edit item
export const confirmEdit= (id)=>{
    return{
        type: CONFIRM_EDIT,
        id
    }
}

//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}
