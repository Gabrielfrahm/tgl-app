import {ActionTypes, GamesProps} from './types';

export function loadGames(){
    return {
        type: ActionTypes.loadGames,
        
    };
}

export function loadGamesSuccess(bet : GamesProps ){
    return {
        type: ActionTypes.loadGamesSuccess,
        payload: {
            bet,
        }
    };
}
export function loadGamesFailure(error : boolean ){
    return {
        type: ActionTypes.loadGamesSFailure,
        payload: {
            error,
        }
    };
}