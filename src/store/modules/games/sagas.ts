import { AxiosResponse } from 'axios';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';
import { ActionTypes } from './types';
import { loadGamesFailure, loadGamesSuccess } from './action';
import { GamesProps } from './types';

function* checkLoadGames() {
    try {
        const availableSGamesResponse: AxiosResponse<GamesProps> = yield call(api.get, "/games",);
        if (availableSGamesResponse.data) {
            yield put(loadGamesSuccess(availableSGamesResponse.data));
        }
    } catch (err) {
        yield put(loadGamesFailure(true));
    }
    
}

export default all([
    takeLatest(ActionTypes.loadGames, checkLoadGames),
])