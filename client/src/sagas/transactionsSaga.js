import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as ActionCreators from '../actions/actionCreator';
import * as restController from '../api/rest/restController';

export function * getTransactionsSaga(action) {
    try {
      const {data} = yield restController.getUserTransactions();
        yield put({type: ACTION.GET_USER_TRANSACTIONS_SUCCESS, data});
    } catch(error) {
        yield put({type: ACTION.GET_USER_TRANSACTIONS_ERROR, error});
    } 
}