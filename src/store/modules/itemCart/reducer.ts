import { Reducer } from "redux";
import producer from 'immer';
import { ActionTypes, CartIState  } from "./type";


const INITIAL_STATE: CartIState = {
    items: [],
    error: false,
    price : 0,
    bets: []
}

const cart: Reducer<CartIState> = (state = INITIAL_STATE, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case ActionTypes.addProductToCartSuccess: {
                const { item } = action.payload;
                const checkNumbers = draft.items.find(i => {
                    return i.numbers === item.numbers && i.type === item.type
                })
                if(!checkNumbers){
                    draft.items.push(item);
                    draft.price = (draft.price + item.price);
                    draft.error= false;
                }else {
                    draft.error = true
                }
                break;
            }
            case ActionTypes.addProductToCartFailure: {
                const {error} = action.payload;
                draft.error = error;
                break;
            }
            case ActionTypes.removeProductToCart: {
                const {item} = action.payload;
                const findItem = draft.items.findIndex(i => {
                    return i.numbers === item.numbers && i.type === item.type 
                });
                console.log(findItem);
                draft.items.splice(findItem, 1 );
                draft.price = (draft.price - item.price);
                break;
            }
            case ActionTypes.addGamesSuccess: {
                const {item} = action.payload;
                if(draft.price >= 30){
                    draft.bets = draft.bets.concat(item);
                    draft.items = [];
                    draft.price = 0;
                }else{
                    draft.error = true;
                }
                break;
            }
            case ActionTypes.addGamesFailure: {
                const {error} = action.payload;
                draft.error = error;
                break;
            }

            default: {
                return draft;
            }
        }
    });
}
export default cart;