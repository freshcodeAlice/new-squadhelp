import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
isFetching: false,
error: null,
data: null
}



export default function (state = initialState, action) {
  switch (action.type) {

    case ACTION.GET_USER_TRANSACTIONS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case ACTION.GET_USER_TRANSACTIONS_SUCCESS: {
      const {data} = action;
      return {
        ...state,
        isFetching: false,
        data
      }
    }
    case ACTION.GET_USER_TRANSACTIONS_ERROR: {
      const {error} = action;
      return {
        ...state,
        isFetching: false,
        error
      }
    }

  }
}
