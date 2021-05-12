import { AxiosResponse } from 'axios';
import { all, takeLatest, put, call } from 'redux-saga/effects';
import api from '../../../services/api';
import { GamesProps } from '../games/types';
import { addGamesFailure, addGamesRequest, addGamesSuccess, addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './action';
import { ActionTypes } from './type';

type checkItemRequest = ReturnType<typeof addProductToCartRequest>;
type checkBetRequest = ReturnType<typeof addGamesRequest>;

function* checkItemCart({ payload }: checkItemRequest) {
    const { item } = payload;

    if (item.numbers) {
        yield put(addProductToCartSuccess(item));
    } else {
        yield put(addProductToCartFailure('Erro ao tentar adicionar no carrinho'));
    }
}

function* checkBetCart({ payload }: checkBetRequest) {
    const { item } = payload;
    const availableSGamesResponse: AxiosResponse<GamesProps> = yield call(api.get, "/games");

    try {
        if (availableSGamesResponse.data) {
            yield put(addGamesSuccess(item))
        }else {
            yield put(addGamesFailure(true))
        }
    } catch (err) {
        yield put(addGamesFailure(true))
    }
}

export default all([
    takeLatest(ActionTypes.addProductToCartRequest, checkItemCart),
    takeLatest(ActionTypes.addGamesRequest, checkBetCart)
])