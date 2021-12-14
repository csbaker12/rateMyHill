import {
  GET_RESORTS,
  GET_RESORT_BY_ID,
  CLEAR_RESORT,
  CLEAR_RESORT_LIST,
  UPDATE_RESORT,
  CREATE_RESORT,
} from '../types';

export default function resortReducer(state = {}, action) {
  switch (action.type) {
    case GET_RESORTS:
      return { ...state, resortList: action.payload };
    case GET_RESORT_BY_ID:
      return { ...state, resort: action.payload };
    case CLEAR_RESORT:
      return { ...state, resort: null };
    case CLEAR_RESORT_LIST:
      return { ...state, resortList: null };
    case UPDATE_RESORT:
      return { ...state, updatedResort: action.payload };
    case CREATE_RESORT:
      return { ...state, newResort: action.payload };
    default:
      return state;
  }
}
