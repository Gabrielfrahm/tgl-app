
export enum ActionTypes {
    addProductToCartRequest = 'ADD_PRODUCT_TO_CART_REQUEST',
    addProductToCartSuccess = 'ADD_PRODUCT_TO_CART_SUCCESS',
    addProductToCartFailure = 'ADD_PRODUCT_TO_CART_FAILURE',
    removeProductToCart = 'REMOVE_PRODUCT_TO_CART',
    addGamesRequest = 'ADD_GAMES_REQUEST',
    addGamesSuccess = 'ADD_GAMES_SUCCESS',
    addGamesFailure = 'ADD_GAMES__FAILURE',
}

export interface Item {
    id: number;
    color: string;
    type: string;
    price: number;
    numbers: string;
    created_at: Date;
};

export interface CartIState {
    items: Item[];
    error: boolean; 
    price: number;
    bets: Item[]
}