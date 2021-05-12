import { combineReducers } from "redux";
import games from './games/reducer';

import itemCart from './itemCart/reducer';

export default combineReducers({
    games,
    itemCart
});