import {all} from 'redux-saga/effects';

import games from './games/sagas';
import itemCart from './itemCart/sagas';

export default function* rootSaga() {
    yield all([
        games,
        itemCart
    ])
}