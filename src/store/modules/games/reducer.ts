import { Reducer } from "redux";
import { GamesState  } from "./types";
import producer from 'immer';
import { ActionTypes } from "./types";
const INITIAL_STATE: GamesState = {
    games: [],
    error: false,
}

const gamesModules: Reducer<GamesState> = (state = INITIAL_STATE, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case ActionTypes.loadGamesSuccess: {
                const {bet} = action.payload;
                if(draft.games){
                    draft.games = [];
                    draft.games = [...bet];
                    draft.error = false;
                }
                break;
            }
            case ActionTypes.loadGamesFailure: {
                const {error} = action.payload;
                draft.error = error;
                break;
            }
            default:
                return draft;
        }
    })
}


export default gamesModules;