import { SUCCESS_GLOBAL, ERROR_GLOBAL, CLEAR_NOTIFICATION } from '../types';

export default function resortReducer(state = {}, action) {
  switch (action.type) {
    case SUCCESS_GLOBAL:
      return { ...state, success: true, msg: action.payload };
    case ERROR_GLOBAL:
      return { ...state, error: true, msg: action.payload };
    case CLEAR_NOTIFICATION:
      return {};
    default:
      return state;
  }
}
