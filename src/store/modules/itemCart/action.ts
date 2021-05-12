import { ActionTypes, Item } from './type';

export function addProductToCartRequest(item: Item) {
    return {
        type: ActionTypes.addProductToCartRequest,
        payload: {
            item,
        }
    };
}

export function addProductToCartSuccess(item: Item) {
    return {
        type: ActionTypes.addProductToCartSuccess,
        payload: {
            item,
        }
    }
};


export function addProductToCartFailure(error: string){
    return {
        type: ActionTypes.addProductToCartFailure,
        payload: {
            error,
        }
    };
}

export function removeProductToCart(item: Item){
    return {
        type: ActionTypes.removeProductToCart,
        payload: {
            item,
        }
    };
}


export function addGamesRequest(item: Item[]){
    return {
        type: ActionTypes.addGamesRequest,
        payload: {
            item,
        }
    };
}

export function addGamesSuccess(item: Item[]){
    return {
        type: ActionTypes.addGamesSuccess,
        payload: {
            item,
        }
    };
}

export function addGamesFailure(error: boolean){
    return {
        type: ActionTypes.addGamesFailure,
        payload: {
            error,
        }
    };
}